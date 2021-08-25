import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, Switch, TouchableOpacity, TouchableHighlight } from 'react-native';
import { dateFormat, NavigationView, DateInput, TimeInput, Input, TextArea } from 'odc-mobile-common';
import styles from './styles';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as yup from 'yup';
import { GetAgendadas, ValidateUsrExists, EditAgenda } from '../../../communication/prospecting';
import localization from '../../../localization';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import _ from 'lodash';
import { Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy\'hoy'
};
LocaleConfig.defaultLocale = 'es';

const Schedule = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [schedulePopVisible, setSchedulePopVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({});
    const [editSchedulePopVisible, setEditSchedulePopVisible] = useState(false);
    const [userEvaluado, setUserEvaluado] = useState(false);

    const fetchData = async () => {
        let tmpAgendadas = await GetAgendadas();
        if (!tmpAgendadas.state) {
            global.props.displayAlert(
                localization['psp.titleAlert'],
                tmpAgendadas.message,
                undefined,
                undefined,
            );
            setIsLoading(false);
            return;
        }
        setData(formatData(tmpAgendadas.data));
        setIsLoading(false);
    }

    const formatData = (data) => {
        let formatedData = data.map(itm => {
            let objStartDate;
            let objEndDate;

            let typeStarDate = typeof (itm.startDate);
            switch (typeStarDate) {
                case "number":
                    objStartDate = new Date(itm.startDate * 1000);
                    break;
                case "string":
                    objStartDate = new Date(itm.startDate);
                    break;
                case "object":
                    objStartDate = itm.startDate;
                    break;
            }


            let typeEndDate = typeof (itm.endDate);
            switch (typeEndDate) {
                case "number":
                    objEndDate = new Date(itm.endDate * 1000);
                    break;
                case "string":
                    objEndDate = new Date(itm.endDate);
                    break;
                case "object":
                    objEndDate = itm.endDate;
                    break;
            }

            itm.subtitle = itm.description;
            itm.start = objStartDate;
            itm.end = objEndDate;
            itm.color = '#2196f3';//colorObj.hex;
            itm.serverDate = moment(objStartDate).format("yyyy-MM-DD");
            itm.height = 100
            return itm;
        });

        let newFormatedData = _.groupBy(formatedData, "serverDate");
        console.log(newFormatedData);
        return newFormatedData;
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true);
            fetchData();
            //console.log("HOLA MOSTRAR")
        }, []),
    );

    const disableBuscarUsuario = (formikProps) => {
        const { newUser, userNameValido, userValido } = formikProps.values;
        let res = newUser === userNameValido
        return res;
    }

    if (isLoading)
        return (
            <View style={styles.loading}>
                <ActivityIndicator
                    size="large"
                    color={styles.activityIndicator.color}
                />
            </View>
        );



    const _renderItem = (item) => {
        let nombres = item.title.split(' ');
        let inicitales = `${nombres[0].substr(0, 1) + nombres[1].substr(0, 1)}`
        /*const colors = ['#64D4D2', '#8F63B8', '#FFC233']
        let colorIniciales = colors[Math.floor(Math.random() * 3) + 1]*/
        return (
            <TouchableOpacity
                style={[{ height: item.height, marginTop: 10, marginBottom: 10, marginRight: 10 }]}
                onPress={(appt) => {
                    setSelectedAppointment(item)
                    setSchedulePopVisible(true);
                }}
            >
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    padding: 10
                }}>
                    <Text style={{ fontSize: 16 }}>{`${moment(item.start).format("hh:mm A")} - ${moment(item.end).format("hh:mm A")}`}</Text>
                    <Text style={{ fontSize: 18, }}>{item.title}</Text>
                    <Text numberOfLines={3} style={{ ...styles.listLabel, textAlign: "justify" }}>{item.subtitle}</Text>
                    <View style={{
                        width: 45, height: 45, backgroundColor: '#8F63B8', borderRadius: 25,
                        ...styles.centeredText, position: "absolute", right: 10, top: 10
                    }}>
                        <Text style={{ fontSize: 21, ...styles.centeredText, color: 'white' }}>{inicitales}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <NavigationView navigation={navigation}>
            <View style={{ width: '100%', flex: 1 }}>
                <Agenda
                    items={data}
                    selected={moment().format("yyyy-MM-DD")}
                    renderItem={_renderItem}
                    //renderEmptyDate={() => { return (<View style={{ backgroundColor: "red", width: "100%", }}><Text>HOLA</Text></View>); }}
                    renderEmptyData={() => { return (<View style={{ ...styles.centeredText, ...styles.viewItem }}><Text style={{ fontStyle: "italic" }}>{`${localization['psp.noData']}`}</Text></View>); }}
                    theme={{
                        //agendaDayTextColor: 'yellow',
                        //agendaDayNumColor: 'green',
                        //agendaTodayColor: 'red',
                        //agendaKnobColor: 'blue'
                    }}
                />
            </View>
            <Modal testID={'modalSchedule'}
                isVisible={schedulePopVisible}
                backdropColor="black"
                backdropOpacity={0.5}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                onBackdropPress={args => setSchedulePopVisible(false)}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>
                        {localization['psp.tituloAppointment']}
                    </Text>
                    <View style={{ ...styles.cardBody, paddingRight: 10, }}>
                        <View style={{ ...styles.rowContainer, }}>
                            <Text style={{ ...styles.listLabel }}>{`${localization['psp.titulo']}: `}</Text>
                            <Text style={{ ...styles.listValue }}>{selectedAppointment.title}</Text>
                        </View>

                        <View style={{ ...styles.rowContainer }}>
                            <Text style={{ ...styles.listLabel }}>{`${localization['psp.descripcion']}: `}</Text>
                            <Text style={{ ...styles.listValue, flex: 1, textAlign: "justify" }}>{`${selectedAppointment.description}`}</Text>
                        </View>

                        <View style={{ ...styles.rowContainer, }}>
                            <Text style={{ ...styles.listLabel }}>{`${localization['psp.fechaAgendamiento']}: `}</Text>
                            <Text style={{ ...styles.listValue }}>{`${moment(selectedAppointment.start).format(dateFormat)}`}</Text>
                        </View>

                        <View style={{ ...styles.rowContainer, }}>
                            <Text style={{ ...styles.listLabel }}>{`${localization['psp.horaInicio']}: `}</Text>
                            <Text style={{ ...styles.listValue }}>{`${moment(selectedAppointment.start).format("HH:mm")}h (24h)`}</Text>
                        </View>

                        <View style={{ ...styles.rowContainer, }}>
                            <Text style={{ ...styles.listLabel }}>{`${localization['psp.horaFin']}: `}</Text>
                            <Text style={{ ...styles.listValue }}>{`${moment(selectedAppointment.end).format("HH:mm")}h (24h)`}</Text>
                        </View>

                        {(selectedAppointment.agendedUsers?.length > 0) ? (
                            selectedAppointment.agendedUsers.map((agUsr, indx) =>
                            (
                                <View style={{ ...styles.rowContainer }} key={`usr${indx}`}>
                                    <Text style={{ ...styles.listLabel }}>{`Usuario ${indx + 1}: `}</Text>
                                    <Text style={{ ...styles.listValue }}>{agUsr.codeAgendedUser}</Text>
                                </View>
                            ))
                        ) : (<></>)
                        }

                        {(selectedAppointment.owner === true) ? (<View>
                            <Button
                                onPress={() => {
                                    setSchedulePopVisible(false);
                                    setEditSchedulePopVisible(true);
                                }}
                                icon={
                                    <Icon type="FontAwesome5" name="edit" style={{ marginRight: 10 }} />
                                }
                                title={localization['psp.lblEditar']}
                                buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
                                type={
                                    styles.isDark ||
                                        styles.buttonStyle.backgroundColor === 'transparent'
                                        ? 'outline'
                                        : undefined
                                }
                            />
                        </View>) :
                            (<></>)
                        }
                    </View>
                </View>
            </Modal>

            <Modal
                testID={'modalEditSchedule'}
                isVisible={editSchedulePopVisible}
                backdropColor="black"
                backdropOpacity={0.5}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                onBackdropPress={args => setEditSchedulePopVisible(false)}>
                <View style={styles.modalBody}>
                    <Text style={styles.modalTitle}>
                        {localization['psp.tituloEditarAppointment']}
                    </Text>

                    <Formik
                        initialValues={{
                            ...selectedAppointment,
                            //start: moment(selectedAppointment.start).format(dateFormat),
                            start: moment(selectedAppointment.start),
                            startHour: moment(selectedAppointment.start).format('HH:mm'),
                            end: moment(selectedAppointment.end).format(dateFormat),
                            endHour: moment(selectedAppointment.end).format('HH:mm'),
                            userNameValido: "",
                            userValido: false,
                            newUser: "",
                        }}
                        enableReinitialize
                        onSubmit={async values => {
                            const { institutionID } = globalSession.session.jwt.claims;
                            let newSelectedAppointment = {
                                ...selectedAppointment, ...values,
                                /*AgendedUsers: [{
                                    CodeAgendedUser: values.newUser,
                                    IdAppointment: values.idAppointment,
                                    NameAgendedUser: "",
                                    Institution: institutionID,
                                }]*/
                            };
                            setSelectedAppointment(newSelectedAppointment);

                            let editAgenda = await EditAgenda(newSelectedAppointment);

                            if (!editAgenda.state) {
                                global.props.displayAlert(
                                    localization['psp.titleAlert'],
                                    editAgenda.message,
                                    undefined,
                                    undefined,
                                );

                                return setEditSchedulePopVisible(false);
                            }


                            setUserEvaluado(false);
                            setSelectedAppointment({});
                            setEditSchedulePopVisible(false);
                            global.props.displayAlert(
                                localization['psp.titleAlert'],
                                "Se Guardó la Agenda con éxito.",
                                undefined,
                                undefined,
                                'success',
                            );
                            return await fetchData();


                        }}
                        validationSchema={yup.object().shape({
                            endHour: yup
                                .string()
                                .test('object', 'Obligatorio', function (value) {
                                    const { parent, createError, path } = this;
                                    const { endHour, startHour, allDay } = parent;
                                    if (allDay)
                                        return true;

                                    let endTime = endHour.split(':');
                                    let endHours = +endTime[0];
                                    let endMinutes = +endTime[1];

                                    let startTime = startHour.split(':');
                                    let startHours = +startTime[0];
                                    let startMinutes = +startTime[1];


                                    if (endHours < 8 || (endHours >= 20 && endMinutes > 1)) return createError({ path, message: `El rango es 8-20h` });

                                    if ((endHours <= startHours))
                                        return createError({ path, message: `Debe durar al menos 1 hora` });


                                    else
                                        return true;
                                }),


                            startHour: yup
                                .string()
                                .test('object', 'Obligatorio', function (value) {
                                    const { parent, createError, path } = this;
                                    const { startHour } = parent;
                                    let time = startHour.split(':');
                                    let hour = +time[0];
                                    let minutes = +time[1];
                                    if (hour < 8 || (hour >= 20 && minutes > 1)) return createError({ path, message: `El rango es 8-20h` });
                                    else
                                        return true;
                                }),
                            description: yup
                                .string()
                                .label('')
                                .required('Obligatorio'),
                            title: yup
                                .string()
                                .label('')
                                .required('Obligatorio'),

                            /*newUser: yup
                                .string()
                                .label('')
                                .required('Obligatorio'),*/
                        })}>
                        {formikProps => (
                            <View style={styles.styledForm}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.fullItem}>
                                        <Input
                                            name="title"
                                            placeholder={localization['psp.titulo']}
                                            label={localization['psp.titulo']}
                                            formikProps={formikProps}
                                            formikKey="title"
                                            value={formikProps.values.title}
                                        />
                                    </View>
                                </View>
                                <View style={styles.rowContainer}>
                                    <View style={styles.fullItem}>
                                        <TextArea
                                            name="description"
                                            placeholder={localization['psp.descripcion']}
                                            label={localization['psp.descripcion']}
                                            formikProps={formikProps}
                                            formikKey="description"
                                            value={formikProps.values.description}
                                            rowSpan={3}
                                        />
                                    </View>
                                </View>
                                {/*<View style={styles.rowContainer}>
                                    <View style={styles.midItem45}>
                                        <Input
                                            name="newUser"
                                            placeholder={"Usuario"}
                                            label={"Usuario"}
                                            formikProps={formikProps}
                                            formikKey="newUser"
                                            value={formikProps.values.newUser}
                                            disabled={userEvaluado}
                                        />
                                    </View>

                                    {userEvaluado === true &&
                                        <View style={{ ...styles.midItem15 }}>
                                            <TouchableOpacity
                                                style={{ backgroundColor: styles.primayColor, borderRadius: 15, marginTop: 10 }}
                                                onPress={() => {
                                                    setUserEvaluado(false);
                                                    formikProps.setFieldValue('userValido', false);
                                                    formikProps.setFieldValue('userNameValido', undefined);
                                                    formikProps.setFieldValue('newUser', undefined);
                                                }}
                                            >
                                                <Icon type="Entypo"
                                                    name={"edit"}
                                                    style={{ color: 'white', padding: 5, fontSize: 15 }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    }

                                    <View style={{ ...styles.midItem35 }}>
                                        <Button
                                            onPress={async () => {
                                                let valUsrResult = await ValidateUsrExists(formikProps.values.newUser);
                                                if (!valUsrResult.state) {
                                                    global.props.displayAlert(
                                                        localization['psp.titleAlert'],
                                                        valUsrResult.message,
                                                        undefined,
                                                        () => navigation.navigate('Campaign'),
                                                    );
                                                    return;
                                                }
                                                formikProps.setFieldValue('userValido', valUsrResult.data);
                                                if (valUsrResult.data) {
                                                    formikProps.setFieldValue('userNameValido', formikProps.values.newUser);
                                                    setUserEvaluado(true);
                                                }
                                            }} icon={
                                                <Icon type="FontAwesome5" name="search"
                                                    style={{ marginRight: 10, fontSize: 14 }}
                                                />
                                            }
                                            title={"Buscar"}
                                            disabled={disableBuscarUsuario(formikProps)}
                                            buttonStyle={[styles.buttonStyle, { marginLeft: 10, marginTop: 10, height: 30, width: '100%', alignSelf: 'center' }]}
                                            type={
                                                styles.isDark ||
                                                    styles.buttonStyle.backgroundColor === 'transparent'
                                                    ? 'outline'
                                                    : undefined
                                            }
                                        />
                                    </View>
                                    <View style={{ ...styles.midItem10, alignContent: 'center' }}>
                                        <Icon type="Entypo"
                                            name={formikProps.values.userValido ? "check" : "cross"}
                                            style={{ marginLeft: 10, marginTop: 14, fontSize: 20, color: !formikProps.values.userValido ? "red" : "green" }}
                                        />
                                    </View>
                                </View>
                                */}
                                <View style={styles.rowContainer}>
                                    <View style={styles.midItem50}>
                                        <DateInput
                                            name="start"
                                            placeholder={localization['psp.fechaAgendamiento']}
                                            label={localization['psp.fechaAgendamiento']}
                                            formikProps={formikProps}
                                            formikKey="start"
                                            value={formikProps.values.start}
                                            minimumDate={new Date()}
                                            maximumDate={new Date((new Date()).setMonth((new Date()).getMonth() + 1))}
                                        />
                                    </View>
                                    <View style={styles.midItem50}>
                                        <TimeInput
                                            formikKey='startHour'
                                            formikProps={formikProps}
                                            initialValue={formikProps.values.startHour}
                                            label={"Hora (24h) Inicio"}
                                        >
                                        </TimeInput>
                                    </View>
                                </View>

                                <View style={styles.rowContainer}>
                                    <View style={styles.switchContainer}>
                                        <Text style={styles.switchLabel} >Todo el Día:   </Text>
                                        <Switch
                                            trackColor={{ false: "#d9d9d9", true: "#4CAF50" }}
                                            thumbColor={"#F3F3f3"}
                                            ios_backgroundColor="#3e3e3e"
                                            style={styles.switch}
                                            onValueChange={val => formikProps.setFieldValue('allDay', val)}
                                            value={formikProps.values.allDay}
                                        />
                                    </View>
                                    {!formikProps.values.allDay &&
                                        <View style={styles.midItem50}>
                                            <TimeInput
                                                formikKey='endHour'
                                                formikProps={formikProps}
                                                initialValue={formikProps.values.endHour}
                                                label={"Hora (24h) Fin"}
                                            >
                                            </TimeInput>
                                        </View>
                                    }
                                </View>

                                <View style={styles.switchContainer}>
                                    <Text style={styles.switchLabel} >Propietario:   </Text>
                                    <Switch
                                        trackColor={{ false: "#d9d9d9", true: "#4CAF50" }}
                                        thumbColor={"#F3F3f3"}
                                        ios_backgroundColor="#3e3e3e"
                                        style={styles.switch}
                                        onValueChange={val => formikProps.setFieldValue('owner', val)}
                                        value={formikProps.values.owner}
                                    />
                                </View>
                                <View style={styles.switchContainer}>
                                    <Text style={styles.switchLabel} >Activo:   </Text>
                                    <Switch
                                        trackColor={{ false: "#d9d9d9", true: "#4CAF50" }}
                                        thumbColor={"#F3F3f3"}
                                        ios_backgroundColor="#3e3e3e"
                                        style={styles.switch}
                                        onValueChange={val => formikProps.setFieldValue('isActive', val)}
                                        value={formikProps.values.isActive}
                                    />
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    {formikProps.isSubmitting ? (
                                        <ActivityIndicator color={styles.activityIndicator.color} />
                                    ) : (
                                        <Button
                                            onPress={formikProps.handleSubmit}
                                            icon={
                                                <Icon type="AntDesign" name="save"
                                                    style={styles.isDark || styles.buttonStyle.backgroundColor === 'transparent' ?
                                                        { color: '#2189DC' } : undefined}
                                                />
                                            }
                                            title={localization['psp.lblGuardar']}
                                            disabled={!formikProps.isValid}
                                            buttonStyle={[styles.buttonStyle, { marginTop: 10 }]}
                                            type={
                                                styles.isDark ||
                                                    styles.buttonStyle.backgroundColor === 'transparent'
                                                    ? 'outline'
                                                    : undefined
                                            }
                                        />
                                    )}
                                </View>
                            </View>
                        )}
                    </Formik>


                </View>
            </Modal>

        </NavigationView >
    );
}

export default Schedule;
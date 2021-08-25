import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import styles from './styles';
import { showToast, NavigationView, Picker, Input, DateInput, Decimal, Number, CurrencyInput } from 'odc-mobile-common';
import { GrabarClienteCobranza, validarAsesorCobranza } from '../../../communication/cobranza'
import { View, Text, ActivityIndicator, Switch } from 'react-native'
import * as yup from 'yup'
import { Button } from 'react-native-elements';
import localization from '../../../localization/cobranza'
import { Icon } from 'native-base';
import style from '../../common/Sidebar/style';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native'

const FormTest = ({ navigation }) => {
    const [valorFormularioDelServicio, setValorFormularioDelServicio] = useState({});

    //let { Catalogs } = GLOBAL
    let Catalogs = {};
    Catalogs.tipoIdentificacion = [{ value: "CED", label: "CED" }, { value: "RUC", label: "RUC" }]

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                console.log("Aqui voy a  abuscar la DATA");
                let resultadoBusquedaServicio = {
                    tipoIdentificacion: "CED",
                    identificacion: "1938789680101",
                    valoracionBuro: "AAA"
                }
                setValorFormularioDelServicio(resultadoBusquedaServicio);
            }
            fetchData();
        }, []),
    );


    return (//<NavigationView navigation={navigation} style={styles.styledView}>
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{
                    ...valorFormularioDelServicio,
                    isActive: false,
                    fechaNacimiento: new Date('1986-10-15'),
                    mesesExperiencia: 0,
                    aniosExperiencia: 0,
                    salario: 5000
                }}
                onSubmit={async (values) => {

                    setValorFormularioDelServicio({ ...valorFormularioDelServicio, ...values });

                    console.log(valorFormularioDelServicio);
                    let result = await GrabarClienteCobranza(valorFormularioDelServicio);
                  
                    if (!result.state)
                        global.props.displayAlert(
                            localization['psp.titleAlert'],
                            result.message,
                            undefined,
                            undefined,
                        );


                        debugger;
                }}
                enableReinitialize
                validationSchema={yup.object().shape({
                    tipoIdentificacion: yup.string().required('Obligatorio'),
                    identificacion: yup.string().validateIdentification({ allowEmpty: false }),
                    isActive: yup.boolean(true),
                    fechaNacimiento: yup.string().test('object', 'Obligatorio', function (value) {
                        const { parent, createError, path } = this;
                        const { fechaNacimiento } = parent;
                        let dtFechaNacimiento = new Date(fechaNacimiento)
                        let dayOfMonth = +moment(dtFechaNacimiento).format("DD");
                        if (+dayOfMonth >= 1 && +dayOfMonth <= 10)
                            return createError({ path, message: `No se permiten los primeros dias del mes` });
                        return true
                    }),
                    mesesExperiendia: yup.string().test('object', 'Obligatorio', function (value) {
                        const { parent, createError, path } = this;
                        const { mesesExperiencia, aniosExperiencia } = parent;

                        if (mesesExperiencia < 0 || mesesExperiencia > 12)
                            return createError({ path, message: `solo hay 12 meses` });

                        if (mesesExperiencia == 0 && aniosExperiencia == 0)
                            return createError({ path, message: `Necesitas meses Experiencia` });

                        return true;

                    }),
                    aniosExperiencia: yup.string().test('object', 'Obligatorio', function (value) {
                        const { parent, createError, path } = this;
                        const { mesesExperiencia, aniosExperiencia } = parent;

                        if (aniosExperiencia > 30)
                            return createError({ path, message: `no mas de 30` });
                        if (mesesExperiencia == 0 && aniosExperiencia == 0)
                            return createError({ path, message: `Necesitas años Experiencia` });

                        return true;

                    }),
                    salario: yup.string().test('object', 'Obligatorio', function (value) {
                        const { parent, createError, path } = this;
                        const { salario, salarioRaw } = parent;

                        let mensaje = `deberias ganar mas de 8000 Q`

                        if (salario && salario < 8000)
                            return createError({ path, message: mensaje });

                        if (isNaN(salarioRaw))
                            return createError({ path, message: mensaje });

                        if (salarioRaw && salarioRaw < 8000)
                            return createError({ path, message: mensaje });

                        return true
                    }),
                })}
            >
                {formikProps => {
                    console.log(formikProps.isSubmitting)
                    return (
                        <View style={{ ...styles.styledForm, flex: 1 }}>
                            <View style={styles.rowContainer}>
                                <View style={{ ...styles.midItem50 }}>
                                    <Picker
                                        formikKey={"tipoIdentificacion"}
                                        formikProps={formikProps}
                                        label={localization["cobranza.lblTipoId"]}
                                        elements={Catalogs.tipoIdentificacion}
                                    //placeholder
                                    ></Picker>
                                </View>
                                <View style={{ ...styles.midItem50 }}>

                                    <Input
                                        label={"Identificacion"}
                                        formikProps={formikProps}
                                        formikKey={"identificacion"}
                                        value={formikProps.values.identificacion}
                                    >
                                    </Input>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={{ ...styles.midItem30 }}>
                                    <Text>ES ACTIVO: </Text>
                                    <Switch
                                        trackColor={{ false: "#d9d9d9", true: "#4CAF50" }}
                                        thumbColor={"#F3F3f3"}
                                        ios_backgroundColor="#3e3e3e"
                                        style={styles.switch}
                                        onValueChange={val => formikProps.setFieldValue('isActive', val)}
                                        value={formikProps.values.isActive}
                                    />
                                </View>

                                <View style={styles.midItem70}>
                                    <DateInput
                                        formikKey={"fechaNacimiento"}
                                        formikProps={formikProps}
                                        label={"fecha de Nacimiento"}
                                        value={formikProps.values.fechaNacimiento}
                                    >

                                    </DateInput>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                {<View style={{ ...styles.midItem50 }}>
                                    <Number
                                        label={"Meses Exp"}
                                        formikProps={formikProps}
                                        formikKey={"mesesExperiencia"}
                                    ></Number>
                                </View>}
                                <View style={{ ...styles.midItem50 }}>
                                    <Decimal
                                        label={"Años Exp"}
                                        formikProps={formikProps}
                                        formikKey={"aniosExperiencia"}
                                    ></Decimal>
                                </View>
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={{ ...styles.fullItem }}>
                                    <CurrencyInput
                                        label={"Salario"}
                                        formikProps={formikProps}
                                        formikKey={"salario"}
                                    ></CurrencyInput>
                                </View>
                            </View>





                          

                            <View style={{ marginBottom: 10, marginTop: 100 }}>
                                {formikProps.isSubmitting === true ? (
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
                                        title={localization['cobranza.tltGuardar']}
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
                    )

                }
                }
            </Formik>

        </View >
    )
    //</NavigationView>)
}

export default FormTest;
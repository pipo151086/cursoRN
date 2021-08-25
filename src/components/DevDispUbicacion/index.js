import React, { useState } from 'react';
import { Text, View } from 'native-base';
import styles from './styles';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Input, Picker, phoneNumerValidation, email } from 'odc-mobile-common';
import { Icon } from 'native-base';
import { Button } from 'react-native-elements';
import localization from '../../localization';
import { Formik } from 'formik';
import * as yup from 'yup';

const DevDispUbicacion = ({ setDispositivosUbicacion, dispositivosUbicacion, formikProps }) => {
    const [visibleNuevoDisp, setVisibleNuevoDisp] = useState(false);
    const redSocialRegex = /^@?(\w){1,15}$/;

    const getIconDisp = (el) => {
        if (el)
            switch (el.TipoDispositivo || el.tipoDispositivo) {
                case 'CEL':
                    return <Icon style={styles.gestionIcon} type="FontAwesome5" name="mobile-alt" />
                case 'TCON':
                case "CON":
                case "COV":
                case 'PBX':
                    return <Icon style={styles.gestionIcon} type="Entypo" name="old-phone" />
                case "FAX":
                    return <Icon style={styles.gestionIcon} type="FontAwesome" name="fax" />
                case "EMAIL":
                    return <Icon style={styles.gestionIcon} type="Entypo" name="email" />
                case 'TWITTER':
                    return <Icon style={styles.gestionIcon} type="Entypo" name="twitter" />
                case 'FACEBOOK':
                    return <Icon style={styles.gestionIcon} type="FontAwesome" name="facebook" />
            }
    }

    const getDescripDisp = (el) => {
        if (el) {
            let valorMostrar = el.Valor ? el.Valor : el.valor;
            switch (el.TipoDispositivo || el.tipoDispositivo) {
                case 'CEL':
                    return (<>
                        <Text style={styles.label}>{"Cel: "}</Text>
                        <Text style={styles.value}>{valorMostrar}</Text>
                    </>
                    )
                case 'TCON':
                case "CON":
                case "COV":
                case 'PBX':
                    if (el.extension)
                        valorMostrar = `${valorMostrar}  ext.${el.extension}`;
                    return (<>
                        <Text style={styles.label}>{"Con: "}</Text>
                        <Text style={styles.value}>{valorMostrar}</Text>
                    </>)
                case "FAX":
                    if (el.extension)
                        valorMostrar = `${valorMostrar}  ext.${el.extension}`;
                    return (<>
                        <Text style={styles.label}>{localization['psp.lblFax'] + ": "}</Text>
                        <Text style={styles.value}>{`${valorMostrar}`}</Text>
                    </>)
                case 'TWITTER':
                    return (<>
                        <Text style={styles.label}>{"Tw: "}</Text>
                        <Text style={styles.value}>{valorMostrar}</Text>
                    </>)
                case 'FACEBOOK':
                    return (<>
                        <Text style={styles.label}>{"Fb: "}</Text>
                        <Text style={styles.value}>{valorMostrar}</Text>
                    </>)
                    break;
                case "EMAIL":
                    return (<>
                        <Text style={styles.value}>{valorMostrar}</Text>
                    </>)
                    break;
            }
        }
    }

    const deleteTempDisp = (itm) => {
        let upDips = dispositivosUbicacion.filter(item => item.valor != itm.valor);
        setDispositivosUbicacion(upDips);
    }

    const val_un_fb_tw = (value) =>
        value && redSocialRegex.test(value)
            ? { message: "inválido", res: false }
            : { res: true }

    return (
        <View style={{}}>
            <View style={styles.borderSeccionDev}>
                <Text style={styles.tituloGrupo}>{localization['psp.lblDispUbicacion']}</Text>
                <View style={styles.tabView}>
                    <View style={{ width: "100%", marginTop: -10 }}>
                        {dispositivosUbicacion && dispositivosUbicacion.length > 0 ?
                            (dispositivosUbicacion.map((el, index) =>
                                < View key={index} style={[styles.rowContainer]}>
                                    {getIconDisp(el)}
                                    <View style={[styles.rowContainer, { marginTop: 2 }]}>
                                        {getDescripDisp(el)}
                                    </View>
                                    {el && el.esObligatorio == false ? (<>
                                        <TouchableOpacity
                                            style={{ ...styles.roundRemoveBtnStyle, }}
                                            onPress={() => { deleteTempDisp(el) }}>
                                            <Text style={styles.roundBtnText}>-</Text>
                                        </TouchableOpacity>
                                    </>) : (<>
                                        <Icon style={{ ...styles.gestionIcon, marginRight: 1 }} type="FontAwesome5" name="lock" />
                                    </>)}
                                </View>)
                            ) : (<>
                                <Text style={{ ...styles.label, ...styles.centeredText, fontStyle: 'italic', fontSize: 10, width: 100 }}>{localization['psp.noData']}</Text>
                            </>)
                        }
                    </View>
                    <View style={[styles.fullItem, styles.rowContainer]}>
                        <View>
                            {!visibleNuevoDisp &&
                                <TouchableOpacity
                                    style={styles.roundNewBtnStyle}
                                    onPress={() => {
                                        setVisibleNuevoDisp(true);
                                        formikProps.setFieldValue('dispUbicacionReady', false);
                                    }}>
                                    <Text style={styles.roundBtnText}>+</Text>
                                </TouchableOpacity>
                            }
                            {visibleNuevoDisp &&
                                <Formik
                                    initialValues={{
                                        phoneType: Catalogs.TipoDispositivo[0].value,
                                        valor: '',
                                        extension: ""
                                    }}
                                    enableReinitialize
                                    onSubmit={async values => {
                                        let newDisp = {
                                            extension: values.extension,
                                            idDireccionCliente: "0",
                                            idDireccionDispositivoUbicacion: "0",
                                            tipoDispositivo: values.phoneType,
                                            valor: values.valor,
                                            id: 0,
                                            esObligatorio: false
                                        };
                                        dispositivosUbicacion.push(newDisp);
                                        setDispositivosUbicacion([...dispositivosUbicacion]);
                                        formikProps.setFieldValue('dispUbicacionReady', true);
                                        setVisibleNuevoDisp(false);
                                    }}
                                    validationSchema={yup.object().shape({
                                        phoneType: yup.string().required('Obligatorio'),
                                        valor: yup.string().required('Obligatorio')
                                            .test('string', 'Ya Existe', function (value) {
                                                const { parent, createError, path } = this;
                                                const { phoneType, valor } = parent;
                                                let valResult = false;
                                                switch (phoneType) {
                                                    case 'FAX':
                                                    case 'PBX':
                                                    case "TCON":
                                                        valResult = phoneNumerValidation("COV", valor);
                                                        if (!valResult.val)
                                                            return createError({ path, message: valResult.message });
                                                        break;
                                                    case "CEL":
                                                        valResult = phoneNumerValidation("CEL", valor);
                                                        debugger;
                                                        if (!valResult.val)
                                                            return createError({ path, message: valResult.message });
                                                        break;
                                                    case 'EMAIL':
                                                        let valEmail = email(valor);
                                                        if (valEmail == "Dirección email inválida")
                                                            return createError({ path, message: valEmail });
                                                        break;
                                                    case 'TWITTER':
                                                    case 'FACEBOOK':
                                                        let resValUsrName = val_un_fb_tw(valor);
                                                        if (!resValUsrName.res)
                                                            return createError({ path, message: `${phoneType.charAt(0).toUpperCase() + phoneType.slice(1).toLowerCase()} ${resValUsrName.message} @ y 15 caracteres` });
                                                        break;
                                                }

                                                let result = dispositivosUbicacion.some(itm => itm.valor === valor && itm.tipoDispositivo === phoneType);
                                                if (result)
                                                    return createError({ path, message: "Ya existe" });

                                                return true


                                            }),
                                        extension: yup.string().test("string", "Solo Números", function (value) {
                                            const { parent, createError, path } = this;
                                            const { phoneType, valor, extension } = parent;
                                            if (phoneType === "PBX" || phoneType === "FAX" || phoneType === "TCON") {
                                                var reg = /^\d+$/;
                                                let resultVal = reg.test(extension);
                                                return resultVal;
                                            }
                                            return true;
                                        })
                                    })}>
                                    {formikNuevoDispProps => {
                                        return (<View style={[styles.styledForm, { padding: 0, marginLeft: -5 }]}>
                                            <View style={{
                                                ...styles.rowContainer,
                                                ...styles.fullItem,
                                                marginBottom: 0
                                            }}>
                                                <View style={{ width: "50%" }}>
                                                    <Picker
                                                        label={localization['psp.lblTipoTelefono']}
                                                        formikKey="phoneType"
                                                        formikProps={formikNuevoDispProps}
                                                        elements={Catalogs.TipoDispositivo.filter(el =>
                                                            el.value != 'GPS' &&
                                                            el.value != 'WEBSITE' &&
                                                            el.value != 'BEEPER' &&
                                                            el.value != 'SUMLUZ' &&
                                                            el.value != 'TINTER'
                                                        )}
                                                        value={formikNuevoDispProps.values.phoneType}
                                                    />
                                                </View>
                                                <View style={{ width: "50%" }}>
                                                    <Input
                                                        name="valor"
                                                        label={localization['psp.lblValorDispUbica']}
                                                        formikProps={formikNuevoDispProps}
                                                        formikKey="valor"
                                                        value={formikNuevoDispProps.values.valor}
                                                        maxLength={formikNuevoDispProps.values.phoneType === "TCON" ||
                                                            formikNuevoDispProps.values.phoneType === "CEL" ||
                                                            formikNuevoDispProps.values.phoneType === "FAX" ||
                                                            formikNuevoDispProps.values.phoneType === "PBX" ?
                                                            8 : 128}
                                                    />
                                                </View>
                                            </View>
                                            {(formikNuevoDispProps.values.phoneType === "TCON"
                                                || formikNuevoDispProps.values.phoneType === "PBX"
                                                || formikNuevoDispProps.values.phoneType === "FAX"
                                                || formikNuevoDispProps.values.phoneType === "CON") ?
                                                (<View style={{
                                                    ...styles.rowContainer,
                                                    ...styles.fullItem,
                                                    marginBottom: 0
                                                }}>
                                                    <View style={{ width: "50%" }}>
                                                        <Input
                                                            name="extension"
                                                            label={"Extensión"}
                                                            formikProps={formikNuevoDispProps}
                                                            formikKey="extension"
                                                            value={formikNuevoDispProps.values.extension}
                                                        />
                                                    </View>
                                                </View>)
                                                : (<></>)
                                            }


                                            {visibleNuevoDisp && !formikNuevoDispProps.isSubmitting &&
                                                <View style={{
                                                    ...styles.rowContainer,
                                                    ...styles.centeredText,
                                                    marginTop: 0,
                                                    marginBottom: 10
                                                }}>
                                                    <View style={{ marginRight: 50 }}>
                                                        <Button
                                                            onPress={() => {
                                                                setVisibleNuevoDisp(false);
                                                                formikProps.setFieldValue('dispUbicacionReady', true);
                                                            }}
                                                            buttonStyle={{
                                                                backgroundColor: 'white',
                                                                borderTopColor: '#2196f3',
                                                                borderColor: '#2196f3',
                                                                borderWidth: 2,
                                                                height: 35,
                                                                margin: 0,
                                                                width: 130,
                                                            }}
                                                            title={localization["common.cancelar"]}
                                                            titleStyle={{
                                                                color: '#2196f3',
                                                                fontSize: 18,
                                                            }}
                                                            icon={
                                                                <Image
                                                                    style={{
                                                                        marginRight: 10,
                                                                        height: 25,
                                                                        width: 25,
                                                                        left: 0

                                                                    }}
                                                                    source={require("!/icons/CANCELAR-32.png")}
                                                                />
                                                            }
                                                        />
                                                    </View>
                                                    <View>
                                                        <Button
                                                            icon={
                                                                <Icon type="AntDesign" name="save"
                                                                    style={styles.isDark || styles.buttonStyle.backgroundColor === 'transparent' ?
                                                                        { color: '#2189DC', marginRight: 15 } : { left: -15 }}
                                                                />
                                                            }
                                                            onPress={formikNuevoDispProps.handleSubmit}
                                                            title={localization['psp.lblGuardar']}
                                                            disabled={!formikNuevoDispProps.isValid}
                                                            buttonStyle={{ ...styles.buttonStyle, width: 130, borderColor: '#2196f3', borderWidth: 2, height: 35, }}
                                                            type={styles.isDark || styles.buttonStyle.backgroundColor === 'transparent' ? 'outline' : undefined}
                                                        />
                                                    </View>
                                                </View>
                                            }
                                            {formikNuevoDispProps.isSubmitting &&
                                                <ActivityIndicator color={styles.activityIndicator.color} />
                                            }
                                        </View>)
                                    }
                                    }
                                </Formik>
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default DevDispUbicacion;
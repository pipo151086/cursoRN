import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import {
  Picker,
  CurrencyInput,
  CurrencyFormatter,
  dateFormat,
  DateInput,
  Input,
  filterElementsByParent,
} from 'odc-mobile-common';
import styles from './styles';
import { PspContext } from '../../../providers';
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as yup from 'yup';
//import { Catalogs } from '../../../catalogs';
import localization from '../../../localization';
import { Button } from 'react-native-elements';
import moment from 'moment';
import {
  ConsultarTransaccionCompletaMovil,
  ConsultarTipoTablaProductoMobile,
} from '../../../communication/prospecting';
import { NavigationContext } from '@react-navigation/native';
import { getFechVencimiento } from '../../../utils/otherUtils';

const required = 'Obligatorio';
const validationSchema = yup.object().shape({
  nit: yup.string().validateNit(), //.required(required),
  nacionalidad: yup.string().required(required),
  origenIngresos: yup.string().required(required),
  fuenteIngresos: yup.string().required(required),
  subtipoOrigenIngresos: yup.string().required(required),
  celular: yup.string().validatePhoneNumber({ type: 'CEL' }),
  ingresos: yup.string().test('number', required, function (value) {
    const max = 35000;
    const min = 2000;
    const { parent, createError, path } = this;
    const { ingresosRaw } = parent;
    let val = ingresosRaw;
    if (val >= min && val <= max) return true;
    if (val < min)
      return createError({ path, message: `Mínimo ${CurrencyFormatter(min)}` });
    if (val > max)
      return createError({ path, message: `Máximo ${CurrencyFormatter(max)}` });
  }),
});

const ExtraData = () => {
  const {
    extraDataVisible,
    setExtraDataVisible,
    currentPsp,
    addPsp,
    addOferta,
  } = useContext(PspContext);
  const navigation = useContext(NavigationContext);
  let prospect = currentPsp ? currentPsp.psp : undefined;
  const { Catalogs } = GLOBAL;
  
  const onPressHideModal = () => {
    setExtraDataVisible(false);
  };

  useEffect(() => { }, []);

  if (prospect)
    return (
      <Modal
        testID={'modalSchedule'}
        isVisible={extraDataVisible}
        backdropColor="black"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={onPressHideModal}>
        <View style={styles.modalBody}>
          <View>
            <Text style={styles.modalTitle}>{localization['psp.titulo']}</Text>
            <Divider style={styles.styledDevider} />

            <Formik
              initialValues={{
                nit: '',
                celular: '',
                nacionalidad: Catalogs.TipoNacionalidad[0].value,

                fuenteIngresos: Catalogs.FuenteIngreso[0].value,
                origenIngresos: Catalogs.OrigenIngreso[0].value,
                subtipoOrigenIngresos: undefined,

                ingresos: 50000,
                fechaNacimiento: moment()
                  .add(-25, 'years')
                  .format(dateFormat),
              }}
              enableReinitialize
              onSubmit={async values => {
                currentPsp.psp = {
                  ...currentPsp.psp,
                  ...values,
                  nuevaInfoUbicacion: {
                    idCliente: currentPsp.psp.idCliente,
                    dispositivo: [],
                    direccion: [],
                    correo: [],
                  },
                  esSeguimiento: false,
                  claseCliente: 'CLIENTE',

                  producto: currentPsp.psp.codigoProducto,
                  subProducto: currentPsp.psp.codigoSubProducto,
                  control: currentPsp.psp.tipoControl,
                };

                let resultAll = await Promise.all([
                  ConsultarTransaccionCompletaMovil(currentPsp.psp),
                  ConsultarTipoTablaProductoMobile(
                    currentPsp.psp.codigoSubProducto,
                  ),
                ]).then(values => {
                  return values;
                });

                let consultarTransaccionCompletaMovilResult = resultAll[0];
                if (!consultarTransaccionCompletaMovilResult.state) {
                  onPressHideModal();
                  global.props.displayAlert(
                    localization['psp.titleAlert'],
                    'CompletaMovil => ' +
                    consultarTransaccionCompletaMovilResult.message,
                    undefined,
                    () => navigation.navigate('Campaign'),
                  );
                  return;
                }

                currentPsp.psp.calcularTablaResult =
                  consultarTransaccionCompletaMovilResult.data.generadorTablaAmortizacionResponse;
                currentPsp.psp.idCliente =
                  consultarTransaccionCompletaMovilResult.data.idCliente;
                currentPsp.psp.retanqueoResult =
                  consultarTransaccionCompletaMovilResult.data.dtoOperacionesVigentesSeguros;
                currentPsp.psp.buro =
                  consultarTransaccionCompletaMovilResult.data.respuestaBuroSIRC;

                const tipoTablaProducto = resultAll[1];
                if (!tipoTablaProducto.state) {
                  global.props.displayAlert(
                    localization['psp.titleAlert'],
                    tipoTablaProducto.message,
                    undefined,
                    () => navigation.navigate('Campaign'),
                  );
                  setIsLoading(false);
                  return;
                }

                let tmpTipoTablaProd = tipoTablaProducto.data.map(itm => {
                  itm.value = itm.codigoTipoTabla;
                  itm.label = itm.descripcion;
                  return itm;
                });

                let saldototal = 0;
                if (currentPsp.psp.retanqueoResult.listaCreditos.length > 0)
                  currentPsp.psp.retanqueoResult.listaCreditos.map(el => {
                    saldototal += +el.saldo;
                    el.key = el.numeroCredito;
                  });
                let ofertaSeleccionada = {
                  sugerida: {
                    producto: currentPsp.psp.codigoProducto,
                    subProducto: currentPsp.psp.codigoSubProducto,
                    monto: currentPsp.psp.monto,
                    periodos: currentPsp.psp.plazo,
                    nombreCampania: currentPsp.psp.nombreCampania,
                    tiempos_Respuesta: 'N/A',
                    tipoControl: {
                      tipoControl: currentPsp.psp.tipoControl,
                      tiempoRespuesta: '0',
                      vtActor: '0',
                      vtReferencias: '0',
                      vtArrendador: '0',
                      vtLaboral: '0',
                      vfDomicilioNegocio: '0',
                      vfDomicilioNegocioPost: '0',
                      vfEmpresa: '0',
                      vtAntesEntrega: '0',
                      vtContraEntrega: '0',
                      vtPostEntrega: '0',
                      vfAntesEntrega: '0',
                      vfContraEntrega: '0',
                      vfPostEntrega: '0',
                      cargaFinanciera: '0',
                      precalifConyuge: '0',
                      precalifAvl: '0',
                      muestreoPost: '0',
                    },
                  },
                  solicitada: {
                    saldoVal: saldototal,
                    saldoSol: saldototal.toFixed(2),
                    montoSol: currentPsp.psp.monto.toFixed(2),
                    montoSolRaw: +currentPsp.psp.monto,
                    montoLiqSol: !currentPsp.psp.montoLiquido
                      ? (currentPsp.psp.monto - saldototal).toFixed(2)
                      : 0,
                    periodosSol: currentPsp.psp.plazo.toString(),
                    tiempoRespuesta: 'N/A',
                    fchVenSol: getFechVencimiento(item.datosRangoProducto),

                    tablaSol: currentPsp.psp.calcularTablaResult.dividendos[0].tipoTablaAmortizacion.toUpperCase(), ////// VALIDAR PARA EL RESTO DE PRODUCTOS ??????????
                    cuotaSol: '',
                    desembolsoSol: Catalogs.FormasDesembolso[0].value,
                    tipoTablaProducto: tmpTipoTablaProd,
                    seguros: currentPsp.psp.retanqueoResult.rubros.rubrosPlanes,
                  },
                  seguros: currentPsp.psp.retanqueoResult.rubros.rubrosPlanes,
                  retanqueo: currentPsp.psp.retanqueoResult.listaCreditos,
                  limites:
                    currentPsp.psp.retanqueoResult.plazoMontosSubproducto,
                };
                currentPsp.psp.ofertaSeleccionada = ofertaSeleccionada;
                currentPsp.psp.oferta = {
                  grupoAgenciaConsumo: currentPsp.psp.grupoAgenciaConsumo,
                  tipoCliente: currentPsp.psp.tipoClienteComercial,
                  perfilConsumo: currentPsp.psp.perfilConsumo,
                };

                currentPsp.psp.ofertaSeleccionada.solicitada.cuotaSol =
                  currentPsp.psp.calcularTablaResult.dividendos[0].cuota;
                addOferta(ofertaSeleccionada);
                addPsp({ psp: { ...currentPsp.psp } });
                onPressHideModal();
                navigation.navigate('Gestion');
              }}
              validationSchema={validationSchema}>
              {formikProps => (
                <View style={{ ...styles.styledForm, marginTop: 0 }}>
                  <View style={styles.rowContainer}>
                    <View style={styles.midItem50}>
                      <Input
                        name="nit"
                        placeholder={localization['psp.lblNit']}
                        label={localization['psp.lblNit']}
                        formikProps={formikProps}
                        formikKey="nit"
                        value={formikProps.values.nit}
                      />
                    </View>
                    <View style={styles.midItem50}>
                      <Input
                        name="numeroCelular"
                        placeholder={localization['psp.lblNumeroCelular']}
                        label={localization['psp.lblNumeroCelular']}
                        formikProps={formikProps}
                        formikKey="celular"
                        value={formikProps.values.celular}
                        maxLength={8}
                      />
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.midItem50}>
                      <Picker
                        label={localization['psp.lblNacionalidad']}
                        formikKey="nacionalidad"
                        formikProps={formikProps}
                        elements={Catalogs.TipoNacionalidad}
                        value={formikProps.values.nacionalidad}
                      />
                    </View>
                    <View style={styles.midItem50}>
                      <DateInput
                        name="fechaNacimiento"
                        placeholder={localization['psp.lblFechaNacimiento']}
                        label={localization['psp.lblFechaNacimiento']}
                        formikProps={formikProps}
                        formikKey="fechaNacimiento"
                        value={formikProps.values.fechaNacimiento}
                      />
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    {/*fuente Ingreso--- Origen Ingreso*/}
                    <View style={styles.midItem50}>
                      <Picker
                        label={localization['psp.lblFuenteIngresos']}
                        formikKey="fuenteIngresos"
                        formikProps={formikProps}
                        elements={Catalogs.FuenteIngreso}
                        value={formikProps.values.fuenteIngresos}
                        onValueChangeSideEffect={val => {
                          let flt = filterElementsByParent(
                            Catalogs.OrigenIngreso,
                            val,
                          );
                          formikProps.setFieldValue(
                            'origenIngresos',
                            undefined,
                          );
                          formikProps.setFieldValue(
                            'subtipoOrigenIngresos',
                            undefined,
                          );
                        }}
                      />
                    </View>
                    <View style={styles.midItem50}>
                      <Picker
                        label={localization['psp.lblOrigenIngresos']}
                        formikKey="origenIngresos"
                        formikProps={formikProps}
                        elements={filterElementsByParent(
                          Catalogs.OrigenIngreso,
                          formikProps.values.fuenteIngresos,
                        )}
                        onValueChangeSideEffect={val => {
                          let flt = filterElementsByParent(
                            Catalogs.SubtipoOrigenIngreso,
                            val,
                          );
                          formikProps.setFieldValue(
                            'subtipoOrigenIngresos',
                            undefined,
                          );
                        }}
                      />
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={styles.midItem50}>
                      <Picker
                        label={localization['psp.lblSubOrigenIngresos']}
                        formikKey="subtipoOrigenIngresos"
                        formikProps={formikProps}
                        elements={filterElementsByParent(
                          Catalogs.SubtipoOrigenIngreso,
                          formikProps.values.origenIngresos,
                        )}
                      />
                    </View>
                    <View style={styles.midItem50}>
                      <CurrencyInput
                        formikProps={formikProps}
                        label={localization['psp.lblIngresos']}
                        formikKey="ingresos"
                        style={{ fontSize: 16 }}
                        value={String(formikProps.values['ingresos'])}
                      />
                    </View>
                  </View>

                  <View style={{ marginBottom: 10 }}>
                    {formikProps.isSubmitting ? (
                      <ActivityIndicator
                        color={styles.activityIndicator.color}
                      />
                    ) : (
                        <Button
                          onPress={formikProps.handleSubmit}
                          title={localization['psp.lblGuardar']}
                          disabled={!formikProps.isValid}
                          buttonStyle={[styles.buttonStyle]}
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
        </View>
      </Modal>
    );
  else return <></>;
};

export default ExtraData;

import React, { useEffect, useContext, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationView, showToast } from 'odc-mobile-common';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import styles from './styles';
import { PspContext } from '../../../providers';
import PortfolioItem from './portfolioItem';
import {
  ConsultarOperacionesVigentes,
  ConsultarTipoTablaProductoMobile,
  ConsultarGestionesCampania,
  ConsultarProductoFormaDesembolso,
  ConsultarDestinosCreditos,
  ConsultarCuentas
} from '../../../communication/prospecting';

import localization from '../../../localization';
import { getAllProspects } from '../../../database/prospecting/dbHandler';
import { useFocusEffect } from '@react-navigation/native';
import { getFechVencimiento } from '../../../utils/otherUtils';
import _ from 'lodash';

const PortfolioScreen = ({ navigation, route }) => {
  const [portfolioResult, setPortfolioResult] = useState({});
  const [filteredPortfolioResult, setFilteredPortfolioResult] = useState({});
  const [query, setQuery] = useState('');
  const { addPsp, addOferta } = useContext(PspContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);



  const fetchData = async fromNavBar => {
    let params = route && route.params ? route.params : {};
    let result = await getAllProspects();
    if (
      !fromNavBar &&
      params.tipoGestion &&
      params.camp &&
      params.camp.idCampania
    ) {
      result = result.filter(
        ext =>
          ext.tipoGestion === params.tipoGestion &&
          +ext.idCampania === +params.camp.idCampania,
      );
    }
    result = _.orderBy(result, ['nombreCliente'], ['asc']);
    let tmpResNoGest = result.filter(x => x.tipoGestion === "NOGESTIONADO")
    let tmpResRegest = result.filter(x => x.tipoGestion === "REGESTION")
    let tmpResGest = result.filter(x => x.tipoGestion === "GESTIONADO")
    let finalRes = [...tmpResNoGest, ...tmpResRegest, ...tmpResGest];

    setPortfolioResult(finalRes);
    setFilteredPortfolioResult(finalRes);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setQuery('');
      fetchData(route.params?.fromNavBar);
    }, [, route.params?.fromNavBar, route.params?.tipoGestion, route.params?.idCampania])
  );

  useEffect(() => {
    if (query && query.length > 0) {
      let lowerCaseQuery = query.toLowerCase();
      let resNombre = portfolioResult.filter(psp => psp._raw.nombreCliente.toLowerCase().includes(lowerCaseQuery));
      let resID = portfolioResult.filter(psp => psp._raw.identificacion.toLowerCase().includes(lowerCaseQuery));
      let resSol = portfolioResult.filter(psp => psp._raw.numeroSolicitud.toLowerCase().includes(lowerCaseQuery));
      let resTipGes = portfolioResult.filter(psp => psp._raw.tipoGestion.toLowerCase().includes(lowerCaseQuery));
      setFilteredPortfolioResult([...resNombre, ...resID, ...resSol, ...resTipGes]);
    } else setFilteredPortfolioResult(portfolioResult);
  }, [query]);

  const customChange = value => {
    setQuery(value);
  };

  const renderItem = ({ item }) => {
    return (
      <SwipeRow
        leftOpenValue={0}
        rightOpenValue={0}
      >
        <View />

        <TouchableOpacity
          onPress={async () => {
            if (!item.seGestiono) {
              let currentPsp = {
                psp: {
                  ...item._raw,
                  producto: item.codigoProducto,
                  subProducto: item.codigoSubProducto,
                  control: item.tipoControl,
                  nuevaInfoUbicacion: {
                    idCliente: item._raw.idCliente,
                    dispositivo: [],
                    direccion: [],
                    correo: [],
                  },
                },
              };
              setIsLoading(true);

              let resultAll = await Promise.all([
                ConsultarGestionesCampania(currentPsp.psp),
                ConsultarOperacionesVigentes(
                  currentPsp.psp,
                  {
                    ...item,
                    producto: item.codigoProducto,
                    subProducto: item.codigoSubProducto,
                    control: item.tipoControl,
                  },
                ),
                ConsultarTipoTablaProductoMobile(currentPsp.psp.codigoSubProducto),
                ConsultarProductoFormaDesembolso(currentPsp.psp.codigoSubProducto),
                ConsultarDestinosCreditos(currentPsp.psp.codigoSubProducto),

                //ConsultarCuentas((currentPsp.psp.tipoIdentificacion === 'DPI') ? "CED" : currentPsp.psp.tipoIdentificacion, currentPsp.psp.identificacion)
                ConsultarCuentas(currentPsp.psp.tipoIdentificacion, currentPsp.psp.identificacion)
              ]).then(values => {
                return values;
              });
              let gestionesCampaniaRes = resultAll[0];
              let retanqueoResult = resultAll[1];
              let tipoTablaProductoResult = resultAll[2];
              let formaDesembolsoResult = resultAll[3];
              let destinoCredResult = resultAll[4];
              let consultarCuentasResult = resultAll[5];

              if (!consultarCuentasResult.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  consultarCuentasResult.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }
              if (!formaDesembolsoResult.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  formaDesembolsoResult.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }
              if (!gestionesCampaniaRes.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  gestionesCampaniaRes.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }
              if (!retanqueoResult.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  retanqueoResult.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }
              if (!tipoTablaProductoResult.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  tipoTablaProductoResult.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }

              if (
                !formaDesembolsoResult.data || formaDesembolsoResult.data.length <= 0 ||
                !retanqueoResult.data || retanqueoResult.data.length <= 0 ||
                !tipoTablaProductoResult.data || tipoTablaProductoResult.data.length <= 0
              ) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  "Producto No Parametrizado Correctamente",
                  undefined,
                  undefined,
                );
                setIsLoading(false);
                return;
              }

              let tmpTipoTablaProd = tipoTablaProductoResult.data.map(itm => {
                itm.value = itm.codigoTipoTabla;
                itm.label = itm.descripcion;
                return itm;
              });
              let tmpDefaultTabla = tmpTipoTablaProd.find(tbl => tbl.value === "CUOTAFIJABDA")

              let tmpFormaDesembolso = formaDesembolsoResult.data.map(itm => {
                itm.value = itm.codigoFormaPago;
                itm.label = itm.descripcion;
                return itm;
              });
              let tmpDefaultDesem = tmpFormaDesembolso.find(tbl => tbl.value === "NOTACRED")

              if (!destinoCredResult.state) {
                global.props.displayAlert(
                  localization['psp.titleAlert'],
                  destinoCredResult.message,
                  undefined,
                  () => navigation.navigate('Campaign'),
                );
                setIsLoading(false);
                return;
              }

              let tmpDestinoCredResult = destinoCredResult.data.map(itm => {
                itm.value = itm.codigoDestinoCredito;
                itm.label = itm.descripcion;
                return itm;
              });

              let tmpDefaultDestino = tmpDestinoCredResult.find(tbl => tbl.value === "LIBREDISPO");

              currentPsp.psp.gestiones = _.orderBy(gestionesCampaniaRes.data, ['id'], ['desc']);
              currentPsp.psp.retanqueoResult = retanqueoResult.data;
              let saldototal = 0;
              if (currentPsp.psp.retanqueoResult.listaCreditos.length > 0)
                currentPsp.psp.retanqueoResult.listaCreditos.map(el => {
                  saldototal += +el.saldo;
                  el.key = el.numeroCredito;
                });

              let ctasCliente = [{
                value: "CtaNueva",
                label: "Cuenta Nueva",
              }];

              if (consultarCuentasResult.data) {
                const { listaCuentaClienteConsulta } = consultarCuentasResult.data;
                listaCuentaClienteConsulta?.map(cta => {
                  cta.value = cta.numeroCuenta;
                  cta.label = cta.numeroCuenta;
                  ctasCliente.push({ ...cta });
                });
              }


              let ofertaSeleccionada = {
                tipoCampaniaSend: (item.nombreCampania && item.nombreCampania !== "" && item.cuota > 0) ? "RIESGOS" : "",
                tipoControlModifica: currentPsp.psp.tipoControlModifica,
                sugerida: {
                  descripcionProducto: currentPsp.psp.descripcionProducto,
                  producto: currentPsp.psp.codigoProducto,
                  subProducto: currentPsp.psp.codigoSubProducto,
                  monto: currentPsp.psp.monto,
                  periodos: currentPsp.psp.plazo,
                  plazo: currentPsp.psp.plazo,
                  nombreCampania: currentPsp.psp.nombreCampania,
                  tiempos_Respuesta: currentPsp.psp.tiempoRespuesta,
                  datosRangoProducto: currentPsp.psp.datosRangoProducto,
                  control: currentPsp.psp.tipoControl,
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
                  cuota: currentPsp.psp.cuota,
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
                  tiempoRespuesta: currentPsp.psp.tiempoRespuesta,
                  fchVenSol: getFechVencimiento(item.datosRangoProducto),
                  tablaSol: tmpDefaultTabla ? tmpDefaultTabla.value : tmpTipoTablaProd[0].value, //'CUOTAFIJABDA'

                  //cuota: currentPsp.psp.cuota,
                  desembolsoSol: tmpDefaultDesem ? tmpDefaultDesem.value : tmpFormaDesembolso[0].value,
                  tipoTablaProducto: tmpTipoTablaProd,

                  destinoCredSol: tmpDefaultDestino ? tmpDefaultDestino.value : tmpDestinoCredResult[0].value,
                  destinoCredito: tmpDestinoCredResult,


                  ctaDesembolsoSol: ctasCliente,
                  ctaDesembolsoSelectSol: ctasCliente[0]?.value,

                  formaDesembolso: tmpFormaDesembolso,
                  seguros: currentPsp.psp.retanqueoResult.rubros.rubrosPlanes,

                  valorCheque: "0",
                  acredicacionCuenta: "0"//currentPsp.psp.monto.toFixed(2),

                },
                seguros: currentPsp.psp.retanqueoResult.rubros.rubrosPlanes,
                retanqueo: currentPsp.psp.retanqueoResult.listaCreditos,
                limites: currentPsp.psp.retanqueoResult.plazoMontosSubproducto,
              };
              currentPsp.psp.ofertaSeleccionada = ofertaSeleccionada;
              currentPsp.psp.oferta = {
                grupoAgenciaConsumo: currentPsp.psp.grupoAgenciaConsumo,
                tipoCliente: currentPsp.psp.tipoClienteComercial,
                perfilConsumo: currentPsp.psp.perfilConsumo,
              };

              currentPsp.psp.ofertaSeleccionada.solicitada.cuotaSol =
                currentPsp.psp.cuota;
              addOferta(ofertaSeleccionada);
              addPsp({ psp: { ...currentPsp.psp } });

              setIsLoading(false);
              navigation.navigate('Gestion');
            } else showToast(localization['psp.ClienteGestionado']);
          }}

          activeOpacity={0.5}

        >
          <PortfolioItem {...item} />
        </TouchableOpacity>
      </SwipeRow>
    );
  };

  const _Refresh = async () => {
    setIsRefreshing(true);
    await fetchData(true);
    setIsRefreshing(false);
  };

  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={styles.activityIndicator.color}
        />
      </View>
    );

  return (
    <NavigationView navigation={navigation}>
      <SwipeListView
        style={styles.fullItem}
        data={filteredPortfolioResult}
        stickyHeaderIndices={[]}
        ListHeaderComponent={
          styles.isDark ? (
            <SearchBar
              placeholder="Buscar..."
              onChangeText={customChange}
              value={query}
              darkTheme
              containerStyle={{ padding: 3 }}
              inputContainerStyle={{ height: 30 }}
              inputStyle={{ padding: 0, height: 30 }}
            />
          ) : (
            <SearchBar
              placeholder="Buscar..."
              onChangeText={customChange}
              value={query}
              lightTheme
              containerStyle={{ padding: 8, backgroundColor: '#E8F5FC' }}
              inputContainerStyle={{ height: 30, backgroundColor: '#fff' }}
              inputStyle={{ padding: 0, height: 30 }}
            />
          )
        }
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
        keyExtractor={item => (item.idCliente.toString() + item.idDetalleAsignacionRecurso.toString())}
        leftOpenValue={0} //75
        rightOpenValue={0} //minus75
        refreshing={isRefreshing}
        onRefresh={async () => await _Refresh()}
      />
    </NavigationView>
  );
};

export default PortfolioScreen;


import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styles from './styles';
import { CurrencyFormatter } from 'odc-mobile-common'
import LinearGradient from 'react-native-linear-gradient';

const PortfolioItem = ({ _raw }) => {
  const item = _raw;
  let separador = ' | ';
  let telefonosMostrar = ""

  if (!item)
    return (<></>)

  if (item.dispositivo && typeof item.dispositivo != 'string' && item.dispositivo.length > 0) {
    item.dispositivo.map(el => telefonosMostrar += el.valor + ', ');
    telefonosMostrar = telefonosMostrar.substr(0, telefonosMostrar.length - 2)
  }
  else
    telefonosMostrar = "N/A"
  let borderColor;
  switch (item.tipoGestion) {
    case "NOGESTIONADO":
    case "No Gestionado":
      borderColor = styles.TipoGestionSemaforo.NOGESTIONADO;
      break
    case "REGESTION":
      borderColor = styles.TipoGestionSemaforo.REGESTION;
      break;
    case "GESTIONADO":
    default:
      borderColor = styles.TipoGestionSemaforo.GESTIONADO
      break;
  }

  return (
    <View style={{
      ...styles.cardView,
      ...styles.standaloneRowFront,

    }}>
      <LinearGradient
        colors={['#FFF', borderColor]}
        style={{ borderRadius: 5, marginRight: -5, marginLeft: -5 }}
        start={{ x: 0.9, y: 0.8 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{ ...styles.ListTittle, ...styles.resaltado }}>{item.nombreCliente}</Text>

        <View style={{ ...styles.itemBody }}>
          <View style={{ ...styles.rowContainer }}>
            <Text style={{ ...styles.listLabel }}>Identificación:</Text>
            <Text style={styles.listHighlightValue}>{item.identificacion}</Text>
          </View>

          {//NO CONTACTADO
            !item.seGestiono && (item.tipoGestion == 'GESTIONADO' || item.tipoGestion == 'REGESTION') &&
            item.numeroSolicitud == "" &&
            item.noContactadoCom != "" &&
            item.noContactadoCom.length > 0 &&
            (
              <View style={{ ...styles.rowContainer }}>
                <Text style={styles.listLabel}>No Contactado:</Text>
                <View style={{ ...styles.rowContainer }}>
                  <Text style={styles.listHighlightValue}>{item.noContactadoCom}</Text>
                </View>
              </View>
            )
          }

          {//NO CUMPLE POLITICA
            !item.seGestiono && (item.tipoGestion == 'GESTIONADO' || item.tipoGestion == 'REGESTION') &&
            item.numeroSolicitud == "" &&
            item.noCumplePolCom != "" &&
            item.noCumplePolCom.length > 0 &&
            (
              <View style={{ ...styles.rowContainer }}>
                <Text style={styles.listLabel}>No Cumple:</Text>
                <View style={{ ...styles.rowContainer }}>
                  <Text style={{ ...styles.listHighlightValue }}>{item.noCumplePolCom}</Text>
                </View>
              </View>
            )
          }

          {item.seGestiono && (item.tipoGestion == 'GESTIONADO' || item.tipoGestion == 'REGESTION') &&
            item.numeroSolicitud != undefined && item.numeroSolicitud.length > 0 &&
            (
              <View style={{ ...styles.rowContainer }}>
                <Text style={styles.listLabel}>Solicitud:</Text>
                <Text style={styles.listHighlightValue}>{item.numeroSolicitud}</Text>
              </View>
            )
          }
          <View style={styles.rowContainer}>
            <Text style={{ ...styles.listLabel }}>Teléfono: </Text>
            <Text style={{ ...styles.listValue, width: Dimensions.get('window').width - styles.listLabel.width }}>{telefonosMostrar}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Cliente:</Text>
            <Text style={styles.listValue}>{item.perfilConsumo}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Perfil Cliente:</Text>
            <Text style={styles.listValue}>{item.tipoClienteComercial}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Campaña:</Text>
            <Text style={styles.listValue}>{item.nombreCampania}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Sub Producto:</Text>
            <Text style={styles.listValue}>{item.descripcionProducto}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Producto:</Text>
            <Text style={styles.listValue}>{item.codigoProducto}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Monto:</Text>
            <Text style={styles.listHighlightValue}>{CurrencyFormatter(item.monto)}</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Plazo:</Text>
            <Text style={styles.listHighlightValue}>{item.plazo}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Cuota:</Text>
            <Text style={styles.listHighlightValue}>{CurrencyFormatter(item.cuota)}</Text>
          </View>
          {/*
          <View style={styles.rowContainer}>
            <Text style={styles.listLabel}>Tiempo Resp:</Text>
            <Text style={styles.listValue}>{`${item.tiempoRespuesta}`}</Text>
          </View>
          */}
        </View>
      </LinearGradient>
    </View>
  );
};
export default PortfolioItem;


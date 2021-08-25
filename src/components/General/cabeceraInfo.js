import React, { useContext } from 'react';
import MyDesign from '../../screens/evarut/styles';
import { View, Text } from 'native-base';
import { Dimensions } from 'react-native';
import Moment from 'moment';
import { EvaContext } from '../../providers';
import { dateFormat, dateFormatSource  } from 'odc-mobile-common';
import localization from '../../localization';

const CabeceraInfo = () => {
    const { consultaInformacionSocioDemo } = useContext(EvaContext);
    

    //Card Inferior
    let textoErrorEndeudamiento = '';
    var nombreCompleto = localization['eva.nombreCliente'];

    if (consultaInformacionSocioDemo == null || consultaInformacionSocioDemo.data == null)
        textoErrorDetalleDeuda = localization['eva.msgObjetoNull'];
    else if (!consultaInformacionSocioDemo.state)
        textoErrorEndeudamiento = localization['eva.msgErrorServicio'];
    else if (consultaInformacionSocioDemo.data.length == 0)
        textoErrorEndeudamiento = localization['eva.msgDatosVacios'];
    else {
        var dt = consultaInformacionSocioDemo.data.fechaActualizacion;
        var identificacion = consultaInformacionSocioDemo.data.tipoIdentificacion + ': ' + consultaInformacionSocioDemo.data.identificacion;
        var nit = consultaInformacionSocioDemo.data.nit != null && consultaInformacionSocioDemo.data.nit.length > 0 ?
        localization['eva.nit'] + consultaInformacionSocioDemo.data.nit : '';

        var nombreCompleto = consultaInformacionSocioDemo.data.primerApellido + ' ' +
        consultaInformacionSocioDemo.data.segundoApellido + ' ' +
        consultaInformacionSocioDemo.data.primerNombre + ' ' +
        consultaInformacionSocioDemo.data.segundoNombre;
    }    

    return (
        <View style={MyDesign.cabContenedor}>
            <Text style={ MyDesign.cabNombre }>{nombreCompleto}</Text>
            <View style={MyDesign.cabContenedorId}>
                <Text style={MyDesign.cabIdentificacion}>{identificacion} </Text>
                <Text style={MyDesign.cabNit}>{nit}</Text>
                <View style={MyDesign.cabContenedorFecha}>
                    <Text style={MyDesign.cabFecha}>Ult.Act {Moment(dt,dateFormatSource).format('MMM YYYY')}</Text>
                </View>
            </View>
        </View>

    );
}

export default CabeceraInfo;
import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { Icon, Text, View } from 'native-base';

const commonColor = require('../../theme/variables/commonColor');

const mensajeError = (props) => {

    var colorIcono = '';
    var nombreIcono = '';
    var colorFont = '';

    if (props.estado) {
        nombreIcono = 'info-circle';
        colorIcono = commonColor.brandWarning;
        colorFont = commonColor.brandSecundaryFontColor;
    }
    else {
        nombreIcono = 'warning';
        colorIcono = commonColor.brandDanger;
        colorFont = commonColor.brandSecundaryFontColor;
    }
    return (
        <View>
            {
                props.borde == 'NO' ?                    
                    <View style={MyDesign.mensajeErrorSinBorde}>
                        <Icon type="FontAwesome" name={nombreIcono} style={{ color: colorIcono, fontSize: 14 }} ></Icon>
                        <Text style={{ fontSize: 10, color: colorFont, marginLeft: 5 }}>{props.mensaje}</Text>
                    </View> :
                    <View style={MyDesign.mensajeError}>
                        <Icon type="FontAwesome" name={nombreIcono} style={{ color: colorIcono, fontSize: 14 }} ></Icon>
                        <Text style={{ fontSize: 10, color: colorFont, marginLeft: 5 }}>{props.mensaje}</Text>
                    </View>
            }
        </View>
    );
}

export default mensajeError;

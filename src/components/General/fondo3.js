import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { View } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, Alert } from 'react-native';
import color from "color";

const commonColor = require('../../theme/variables/commonColor');

const Fondo3 = () => {

    const colorPrimario = commonColor.brandPrimary; 

    const c22 = colorPrimario;
    const c33 = color(colorPrimario).darken(0.15).hex();//'#027ABB';
    const c44 = color(colorPrimario).darken(0.25).hex();//'#026BA4';
    const c55 = color(colorPrimario).darken(0.35).hex();//'#015D8F';
    const c66 = color(colorPrimario).darken(0.45).hex();//'#014F79';
    const c77 = color(colorPrimario).darken(0.55).hex();//'#014164';
    const c88 = color(colorPrimario).darken(0.65).hex();//'#01334F';
    const c99 = color(colorPrimario).darken(0.75).hex();//'#012539';
    const c00 = color(colorPrimario).darken(0.85).hex();//'#001723'; 
    
    const twidth = Dimensions.get('window').width;
    const theight = Dimensions.get('window').height;

    const positionTB = Math.round(Dimensions.get('window').height)/2.34;
    const positionLR = Math.round(Dimensions.get('window').width)/2.6;
    return (

            <View  style={{ marginTop: positionTB, marginLeft:positionLR, position:'absolute', flex:1 }}>
                <LinearGradient style={MyDesign.cir9} colors={[c00, c00]} />
                <LinearGradient style={MyDesign.cir8} colors={[c99, c99]} />
                <LinearGradient style={MyDesign.cir7} colors={[c88, c88]} />
                <LinearGradient style={MyDesign.cir6} colors={[c77, c77]} /> 
                <LinearGradient style={MyDesign.cir5} colors={[c66, c66]} />
                <LinearGradient style={MyDesign.cir4} colors={[c55, c55]} />
                <LinearGradient style={MyDesign.cir3} colors={[c44, c44]} />
                <LinearGradient style={MyDesign.cir2} colors={[c33, c33]} />
                <LinearGradient style={MyDesign.cir1} colors={[c22, c22]} />  
            </View>
    );
}

export default Fondo3;


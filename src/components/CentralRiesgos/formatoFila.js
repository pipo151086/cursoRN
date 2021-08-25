import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { Text, View } from 'native-base';
import { Divider } from 'react-native-elements';

const FormatoFila = (props) => {

    //Formato Color
    colorSwitch = (param) => {

        var colores = ['grey', 'black'];
        
        switch (parseInt(param)) {

            case 0:
                colores[0] = 'green'                
                break;
            case 1:
                colores[0] = 'yellow'
                break;
            case 2:
                colores[0] = 'orange'
                break;
            //case '3,4':
            case 3:
            case 4:
                colores[0] = 'red'
                break;
            //case '5,6':
            case 5:
            case 6:
                colores[0] = 'black';
                colores[1] = 'white';
                break;

            default:
                colores[0] = 'grey';
                colores[1] = 'black';
        }

        return colores;
    }
   
    return (
        <View>
            <View style={MyDesign.cardFila}>
                <Text style={MyDesign.cardTexto}>{props.col1}</Text>
                {props.colorFondo ?
                    <Text style={[MyDesign.cardTexto, MyDesign.textoBold, style = { borderRadius:8, backgroundColor: colorSwitch(props.col2)[0], color: colorSwitch(props.col2)[1], width:18, textAlign:'center'}]}>{props.col2}</Text>
                    :
                    <Text style={[MyDesign.cardTexto, MyDesign.textoBold,style = {marginLeft:4, width:'48%', textAlign:'right'}]}>{props.col2}</Text>
                }

            </View>
            <Divider style={MyDesign.divider} />
        </View>

    );
}

export default FormatoFila;
import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { Text, View } from 'native-base';
import { Divider } from 'react-native-elements';

const FormatoFilaValor = (props) => {
    return (
        <View>
            <View style={MyDesign.cardFilaAux}>                
                <Text style={MyDesign.textoDeudaTotal}>{props.valor}</Text>                                
            </View>
            <Divider style={MyDesign.divider} />
        </View>

    );
}

export default FormatoFilaValor;
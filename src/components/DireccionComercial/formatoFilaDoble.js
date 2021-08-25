import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { Text, View } from 'native-base';
import { Divider } from 'react-native-elements';

const FormatoFilaDoble = (props) => {
    return (
        <View>
            <View style={MyDesign.cardFila}>
                <Text style={MyDesign.cardTexto}>{props.col1}</Text>
                <Text style={[MyDesign.cardTexto, MyDesign.textoBold]}>{props.col2}</Text>
                <Text style={MyDesign.cardTexto}>{props.col3}</Text>
                <Text style={[MyDesign.cardTexto, MyDesign.textoBold]}>{props.col4}</Text>
            </View>
            <Divider style={MyDesign.divider} />
        </View>

    );
}

export default FormatoFilaDoble;
import React from 'react';
import MyDesign from '../../screens/evarut/styles';
import { Card, CardItem, Icon, Text, View } from 'native-base';

const CardSoloTitulo = (props) => {

    var ancho = '100%';
    if (props.ancho!=null)
      ancho = props.ancho;

    return (
        <View style={[MyDesign.cardSoloTituloContenedor, style ={width:ancho}]}>

            <Card style={[MyDesign.cardBorde]}>
              <CardItem  style={[MyDesign.cardSoloTituloItem]}>
                <Icon type="FontAwesome" name="circle" style={MyDesign.cardSoloTituloIcono}></Icon>
                <Text style={MyDesign.cardSoloTituloTexto}>{props.titulo}</Text>
              </CardItem>
            </Card>

          </View>

    );
}

export default CardSoloTitulo;


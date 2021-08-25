import React, { useContext, useEffect } from 'react'
import { EvaContext } from '../../providers';
import moment from 'moment';
import { Card, CardItem, Content, Body, Icon, Text, View } from 'native-base';
import MyDesign from '../../screens/evarut/styles';
import FormatoFila from '../CentralRiesgos/formatoFila'
import FormatoFiladoble from '../DireccionComercial/formatoFilaDoble';
import FormatoFilavalor from '../DireccionComercial/formatoFilaValor';
import MensajeError from '../../components/General/mensajeError';
import { dateFormat, dateFormatSource, CurrencyFormatter } from 'odc-mobile-common';
import localization from '../../localization';

const UltimaOperacionComponent = () => {
  const { consultaUltimaOperacion } = useContext(EvaContext);
  /*const Operacion = [
    {
      Valor: 'Q. 5000.00',
      producto: 'CREDIÁGIL',
      plazo: '24 meses',
      fecha: '01/11/2016',
    }
  ];*/
  //const fechamax = Math.max(consultaOperacionVigente.data.fechaInformacion)

  //Formateador Fecha
  //moment.locale('es');

  let textoErrorUltimaOperacion = '';

  if (consultaUltimaOperacion == null)
    textoErrorUltimaOperacion = localization['eva.msgObjetoNull'];
  else if (!consultaUltimaOperacion.state)
    textoErrorUltimaOperacion = localization['eva.msgErrorServicio'];
  else if (consultaUltimaOperacion.data == null || consultaUltimaOperacion.data.length == 0)
    textoErrorUltimaOperacion = localization['eva.msgDatosVacios'];

  //console.log('****inicio ultima operacion vigente*****');
  //console.log(consultaUltimaOperacion);


  return (
    <View style={[MyDesign.cardCompuesto]}>
      <Card style={MyDesign.cardBorde}>
        <CardItem header bordered style={MyDesign.cardSoloTituloItem}>
          <Icon type="FontAwesome" name="circle" style={MyDesign.cardSoloTituloIcono}></Icon>
          <Text style={MyDesign.cardSoloTituloTexto}>{localization['eva.lblTituloUltimaOpCli']}</Text>
        </CardItem>
      </Card>

      <View style={MyDesign.cardCompuestoContenido}>

        <View>
          {textoErrorUltimaOperacion.length > 0 ?
            <MensajeError mensaje={textoErrorUltimaOperacion} estado={consultaUltimaOperacion.state}></MensajeError> :
            <View style={MyDesign.cardCompuestoContenidoFilas}>
              <FormatoFilavalor valor={CurrencyFormatter(consultaUltimaOperacion.data.Monto, true)} ></FormatoFilavalor>
              <FormatoFila col1={localization['eva.lblProductoCli']} col2={consultaUltimaOperacion.data.Producto} ></FormatoFila>
              <FormatoFiladoble col1={localization['eva.lblPlazoCli']} col2={consultaUltimaOperacion.data.NumeroPeriodos + ' meses'} col3={localization['eva.lblFechaCli']} col4={moment(consultaUltimaOperacion.data.FechaDesembolso, dateFormatSource).format(dateFormat)} ></FormatoFiladoble>
            </View>
          }
        </View>
      </View>

    </View>
  )

}


export default UltimaOperacionComponent;

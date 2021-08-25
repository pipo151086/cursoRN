import React, { useContext, useEffect } from 'react'
import MensajeError from '../../components/General/mensajeError';
import { EvaContext } from '../../providers';
import MyDesign from '../../screens/evarut/styles';
import { Card, CardItem, Content, Body, Icon, Text, View } from 'native-base';
import FormatoFila from '../CentralRiesgos/formatoFila'
import FormatoFiladoble from './formatoFilaDoble';
import localization from '../../localization';

const InformacionClienteComponent = () => {
  const { consultainformacionCliente } = useContext(EvaContext);
  /*const cliente = [
    {
      edad: '37 años 10 meses',
      estadocivil: 'casado',
      genero: 'Femenino',
      dedica: 'Origen de ingresos / Sub tipo',
      residencia: 'Departamento / Municipio',
    }
  ]*/

  let textoErrorInformacionCliente = '';


  if (consultainformacionCliente == null)
    textoErrorInformacionCliente = localization['eva.msgObjetoNull'];
  else if (!consultainformacionCliente.state)
    textoErrorInformacionCliente = localization['eva.msgErrorServicio'];
  else if (consultainformacionCliente.data == null || consultainformacionCliente.data.length == 0)
    textoErrorInformacionCliente = localization['eva.msgDatosVacios'];

  
  textoErrorEndeudamiento = '';
  return (

    <View style={[MyDesign.cardCompuesto, style = { marginTop: 6, flex: 1, height: '100%' }]}>

      <Card style={MyDesign.cardBorde}>

        <CardItem header bordered style={MyDesign.cardSoloTituloItem}>
          <Icon type="FontAwesome" name="circle" style={MyDesign.cardSoloTituloIcono}></Icon>
          <Text style={MyDesign.cardSoloTituloTexto}>{localization['eva.lblTituloInformacionCli']}</Text>
        </CardItem>
      </Card>


      <View style={MyDesign.cardCompuestoContenido}>

        <View>
          {textoErrorInformacionCliente.length > 0 ?
            <MensajeError mensaje={textoErrorInformacionCliente} estado={consultainformacionCliente.state}></MensajeError> :
            <View style={MyDesign.cardCompuestoContenidoFilas}>
              <FormatoFila col1={localization['eva.lblEdadCli']} col2={consultainformacionCliente.data.EdadAnio + " años " + consultainformacionCliente.data.EdadMeses + " meses"} ></FormatoFila>
              <FormatoFila col1={localization['eva.lblEstadoCivilCli']} col2={consultainformacionCliente.data.EstadoCivil} ></FormatoFila>
              <FormatoFila col1={localization['eva.lblGeneroCli']} col2={consultainformacionCliente.data.Genero}></FormatoFila>
              <FormatoFila col1={localization['eva.lblDedicaACli']} col2={consultainformacionCliente.data.OrigenIngreso + " / " + consultainformacionCliente.data.SubTipoIngreso} ></FormatoFila>
              <FormatoFila col1={localization['eva.lblResidenciaCli']} col2={consultainformacionCliente.data.Ubicacion.substring(0, 26)} ></FormatoFila>
            </View>
          }
        </View>
      </View>


    </View>



  );

}


export default InformacionClienteComponent;

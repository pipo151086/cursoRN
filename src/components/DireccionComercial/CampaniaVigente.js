
import { EvaContext } from '../../providers';
import MyDesign from '../../screens/evarut/styles';
import { Dimensions } from 'react-native';
import FormatoFila from '../CentralRiesgos/formatoFila'
import CardSoloTitulo from '../General/cardSoloTitulo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import localization from '../../localization';
import MensajeError from '../../components/General/mensajeError';
import { CurrencyFormatter } from 'odc-mobile-common';
import React, { useRef, useContext, useState,useEffect } from 'react';
import { View, } from 'react-native';

const CampaniaVigenteComponent = () => {
  const { consultaCampaniaVigenteCli, busqueda } = useContext(EvaContext);

  const [cardIndex, setCardIndex] = useState(0);

  //Dimensiones Carousel
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - 48;

  //Formato Data Carousel
  const _renderCarrItem = ({ item, index }) => {

    return (

      <View style={[MyDesign.card, {marginBottom:2}]}>

        <FormatoFila col1={localization['eva.lblProductoCli']} col2={item.producto} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblTipoClienteCli']} col2={item.tipoclientecomercial} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblPerfilCli']} col2={item.perfil} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblNombreCampCli']} col2={item.nombreCampana} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblMontoCli']} col2={CurrencyFormatter(item.monto, false)} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblPlazoCli']} col2={item.plazo} ></FormatoFila>
        <FormatoFila col1={localization['eva.lblCuotaCli']} col2={CurrencyFormatter(item.cuota, false)} ></FormatoFila>
      </View>
    )
  };

  //Control de Errores

  //Carousel
  let textoErrorDetalleCampania = "";
  if (consultaCampaniaVigenteCli == null)
    textoErrorDetalleCampania = localization['eva.msgObjetoNull'];
  else if (!consultaCampaniaVigenteCli.state)
    textoErrorDetalleCampania = localization['eva.msgErrorServicio'];
  else if (consultaCampaniaVigenteCli.data == null || consultaCampaniaVigenteCli.data.length == 0)
    textoErrorDetalleCampania = localization['eva.msgDatosVacios'];

 
  useEffect(() => {   
    setCardIndex(0);
    if(textoErrorDetalleCampania.length == 0 && consultaCampaniaVigenteCli.data.length>0)
      this._carouselCV.snapToItem(0);
  },[busqueda]);

  return (
    <View style={{ marginTop: -5, marginBottom:4 }} >
      <CardSoloTitulo titulo={localization['eva.lblTituloCampaniaCli']} />
      <View >
        {textoErrorDetalleCampania.length > 0 ?
          <View style={MyDesign.cardCompuestoErr}>
            <MensajeError mensaje={textoErrorDetalleCampania} estado={consultaCampaniaVigenteCli.state}></MensajeError>
          </View> :
          <View style={{ marginBottom: 4 }}>
            <Carousel
              onSnapToItem={(index) => setCardIndex(index)}
              ref={(c) => { this._carouselCV = c; }}
              data={consultaCampaniaVigenteCli.data}
              renderItem={_renderCarrItem}
              layout={'default'}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layoutCardOffset={'18'}
            />
            <Pagination
              dotsLength={consultaCampaniaVigenteCli.data.length}
              activeDotIndex={cardIndex}
              containerStyle={{ backgroundColor: 'transparent', paddingVertical: 4}}
              dotStyle={{
                marginTop: 2,
                width: 6,
                height: 6,
                borderRadius: 3,
                marginHorizontal: 0,
                backgroundColor: 'grey',
                borderWidth: 1,
                borderColor: 'grey'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}

            />
          </View>
        }
      </View>
    </View>
  )
}


export default CampaniaVigenteComponent;

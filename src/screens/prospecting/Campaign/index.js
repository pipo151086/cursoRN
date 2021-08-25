import React, { useRef, useEffect, useState } from 'react';
import { NavigationView, dateFormat } from 'odc-mobile-common';
import { SearchBar } from 'react-native-elements';
import { Text, View } from 'native-base';
import styles from './styles';
import {
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  getAllProspects,
  syncProspectsDB,
  deleteAllRecords,
} from '../../../database/prospecting/dbHandler';
import _ from 'lodash';
import localization from '../../../localization';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LineChart } from 'react-native-chart-kit';
import {
  ConsultarCampaniaGraficoMovil,
  ConsultarCampaniaPorAsesor,
} from '../../../communication/prospecting';

const CampaignScreen = ({ navigation }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchCampaigns, setSearchCampaigns] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - 48;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) carouselRef.current.snapToItem(0);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    //await deleteAllRecords();
    
    let result = await getAllProspects();
    
    let pspIds = [];
    if (result.length > 0)
      pspIds = result.map(psp => psp.idDetalleAsignacionRecurso);
    let resultAll = await Promise.all([
      ConsultarCampaniaPorAsesor(pspIds),
      ConsultarCampaniaGraficoMovil(),
    ]).then(values => {
      return values;
    });
    let carteraResp = resultAll[0];
    
    if (!carteraResp.state) {
      global.props.displayAlert(
        localization['psp.titleAlert'],
        carteraResp.message,
        undefined,
        undefined,
      );
      setIsLoading(false);
      return;
    }

    let resultConsultarCampaniaGraficoMovil = resultAll[1];
    if (!resultConsultarCampaniaGraficoMovil.state) {
      global.props.displayAlert(
        localization['psp.titleAlert'],
        resultConsultarCampaniaGraficoMovil.message,
        undefined,
        undefined,
      );
      setIsLoading(false);
      return;
    }
    result = await syncProspectsDB(
      carteraResp.data.idAsesor,
      carteraResp.data.campaniaClienteNuevo,
      carteraResp.data.campaniaClienteEliminado,
    );

    //if(carteraResp.data.campaniaClienteNuevo.length === 0 && carteraResp.data.campaniaClienteEliminado.length === 0)

    /*if (result.length <= 0) result = carteraResp.data.campaniaClienteNuevo.map(itm => {
      if (itm.seGestiono === true)
        itm.fechaGestiono = moment(
          itm.fechaGestiono,
          'YYYY-MM-DDTHH:mm:ss',
        ).format(dateFormat);
      return itm;
    });*/
    var groupedResult = _.countBy(result, 'idCampania');
    var dashArray = [];
    Object.entries(groupedResult).forEach(([key, value]) => {
      let tmpObj = {};
      if (resultConsultarCampaniaGraficoMovil.data)
        tmpObj = resultConsultarCampaniaGraficoMovil.data.find(
          it => it.idCampania === +key,
        );

      let dashObject = { ...tmpObj };
      dashObject.idCampania = String(key);
      dashObject.totalCount = +value;
      dashArray.push(dashObject);
    });

    dashArray.forEach(itm => {
      let exItm = result.find(
        initial => initial.idCampania === +itm.idCampania,
      );
      let gestionadas = result.filter(
        initial =>
          initial.seGestiono === true && initial.idCampania === +itm.idCampania,
      );
      let noGestionadas = result.filter(
        initial =>
          initial.seGestiono === false &&
          initial.idCampania === +itm.idCampania,
      );
      let regestion = result.filter(
        initial =>
          initial.seGestiono === false &&
          initial.idCampania === +itm.idCampania &&
          itm.tipoGestion === 'REGESTION',
      );
      itm.regestion = regestion;
      itm.regestionCount = regestion.length;
      itm.name = exItm.nombreCampania;
      itm.fechaInicioCampania = moment(
        exItm.fechaInicioCampania,
        'YYYY-MM-DDTHH:mm:ss',
      ).format(dateFormat);
      itm.fechaFinCampania = moment(
        exItm.fechaFinCampania,
        'YYYY-MM-DDTHH:mm:ss',
      ).format(dateFormat);
      itm.noGestionadas = noGestionadas;
      itm.gestionadas = gestionadas;
      itm.gestionadasCount = gestionadas.length;
      itm.noGestionadasCount = noGestionadas.length;
      itm.chartInfo = [];

      Object.entries(_.countBy(gestionadas, 'fechaGestiono')).forEach(
        ([key, value]) => {
          let svgInfo = {};
          svgInfo.label = String(key);
          svgInfo.value = +value;
          itm.chartInfo.push(svgInfo);
        },
      );
    });

    setCampaigns(dashArray);
    setSearchCampaigns(dashArray);
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  useEffect(() => {
    if (query && query.length > 0) {
      let lowerCaseQuery = query.toLowerCase();
      let resultFilter = campaigns.filter(cpn =>
        cpn.name.toLowerCase().includes(lowerCaseQuery),
      );
      setSearchCampaigns(resultFilter);
    } else setSearchCampaigns(campaigns);
  }, [query]);

  if (isLoading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={styles.activityIndicator.color}
        />
      </View>
    );

  const _onCardPress = camp => {
    navigation.navigate('CampaignResume', camp);
  };

  const _renderCarrItem = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={evt => _onCardPress(item)}>
          <Text style={{ ...styles.cardTittle }}>
            {item.name}
          </Text>
          <View style={{ ...styles.cardBody }}>
            <Text
              style={{
                ...styles.listValue,
                ...styles.viewItemSeparation,
                ...styles.fullItem,
                ...styles.centeredText,
              }}>
              Ventas por día
          </Text>
            {item.chartInfo.length > 0 ? (
              <LineChart
                bezier
                data={{
                  labels: item.chartInfo.map(ext => ext.label),
                  datasets: [
                    {
                      data: item.chartInfo.map(ext => ext.value),
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 70} // from react-native
                height={230}
                yAxisSuffix=" ven."
                verticalLabelRotation={90}
                chartConfig={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  backgroundGradientFrom: 'rgba(255, 255, 255, 0)',
                  backgroundGradientTo: 'rgba(255, 255, 255, 0)',
                  fillShadowGradient: styles.primaryColor,
                  fillShadowGradientOpacity: 0.8,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 0.2) =>
                    `rgba(${styles.primaryColorRBG[0]}, ${styles.primaryColorRBG[1]
                    }, ${styles.primaryColorRBG[2]}, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 46,

                  },
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: styles.primaryColor, //"#ffa726"
                  },
                }}
                style={{
                  marginLeft: -10,
                  paddingBottom: 15,
                  borderRadius: 4,
                }}
              />
            ) : (
                <View
                  style={{ ...styles.viewItemSeparation, ...styles.centeredText }}>
                  <Text style={{ ...styles.listLabel, fontStyle: 'italic' }}>
                    {localization['psp.noSeHaVendido']}
                  </Text>
                </View>
              )}
            <Text style={{ ...styles.listLabel, ...styles.viewItemSeparation }}>
              {localization['psp.fechaInicioCamp']}
              <Text style={styles.listValue}>{item.fechaInicioCampania}</Text>
            </Text>
            <Text style={styles.listLabel}>
              {localization['psp.fechaFinCamp']}
              <Text style={styles.listValue}>{item.fechaFinCampania}</Text>
            </Text>
            <Text style={styles.listLabel}>
              {localization['psp.NoRegistros']}
              <Text style={styles.listValue}>{item.totalCount}</Text>
            </Text>

          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const customChange = value => {
    setQuery(value);
  };

  return (
    <NavigationView navigation={navigation} style={styles.styledView}>
      {
        <View style={styles.fullItem}>
          <ScrollView style={styles.strechedScroll}>
            {styles.isDark ? (
              <SearchBar
                placeholder="Buscar..."
                onChangeText={customChange}
                value={query}
                darkTheme
                round
                containerStyle={{ padding: 3 }}
                inputContainerStyle={{ height: 30 }}
                inputStyle={{ padding: 0, height: 30 }}
              />
            ) : (
                <SearchBar
                  placeholder="Buscar..."
                  onChangeText={customChange}
                  value={query}
                  lightTheme
                  containerStyle={{ padding: 8, backgroundColor: '#E8F5FC' }}
                  inputContainerStyle={{ height: 30, backgroundColor: '#fff' }}
                  inputStyle={{ padding: 0, height: 30 }}
                />
              )}

            <Carousel
              onSnapToItem={index => setCardIndex(index)}
              ref={c => {
                carouselRef.current = c;
              }}
              data={searchCampaigns}
              renderItem={_renderCarrItem}
              layout={'default'}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layoutCardOffset={18}
            />
            <Pagination
              dotsLength={searchCampaigns.length}
              activeDotIndex={cardIndex}
              containerStyle={{
                backgroundColor: 'transparent',
                paddingVertical: 4,
              }}
              dotStyle={styles.paginationDotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </ScrollView>
        </View>
      }
    </NavigationView>
  );
};

export default CampaignScreen;

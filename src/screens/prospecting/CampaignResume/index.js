import React from 'react';
import { NavigationView } from 'odc-mobile-common';
import { Text, View } from 'native-base';
import styles from './styles';
import { TouchableOpacity, Dimensions } from 'react-native';
import _ from 'lodash';
import localization from '../../../localization';
import { PieChart } from "react-native-chart-kit";

const CampaignResumeScreen = ({ navigation, route }) => {
    const { params } = route;
    var universe = [];
    let clientes = [...params.gestionadas, ...params.noGestionadas]
    let countedCli = _.countBy(clientes, 'tipoGestion')
    countedCli.NOGESTIONADO = !countedCli.NOGESTIONADO ? 0 : countedCli.NOGESTIONADO;
    countedCli.REGESTION = !countedCli.REGESTION ? 0 : countedCli.REGESTION;
    countedCli.GESTIONADO = !countedCli.GESTIONADO ? 0 : countedCli.GESTIONADO;

    Object.entries(countedCli).forEach(([key, value]) => {
        let newItm = {};
        newItm.tipoGestion = key;
        newItm.value = value;
        newItm.legendFontColor = "#7F7F7F";
        newItm.legendFontSize = 15;
        switch (key) {
            case "NOGESTIONADO":
                newItm.name = "No Gestionado";
                newItm.color = styles.TipoGestionSemaforo.NOGESTIONADO;
                //newItm.color = styles.primaryNoGestionado
                break
            case "REGESTION":
                newItm.name = "Regestión";
                newItm.color = styles.TipoGestionSemaforo.REGESTION// REGESTIONADO
                //newItm.color = styles.primaryRegestion;
                break;
            case "GESTIONADO":
            default:
                newItm.name = "Gestionado";
                newItm.color = styles.TipoGestionSemaforo.GESTIONADO// GESTIONADO
                //newItm.color = styles.primaryGestion;
                break;
        }

        universe.push(newItm);
    });

    const _onActionPress = (tipoGestionRes) => navigation.navigate('Portfolio', { tipoGestion: tipoGestionRes.tipoGestion, camp: params, fromNavBar: false });

    return (
        <NavigationView
            navigation={navigation}
            style={styles.styledView}
        >
            {
                <View style={{ ...styles.card, width: '90%' }}>
                    <Text style={styles.cardTittle}>{params.name}</Text>
                    
                    <View style={styles.cardBody}>
                        <View style={{ alignSelf: 'center' }} >
                            <Text style={{ ...styles.listLabel }}>
                                {localization['psp.fechaInicioCamp']}<Text style={styles.listValue}>{params.fechaInicioCampania}</Text>
                            </Text>
                            <Text style={styles.listLabel}>
                                {localization['psp.fechaFinCamp']}<Text style={styles.listValue}>{params.fechaFinCampania}</Text>
                            </Text>
                            <Text style={styles.listLabel}>
                                {localization['psp.NoRegistros']}<Text style={styles.listValue}>{params.totalCount}</Text>
                            </Text>
                        </View>

                        <PieChart
                            data={universe}
                            width={Dimensions.get("window").width}
                            height={220}
                            chartConfig={{
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            }}
                            hasLegend={false}
                            accessor="value"
                            backgroundColor="transparent"
                            paddingLeft={(Dimensions.get("window").width * .8) / 4.7}
                            absolute
                            center={[0, 0]}
                        />

                        {universe && universe.length > 0 &&
                            universe.map((tipoGestion, inx) =>

                                <TouchableOpacity
                                    onPress={(evt) => _onActionPress(tipoGestion)}
                                    key={inx}
                                    style={{ paddingBottom: 5 }}
                                >
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignSelf: 'center',
                                            paddingVertical: 10,
                                            width:170
                                        }}>
                                            <View style={{
                                                backgroundColor: tipoGestion.color,
                                                padding: 15,
                                                marginRight: 5,
                                                borderRadius: 100
                                            }} />
                                            <Text style={{
                                                width: (Dimensions.get("window").width / 2),
                                                ...styles.normalTextColor,
                                                textAlignVertical: 'center'
                                            }}>{tipoGestion.value} {tipoGestion.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                    </View>

                </View>
            }
        </NavigationView>
    )
}

export default CampaignResumeScreen;
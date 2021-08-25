import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import localization from '../../localization';

const DevHeader = ({ etiquetaTipo,
    nombreCompleto, identificacion, idVendedor, tipoProducto,
    producto, tRespuesta, tipoCliente, perfilCliente }) => {

    return (
        <View style={{ ...styles.headerComp }}>
            <View style={styles.fullItem}>
                <Text style={styles.headerVfType}>
                    {etiquetaTipo}
                </Text>
            </View>
            <View style={styles.headerVfVCont}>
                <View style={styles.fullItem}>
                    <Text style={styles.clientName}>
                        {nombreCompleto}
                    </Text>
                </View>
            </View>
            <View style={{ ...styles.headerVfVCont, }}>
                <View style={styles.midItem50}>
                    <Text style={{ ...styles.label, paddingLeft: 8 }}>
                        {'Identificación: '}
                        <Text style={{ ...styles.value, fontSize: 12 }}>
                            {identificacion}
                        </Text>
                    </Text>
                </View>
                <View >
                    <Text style={{ ...styles.label, paddingLeft: 6, }}>
                        {'Vendedor: '}
                        <Text style={{ ...styles.value, fontSize: 12 }}>
                            {idVendedor}
                        </Text>
                    </Text>
                </View>
            </View>

            <View style={{ ...styles.headerVfVCont, }}>
                <View style={styles.midItem50}>
                    <Text style={{ ...styles.value, paddingLeft: 8, fontSize: 9 }}>
                        {`${tipoProducto}-${producto}-${tRespuesta}`}
                    </Text>
                </View>
                <View >
                    <Text style={{ ...styles.value, paddingLeft: 6, fontSize: 9}}>
                        {`${tipoCliente} - ${perfilCliente}`}
                    </Text>
                </View>
            </View>


        </View >);
};

export default DevHeader;

import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationView} from 'odc-mobile-common';
import localization from '../../../localization';
import styles from './styles';

const Test = ({navigation, ...otherProps}) => {
  return (
    <NavigationView navigation={navigation}>
      <View>
        <Text style={styles.testTitle}>{'Alertas'}</Text>
        <Button
          buttonStyle={styles.testButton}
          onPress={() => {
            global.props.displayAlert(
              localization['psp.titleAlert'],
              localization['psp.AlertBloq'],
              undefined,
              () => navigation.navigate('Home'),
            );
          }}
          title={'Información'}
        />
        <Button
          buttonStyle={styles.testButton}
          onPress={() => {
            global.props.displayAlert(
              undefined,
              'esta seguro?',
              () => console.log('confirm cancelPressed'),
              () => console.log('confirm okPressed'),
              'question',
            );
          }}
          title={'Confirmación'}
        />
        <Button
          buttonStyle={styles.testButton}
          onPress={() => {
            global.props.displayAlert(
              undefined,
              'se actualizó el registro',
              undefined,
              () => console.log('success okPressed'),
              'success',
            );
          }}
          title={'Transacción exitosa'}
        />
        <Button
          buttonStyle={styles.testButton}
          onPress={() => {
            global.props.displayAlert(
              undefined,
              'servicio no disponible',
              undefined,
              undefined,
              'error',
            );
          }}
          title={'Error'}
        />
      </View>
    </NavigationView>
  );
};

export default Test;

import React, {useState} from 'react';
import {Button, ActivityIndicator} from 'react-native';
import {Text, View} from 'native-base';
import {NavigationView} from 'odc-mobile-common';
import {getGeolocation} from 'odc-mobile-common';
import {signin, connect} from '../../../communication/common/security';
import {getCatalogsByCodes} from '../../../communication/common/configuration';
import localization from '../../../localization';

const OpenForm = ({navigation}) => {
  const [isUploading, setIsUploading] = useState(false);

  const postLogin = async () => {
    const resultSignIn = await signin({
      usercode: 'globalred',
      password: 'Abc.123',
      station: 'station',
    });
    const resultConnect = await connect({
      usercode: 'globalred',
      office: 1,
      profileCode: 'CREINS',
      station: 'station',
    });
    global.props.displayAlert(
      'Resultado API',
      JSON.stringify(resultConnect.data),
    );
  };

  const getCatalogues = async () => {
    const args = {
      query: ['IdentificationType', 'InactivityType'],
      idInstitution: 1,
    };
    const getCatalogsByCodesResult = await getCatalogsByCodes(args);

    global.props.displayAlert(
      'Resultado API',
      JSON.stringify(getCatalogsByCodesResult.data),
    );
  };

  const sendFormData = async () => {
    const formData = new FormData();

    const json = {
      key1: 'value1',
      key2: 12,
    };

    formData.append('dto', JSON.stringify(json));
    const fileName = 'IMG_20200212_192138543' + '1' + '.jpg';
    formData.append('file', {
      name: fileName,
      fileName: fileName,
      type: 'image/jpg',
      uri:
        'content://com.bda.prospekta.provider/root/storage/emulated/0/Pictures/image-6f34f8c6-1497-44dd-8ffe-f3a4bb595056.jpg',
      data: null,
    });

    setIsUploading(true);
    const resultFormData = {}//await complete(formData);
    setIsUploading(false);
    global.props.displayAlert('Respuesta API', 'Transacción Exitosa');
  };

  return (
    <NavigationView navigation={navigation}>
      <Text style={{color: 'black'}}>GET</Text>
      <Button
        title={
          localization['common.openform.peticion'] +
          ' ' +
          localization['common.openform.get']
        }
        onPress={async () => {
          await getCatalogues();
        }}
      />

      <Text style={{color: 'black'}}>POST</Text>
      <Button
        title={
          localization['common.openform.peticion'] +
          ' doble ' +
          localization['common.openform.post']
        }
        onPress={async () => {
          await postLogin();
        }}
      />
      <Text style={{color: 'black'}}>
        {localization['common.openform.camscaner']}
      </Text>
      <Button
        title={localization['common.openform.camscaner']}
        onPress={() => {
          navigation.navigate('CamScanner');
        }}
      />
      <Text style={{color: 'black'}}>
        {localization['common.openform.obtenerPosicion']}
      </Text>
      <Button
        title={localization['common.openform.obtenerPosicion']}
        onPress={async () => {
          const position = await getGeolocation();
          if (position && position.latitude) {
            global.props.displayAlert(
              'Posición',
              '[' + position.latitude + ';' + position.longitude + ']',
            );
          } else {
            global.props.displayAlert(
              'Error',
              'No se pudo obtener ubicación GPS',
            );
          }
        }}
      />
      <Text style={{color: 'black'}}>
        {localization['common.openform.mostrarAlerta']}
      </Text>
      <Button
        title={localization['common.openform.mostrarAlerta']}
        onPress={() => {
          global.props.displayAlert();
        }}
      />
      <Text style={{color: 'black'}}>
        {localization['common.openform.formData']}
      </Text>

      <Button
        title={
          localization['common.openform.peticion'] +
          ' ' +
          localization['common.openform.formData']
        }
        onPress={async () => {
          await sendFormData();
        }}
        disabled={isUploading}
      />
      {isUploading && <ActivityIndicator size="large" />}
    </NavigationView>
  );
};

export default OpenForm;

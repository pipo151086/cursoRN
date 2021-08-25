import React, {useContext, useState, useEffect} from 'react';
import {PspContext} from '../../../providers';
import {NavigationView, ImageLoader} from 'odc-mobile-common';
import styles from './styles';
import {View, Button,BackHandler,Alert} from 'react-native';
import localization from '../../../localization';
import {iconResolver} from './iconResolver';

import {dummyOferta} from './dummyOferta';

const requiredImagesCount = 2;

const DocLoadScreen = ({navigation}) => {
  const {currentImages, changeImages} = useContext(PspContext);
  const [isSaving, setIsSaving] = useState(false);
  const tmpLoadedImages = currentImages.filter(f => f.loaded);

  const backAction = () => {
   Alert.alert("Espera! "," ¿Estás seguro que quieres volver?", [
     {
       text: "Cancelar",
       onPress: () => null,
       style: "cancel"
     },
     { text: "Si", onPress: () => BackHandler.exitApp() }
   ]);
   return true;
 };

 useEffect(() => {
   BackHandler.addEventListener("hardwareBackPress", backAction);

   return () =>
     BackHandler.removeEventListener("hardwareBackPress", backAction);
 }, []);

  useEffect(() => {
    const docs = dummyOferta.documentosHabilitantes.map(m => {
      return {
        name: m.codigoDocumentoHabilitante,
        desc: m.descripcionDocumentoHabilitante,
        preview: iconResolver(m.codigoDocumentoHabilitante),
      };
    });

    changeImages(docs);
  }, []);

  return (
    <NavigationView
      navigation={navigation}
      >
      {
        <View>
          <View style={styles.imageLoader}>
            <ImageLoader images={currentImages} setImages={changeImages} />
          </View>
          <View style={styles.saveButton}>
            <Button
              title={localization['common.componentes.guardar']}
              disabled={tmpLoadedImages.length < requiredImagesCount}
            />
          </View>
        </View>
      }
    </NavigationView>
  );
};

export default DocLoadScreen;

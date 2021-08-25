import React, { useState, useEffect } from 'react';
import { Picker } from 'odc-mobile-common';
import { View } from 'react-native';
import localization from '../../localization';

//import { GeographicLocation1 } from '../../catalogs/geographicLocation';

import {
  getGeographicLocation2,
  getGeographicLocation3,
  getGeographicLocation4,
} from '../../utils/geolocation';

const GeoLocation = ({
  formikProps,
  styles,
  geolocation1Label,
  geolocation2Label,
  geolocation3Label,
  geolocation4Label,
  children,
}) => {
  const { GeographicLocation1 } = GLOBAL.geographicLocation;
  const [ubiGeo2Elements, setUbiGeo2Elements] = useState([]);
  const [ubiGeo3Elements, setUbiGeo3Elements] = useState([]);
  const [ubiGeo4Elements, setUbiGeo4Elements] = useState([]);

  useEffect(() => {
    const updateElements = async () => {
      let newElements = await getGeographicLocation2(formikProps.values.ubicacionGeografica1);
      setUbiGeo2Elements(newElements);
    }
    updateElements();
  }, [formikProps.values.ubicacionGeografica1]);


  useEffect(() => {
    const updateElements = async () => {
      let newElements = await getGeographicLocation3(formikProps.values.ubicacionGeografica2);
      setUbiGeo3Elements(newElements);
    }
    updateElements();
  }, [formikProps.values.ubicacionGeografica2]);


  useEffect(() => {
    const updateElements = async () => {
      let newElements = await getGeographicLocation4(formikProps.values.ubicacionGeografica3);
      setUbiGeo4Elements(newElements);
    }
    updateElements();
  }, [formikProps.values.ubicacionGeografica3]);


  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.midItem50}>
          <Picker
            label={
              geolocation1Label
                ? geolocation1Label
                : localization['common.componentes.geolocation1Label']
            }
            formikKey="ubicacionGeografica1"
            formikProps={formikProps}
            elements={GeographicLocation1}
            value={formikProps.values.ubicacionGeografica1}
          />
        </View>
        <View style={styles.midItem50}>
          <Picker
            label={
              geolocation2Label
                ? geolocation2Label
                : localization['common.componentes.geolocation2Label']
            }
            formikKey="ubicacionGeografica2"
            formikProps={formikProps}
            elements={ubiGeo2Elements}
            value={formikProps.values.ubicacionGeografica2}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.midItem50}>
          <Picker
            label={
              geolocation3Label
                ? geolocation3Label
                : localization['common.componentes.geolocation3Label']
            }
            formikKey="ubicacionGeografica3"
            formikProps={formikProps}
            elements={ubiGeo3Elements}
            value={formikProps.values.ubicacionGeografica3}
          />
        </View>
        <View style={styles.midItem50}>
          <Picker
            label={
              geolocation4Label
                ? geolocation4Label
                : localization['common.componentes.geolocation4Label']
            }
            formikKey="ubicacionGeografica4"
            formikProps={formikProps}
            elements={ubiGeo4Elements}
            value={formikProps.values.ubicacionGeografica4}
          />
        </View>
      </View>
    </View>
  );
};

export default GeoLocation;

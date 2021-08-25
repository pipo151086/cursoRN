import React, { useState, useEffect } from 'react';
import { Picker } from 'odc-mobile-common';
import { View } from 'react-native';
import localization from '../../localization';
//import { GeographicLocation1 } from '../../catalogs/geographicLocation';
import { getGeographicLocation2 } from '../../utils/geolocation';

const GeoLocation1_2 = ({
  formikProps,
  styles,
  geolocation1Label,
  geolocation2Label,
  children,
}) => {
  const { GeographicLocation1 } = GLOBAL.geographicLocation;
  const [ubiGeo2Elements, setUbiGeo2Elements] = useState([]);

  useEffect(() => {
    const updateElements = async () => {
      let newElements = await getGeographicLocation2(formikProps.values.departamento);
      setUbiGeo2Elements(newElements);
    }
    updateElements();
  }, [formikProps.values.departamento]);

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
            formikKey="departamento"
            formikProps={formikProps}
            elements={GeographicLocation1}
            value={formikProps.values.departamento}
          />
        </View>
        <View style={styles.midItem50}>
          <Picker
            label={
              geolocation2Label
                ? geolocation2Label
                : localization['common.componentes.geolocation2Label']
            }
            formikKey="canton"
            formikProps={formikProps}
            elements={ubiGeo2Elements}
            value={formikProps.values.canton}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        {children}
      </View>
    </View>
  );
};

export default GeoLocation1_2;

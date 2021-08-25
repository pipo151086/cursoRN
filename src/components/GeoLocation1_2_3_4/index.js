import React, { useState, useEffect } from 'react';
import { Picker } from 'odc-mobile-common';
import { View } from 'react-native';
import localization from '../../localization';
import { getGeographicLocation2, getGeographicLocation3, getGeographicLocation4 } from '../../utils/geolocation';

const GeoLocation1_2_3_4 = ({
  formikProps,
  styles,
  geolocation1Label,
  geolocation1Key,
  geolocation2Label,
  geolocation2Key,
  geolocation3Label,
  geolocation3Key,
  geolocation4Label,
  geolocation4Key
}) => {
  const { GeographicLocation1 } = GLOBAL.geographicLocation;
  const [ubiGeo2Elements, setUbiGeo2Elements] = useState([]);
  const [ubiGeo3Elements, setUbiGeo3Elements] = useState([]);
  const [ubiGeo4Elements, setUbiGeo4Elements] = useState([]);
  const paddingHorizontalValue = 5;

  useEffect(() => {
    const updateElements = async () => {
      /*formikProps.setFieldValue(geolocation2Key,undefined);
      formikProps.setFieldValue(geolocation3Key,undefined);
      formikProps.setFieldValue(geolocation4Key,undefined);*/
      let newElements = await getGeographicLocation2(formikProps.values[geolocation1Key]);
      setUbiGeo2Elements(newElements);
    }
    updateElements();
  }, [formikProps.values[geolocation1Key]]);

  useEffect(() => {
    const updateElements = async () => {
      /*formikProps.setFieldValue(geolocation3Key,undefined);
      formikProps.setFieldValue(geolocation4Key,undefined);*/
      let newElements = await getGeographicLocation3(formikProps.values[geolocation2Key]);
      setUbiGeo3Elements(newElements);
    }
    updateElements();
  }, [formikProps.values[geolocation2Key]]);

  useEffect(() => {
    const updateElements = async () => {
      //formikProps.setFieldValue(geolocation4Key,undefined);
      let newElements = await getGeographicLocation4(formikProps.values[geolocation3Key]);
      setUbiGeo4Elements(newElements);
    }
    updateElements();
  }, [formikProps.values[geolocation3Key]]);

  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={{ ...styles.midItem50, paddingHorizontal: paddingHorizontalValue }}>
          <Picker
            label={
              geolocation1Label
                ? geolocation1Label
                : localization['common.componentes.geolocation1Label']
            }
            formikKey={geolocation1Key}
            formikProps={formikProps}
            elements={GeographicLocation1}
            value={formikProps.values[geolocation1Key]}
          />
        </View>
        <View style={{ ...styles.midItem50, paddingHorizontal: paddingHorizontalValue }}>
          <Picker
            label={
              geolocation2Label
                ? geolocation2Label
                : localization['common.componentes.geolocation2Label']
            }
            formikKey={geolocation2Key}
            formikProps={formikProps}
            elements={ubiGeo2Elements}
            value={formikProps.values[geolocation2Key]}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={{ ...styles.midItem50, paddingHorizontal: paddingHorizontalValue }}>
          <Picker
            label={
              geolocation3Label
                ? geolocation3Label
                : localization['common.componentes.geolocation3Label']
            }
            formikKey={geolocation3Key}
            formikProps={formikProps}
            elements={ubiGeo3Elements}
            value={formikProps.values[geolocation3Key]}
          />
        </View>
        <View style={{ ...styles.midItem50, paddingHorizontal: paddingHorizontalValue }}>
          <Picker
            label={
              geolocation4Label
                ? geolocation4Label
                : localization['common.componentes.geolocation4Label']
            }
            formikKey={geolocation4Key}
            formikProps={formikProps}
            elements={ubiGeo4Elements}
            value={formikProps.values[geolocation4Key]}
          />
        </View>
      </View>
    </View>
  );
};

export default GeoLocation1_2_3_4;


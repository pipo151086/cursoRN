import React from 'react';
import { View } from 'native-base';
import { Input, Picker, } from 'odc-mobile-common';
import GeoLocation1_2_3_4 from '../../components/GeoLocation1_2_3_4';

const DevDireccion = ({
    formikProps,
    styles,
    geolocation1Label,
    geolocation1Key,
    geolocation2Label,
    geolocation2Key,
    geolocation3Label,
    geolocation3Key,
    geolocation4Label,
    geolocation4Key,
    callePrincipalLabel,
    callePrincipalKey,
    numVivLabel,
    numVivKey,
    avenidaLabel,
    avenidaKey,
    sectorLabel,
    sectorKey
}) => {
    const { Catalogs } = GLOBAL;
    const paddingHorizontalValue = 5;
    return (<>
        <GeoLocation1_2_3_4
            formikProps={formikProps}
            styles={styles}
            geolocation1Label={geolocation1Label}
            geolocation1Key={geolocation1Key}
            geolocation2Label={geolocation2Label}
            geolocation2Key={geolocation2Key}
            geolocation3Label={geolocation3Label}
            geolocation3Key={geolocation3Key}
            geolocation4Label={geolocation4Label}
            geolocation4Key={geolocation4Key}
        />

        <View style={styles.rowContainer}>
            <View style={[styles.midItem50, { paddingHorizontal: paddingHorizontalValue }]}>
                <Input
                    name={callePrincipalKey}
                    placeholder={callePrincipalLabel}
                    label={callePrincipalLabel}
                    formikProps={formikProps}
                    formikKey={callePrincipalKey}
                    value={formikProps.values[callePrincipalKey]}
                />
            </View>
            <View style={[styles.midItem50, { paddingHorizontal: paddingHorizontalValue }]}>
                <Input
                    name={numVivKey}
                    placeholder={numVivLabel}
                    label={numVivLabel}
                    formikProps={formikProps}
                    formikKey={numVivKey}
                    value={formikProps.values[numVivKey]}
                />
            </View>
        </View>
        <View style={styles.rowContainer}>
            <View style={[styles.midItem50, { paddingHorizontal: paddingHorizontalValue }]}>
                <Input
                    name={avenidaKey}
                    placeholder={avenidaLabel}
                    label={avenidaLabel}
                    formikProps={formikProps}
                    formikKey={avenidaKey}
                    value={formikProps.values[avenidaKey]}
                />
            </View>
            <View style={[styles.midItem50, { paddingHorizontal: paddingHorizontalValue }]}>
                <Picker
                    label={sectorLabel}
                    formikKey={sectorKey}
                    formikProps={formikProps}
                    elements={Catalogs.Sector}
                    value={formikProps.values[sectorKey]}
                />
            </View>
        </View>
    </>)
}

export default DevDireccion;
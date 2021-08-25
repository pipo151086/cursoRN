import React, { useRef, useContext } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import styles from './styles'
import { CurrencyInput } from 'odc-mobile-common';

export const Form = (formikProps) => {
    return (
        <View >
            <CurrencyInput
                formikProps={formikProps}
                label='simple Money lbl'
                formikKey='simpleMoney'

            />
            <CurrencyInput
                formikProps={formikProps}
                label='simple Money Dos lbl'
                formikKey='simpleMoneyDos'
                currSymbol='$'
            />
            <CurrencyInput
                formikProps={formikProps}
                label='simple Money Tres lbl'
                formikKey='simpleMoneyTres'
                currSymbol='$'
            />
            {formikProps.isSubmitting ? (
                <ActivityIndicator />
            ) : (
                    <Button onPress={formikProps.handleSubmit} title={'Submit'} />
                )}
        </View>


    )
}



import React from 'react';
import { NavigationView } from 'odc-mobile-common';
import { Formik } from 'formik';
import { Form } from './form'

const TestElements2 = ({ navigation }) => {
    return (
        <NavigationView
            navigation={navigation}
        >
            {
                <Formik
                    initialValues={{
                        simpleMoney: '',
                        simpleMoneyDos: 654322,
                        simpleMoneyTres: ''
                    }}
                    enableReinitialize
                    onSubmit={async values => {
                    
                    }}
                >
                    {formikProps => (
                        <Form {...formikProps} />)}
                </Formik>
            }
        </NavigationView>
    )
}

export default TestElements2;

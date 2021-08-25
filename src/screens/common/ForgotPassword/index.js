import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Input } from 'odc-mobile-common';
import { ImageBackground, StatusBar, TextInput } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  View,
  Footer,
} from 'native-base';

import styles from './styles';
import localization from '../../../localization';
import { reset } from '../../../communication/common/security';
import { showToast } from 'odc-mobile-common';

const ForgotPassword = ({ navigation, valid }) => {
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const refContainer = useRef();

  const handleSubmit = async values => {
    try {
      const result = await reset(values.email);
      showToast(
        result.state && result.data
          ? localization['common.forgotPassword.resultOk']
          : localization['common.forgotPassword.resultError'],
      );
    } catch (error) {
      showToast(localization['common.forgotPassword.resultError']);
    }

    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../../assets/bg-signup.png')}
        style={styles.background}>
        <Content contentOffset={offset}>
          <Content padder scrollEnabled={false}>
            <Text style={styles.forgotPasswordHeader}>
              {localization['common.forgotPassword.title']}
            </Text>
            <View>
              <Formik
                initialValues={{
                  email: '',
                }}
                onSubmit={handleSubmit}>
                {formikProps => (
                  <React.Fragment>
                    <Text />
                    <Input
                      label={localization['common.test.email']}
                      formikProps={formikProps}
                      formikKey="email"
                      autoFocus
                    />
                    <View style={styles.forgotPasswordContainer}>
                      <Button
                        rounded
                        block
                        bordered
                        onPress={formikProps.handleSubmit}
                        style={styles.emailBtn}>
                        <Text style={{ color: '#FFF' }}>
                          {localization['common.forgotPassword.sendEmail']}
                        </Text>
                      </Button>
                    </View>
                  </React.Fragment>
                )}
              </Formik>
            </View>
          </Content>
        </Content>
        <Footer
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 30,
          }}>
          <Button transparent onPress={() => navigation.pop()}>
            <Text style={styles.helpBtns}>
              {localization['common.forgotPassword.back']}
            </Text>
          </Button>
        </Footer>
      </ImageBackground>
    </Container>
  );
};

export default ForgotPassword;

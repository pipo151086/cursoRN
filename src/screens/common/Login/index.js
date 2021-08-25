import React, { useContext, useEffect } from 'react';
import {
  Image,
  ImageBackground,
  View,
  StatusBar,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Container, Content, Text, View as ViewRB } from 'native-base';
import styles from './styles';
import { Formik } from 'formik';
import moment from 'moment';
import { signin } from '../../../communication/common/security';
import { updateContext } from '../../../database/common/dbHandler';
import { AppContext } from '../../../providers/common';
import { showToast } from 'odc-mobile-common';
import { validationSchema } from './validationSchema';
import localization from '../../../localization';
import { Button } from 'react-native-elements';
import { syncCatalogs } from '../../../database/common/dbHandlerCatalogs'
import { syncParams } from '../../../database/common/dbHandlerParam'
import { GetInbox } from '../../../communication/notification'
import navigationService from '../../../utils/navigationService'

const bg = require('!/bg.jpg');
const logo = require('!/logo.png');

const LoginForm = ({ navigation }) => {
  const {
    setGlobalSession,
    setProfileTransactions,
    deviceInfo,
    token, setNotifInboxFull
  } = useContext(AppContext);

  useEffect(() => {
    if (!navigationService.navigation)
      navigationService.navigation = navigation;
  }, [navigation]);

  return (
    <Container>
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <ViewRB style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </ViewRB>

            <ViewRB style={styles.container}>
              <ViewRB style={styles.form}>
                <Formik
                  initialValues={{
                    userName: '',
                    password: '',
                  }}
                  enableReinitialize
                  onSubmit={async values => {
                    try {
                      const argsSignIn = {
                        usercode: values.userName,
                        password: values.password,
                        station: 'station',
                      };

                      const signInResult = await signin(
                        argsSignIn,
                        deviceInfo,
                        token,
                      );
                      
                      if (!signInResult.state) {
                        showToast(signInResult.message);
                        return;
                      }

                      let catVersion = this.GLOBAL.AppParams.find(par => par.code === 'CatalogVersion');
                      let versionNumber = isNaN(+catVersion?.value) ? 0 : +catVersion?.value

                      if (signInResult.data.catalogVersion !== versionNumber)
                        await syncParams([{ code: "CatalogVersion", value: signInResult.data.catalogVersion, type: 'int', description: "NUMERO VERSION CATALOGOS APP" }]);

                      showToast("Sincronizando Catálogos");
                      if (signInResult.data.catalogsList && signInResult.data.catalogsList.length > 0) {
                        await syncCatalogs(signInResult.data.catalogsList);
                      }

                      let resInbox = await GetInbox({
                        docNumber: signInResult.data.docNumber,
                        docType: signInResult.data.docType,
                      });
                      if (resInbox.state) {
                        setNotifInboxFull(resInbox.data);
                      }

                      const contextUpdateValue = {
                        session: {
                          privileges: signInResult.data.privileges,
                          profileTransactions: signInResult.data.profileTransactions,
                          userId: signInResult.data.userId,
                          docNumber: signInResult.data.docNumber,
                          docType: signInResult.data.docType,
                          jwt: signInResult.data.jwt,
                          loginMessage: signInResult.data.loginMessage,
                        },
                        profileTransactions:
                          JSON.parse(signInResult.data.profileTransactions),
                      };

                      await updateContext({
                        context: JSON.stringify(contextUpdateValue),
                        lastTimeAccessed: moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
                      });

                      setGlobalSession(contextUpdateValue);
                      setProfileTransactions(contextUpdateValue.profileTransactions);
                    } catch (error) {
                      if (error) showToast(error.toString());
                    }
                  }}
                  validationSchema={validationSchema}>
                  {formikProps => (
                    <View>
                      <TextInput
                        name="userName"
                        onChangeText={formikProps.handleChange('userName')}
                        placeholderTextColor="#FFF"
                        placeholder={localization['common.login.user']}
                        onBlur={formikProps.handleBlur('userName')}
                        value={formikProps.values.userName}
                        formikProps={formikProps}
                        formikKey="userName"
                        //autoFocus
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: 5,
                          padding: 10,
                          marginBottom: 3,
                        }}
                        editable={!formikProps.isSubmitting}
                      />
                      <Text style={{ color: 'red' }}>
                        {formikProps.errors.userName}
                      </Text>
                      <TextInput
                        name="password"
                        onChangeText={formikProps.handleChange('password')}
                        placeholderTextColor="#FFF"
                        placeholder={localization['common.login.password']}
                        onBlur={formikProps.handleBlur('password')}
                        value={formikProps.values.password}
                        formikProps={formikProps}
                        formikKey="password"
                        secureTextEntry
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: 5,
                          padding: 10,
                          marginBottom: 3,
                        }}
                        editable={!formikProps.isSubmitting}
                      />
                      <Text style={{ color: 'red' }}>
                        {formikProps.errors.password}
                      </Text>

                      {formikProps.isSubmitting ? (
                        <ActivityIndicator
                          color={styles.activityIndicator.color}
                        />
                      ) : (
                        <Button
                          onPress={formikProps.handleSubmit}
                          title={localization['common.login.boton']}
                          buttonStyle={styles.buttonStyle}
                          type={
                            styles.isDark ||
                              styles.buttonStyle.backgroundColor === 'transparent'
                              ? 'outline'
                              : undefined
                          }
                        />
                      )}
                      <View style={styles.forgotContainer}>
                        <Text
                          style={styles.forgotUserPassword}
                          onPress={() => navigation.navigate('ForgotPassword')}>
                          {localization['common.login.forgotPassword']}
                        </Text>
                      </View>
                    </View>
                  )}
                </Formik>
              </ViewRB>
            </ViewRB>
            <ViewRB style={styles.container} />
          </Content>
        </ImageBackground>
      </Container>
    </Container>
  );
};

export default LoginForm;

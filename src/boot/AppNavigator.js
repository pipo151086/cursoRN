import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, ImageBackground, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
//import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import color from 'color';
import { GetInbox } from "../communication/notification"

//common
import Login from '../screens/common/Login';
import ForgotPassword from '../screens/common/ForgotPassword';
import Sidebar from '../screens/common/Sidebar';
import OpenForm from '../screens/common/OpenForm';
import CamScannerScreen from '../screens/common/OpenForm/CamScannerScreen';
import Test from '../screens/common/Test';
import TestElements2 from '../screens/common/TestElements2';
import UnitTest from '../screens/common/UnitTest';
import NotifInbox from '../screens/common/NotifInbox';

//prospecting
import Schedule from '../screens/prospecting/Schedule';

//cobranza
import FormTest from '../screens/cobranza/FormTest';


//Devolucion
//LoginLogin - Session
import { AppContext } from '../providers/common';
import { appActivityIndicator } from '../theme/appStyle';
import { loading } from '../screens/comStyles';
import { getInsertContext } from '../database/common/dbHandler';
import { getAllParams } from '../database/common/dbHandlerParam';
import { syncCatalogs, putLocalCatalogsInMemory } from '../database/common/dbHandlerCatalogs';
import { GetDeviceInfo } from 'odc-mobile-common';


const commonColor = require('../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  drawerStyles: { flex: 1, width: '80%', backgroundColor: 'transparent' },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
  },
});

const commonScreens = () => (
  <>
    <Stack.Screen name="OpenForm" component={OpenForm} />
    <Stack.Screen name="CamScannerScreen" component={CamScannerScreen} />
    <Stack.Screen name="Test" component={Test} />
    <Stack.Screen name="TestElements2" component={TestElements2} />
    <Stack.Screen name="NotifInbox" component={NotifInbox} />

  </>
);

const pspScreens = () => (
  <>
    <Stack.Screen name="Schedule" component={Schedule} />
  </>
);

const cobranzaScreens = () => (
  <>
    <Stack.Screen name="FormTest" component={FormTest} />
  </>
)

const AppLogin = () => {
  return (
    <Stack.Navigator
      initialRouteName="FormTest"//"Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="UnitTest" component={UnitTest} />
      <Stack.Screen name="FormTest" component={FormTest} />
    </Stack.Navigator>
  );
};

const AllScreens = ({ props, style, initialView }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        initialRouteName={initialView}
        screenOptions={{
          headerShown: false,
        }}>
        {commonScreens()}
        {pspScreens()}
        {cobranzaScreens()}
      </Stack.Navigator>
    </Animated.View>
  );
};

const AppDrawer = (progress, setProgress, initialView) => {
  const scale = Animated.interpolate(progress, {
    inputRange: [1, 1],
    outputRange: [1, 1],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 10],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <>
      {/*<LinearGradient style={{ flex: 1 }} colors={[primary, darkenPrimary]}>*/}
      <ImageBackground
        source={require('!/sidebar-transparent.png')}
        style={styles.background}>
        <Drawer.Navigator
          //hideStatusBar
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          contentContainerStyle={{ flex: 1 }}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          sceneContainerStyle={{ backgroundColor: 'transparent' }}
          drawerContent={props => {
            //console.log(props.progress)
            //setProgress(props.progress);
            return <Sidebar {...props} />;
          }}>
          <Drawer.Screen name="Screens">
            {props => (
              <AllScreens
                {...{
                  props: props,
                  style: animatedStyle,
                  initialView: initialView,
                }}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
        {/*</LinearGradient>*/}
      </ImageBackground>
    </>
  );
};

export default function App() {
  const {
    globalSession,
    setGlobalSession,
    setProfileTransactions,
    setDeviceInfo,
    initialView,
    changeInitialView,
    validSession, setValidSession,
    notifInbox, setNotifInboxFull
  } = useContext(AppContext);

  const appState = useRef(AppState.currentState);
  //const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [progress, setProgress] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);

  const getSessionFromDB = async () => {
    let globalContext = await getInsertContext();
    if (globalContext) {
      let context = JSON.parse(globalContext.context);
      if (
        context &&
        context.profileTransactions &&
        context.profileTransactions.length > 0
      ) {
        changeInitialView(context.profileTransactions[0].profileCode);
        setValidSession(true);
      }
      return context;
    }
    return {};
  }

  useEffect(() => {
    const SessionValidation = async () => {
      let deviceInfo = await GetDeviceInfo();
      setDeviceInfo(deviceInfo);
      await getAllParams();
      putLocalCatalogsInMemory();
      let context = await getSessionFromDB();
      await setGlobalSession(context);
      setProfileTransactions(context.profileTransactions);
      setIsLoading(false);
      if (context && context.session) {
        let resInbox = await GetInbox(context.session);
        if (resInbox.state)
          setNotifInboxFull(resInbox.data);
      };
      SplashScreen.hide();
      AppState.addEventListener("change", _handleAppStateChange);
      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    };
    SessionValidation();
  }, []);

  useEffect(() => {
    const SessionUpdate = async () => {
      await getSessionFromDB();
    };
    SessionUpdate();
  }, [, globalSession]);

  const _handleAppStateChange = async (nextAppState) => {
    const session = GLOBAL?.globalSession?.session;
    if (nextAppState === "active" && session) {
      let resInbox = await GetInbox(session);
      if (resInbox.state)
        setNotifInboxFull(resInbox.data);
    }
  };

  if (isLoading)
    return (
      <View style={loading}>
        <ActivityIndicator size="large" color={appActivityIndicator.color} />
      </View>
    );

  return (
    <NavigationContainer>
      {((globalSession && globalSession?.session && globalSession?.session?.jwt) && initialView)
        ? AppDrawer(progress, setProgress, initialView)
        : AppLogin()}
    </NavigationContainer>
  );
}

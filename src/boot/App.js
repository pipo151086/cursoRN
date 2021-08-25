import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//common
import Login from '../screens/common/Login';
import ForgotPassword from '../screens/common/ForgotPassword';
import Sidebar from '../screens/common/Sidebar';
import OpenForm from '../screens/common/OpenForm';
import CamScannerScreen from '../screens/common/OpenForm/CamScannerScreen';
import Test from '../screens/common/Test';
import TestElements2 from '../screens/common/TestElements2';

//prospecting
import Portfolio from '../screens/prospecting/Portfolio';
import Information from '../screens/prospecting/Information';
import Oferta from '../screens/prospecting/Offer';
import RequestedOffer from '../screens/prospecting/RequestedOffer';
import Home from '../screens/prospecting/Home';
import SearchClient from '../screens/prospecting/SearchClient';
import DocLoad from '../screens/prospecting/DocLoad';
import Campaign from '../screens/prospecting/Campaign';
import Gestion from '../screens/prospecting/Gestion';


//vf
import VfInputData from '../screens/vf/InputData';

//workflow
import VfPortfolio from '../screens/workflow/VfPortfolio';
import PspPortfolio from '../screens/workflow/PspPortfolio';

//eva
import ConsultaCliente from '../screens/evarut/consultarCliente'
import InformacionBasica from '../screens/evarut/informacionBasica'
import CentralRiesgos from '../screens/evarut/centralRiesgos'
import DireccionComercial from '../screens/evarut/direccionComercial'
import ComportamientoInterno from '../screens/evarut/comportamientoInterno'

const commonScreens = {
  Test: { screen: Test },
  OpenForm: { screen: OpenForm },
  CamScanner: { screen: CamScannerScreen },
  ForgotPassword: { screen: ForgotPassword },
  TestElements2: { screen: TestElements2 },
};

const prospectingScreens = {
  Information: { screen: Information },
  Oferta: { screen: Oferta },
  Portfolio: { screen: Portfolio },
  RequestedOffer: { screen: RequestedOffer },
  Home: { screen: Home },
  SearchClient: { screen: SearchClient },
  DocLoad: { screen: DocLoad },
  Campaign: { screen: Campaign },
  Gestion: { screen: Gestion },
};

const vfScreens = {
  VfInputData: { screen: VfInputData },
};

const evaScreens = {
  ConsultaCliente: { screen: ConsultaCliente },
  InformacionBasica: { screen: InformacionBasica },
  CentralRiesgos: { screen: CentralRiesgos },
  DireccionComercial: { screen: DireccionComercial },
  ComportamientoInterno: { screen: ComportamientoInterno },
}

const workflowScreens = {
  VfPortfolio: { screen: VfPortfolio },
  PspPortfolio: { screen: PspPortfolio },
};

const Drawer = createDrawerNavigator(
  {
    ...commonScreens,
    ...workflowScreens,
    ...prospectingScreens,
    ...vfScreens,
    ...evaScreens,
  },
  {
    initialRouteName: 'Home', //'Home','SearchClient'
    contentComponent: props => <Sidebar {...props} />,
  },
);

const App = createStackNavigator(
  {
    Login: { screen: Login },
    Drawer: { screen: Drawer },
    ...prospectingScreens,
  },
  {
    index: 0,
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const container = createAppContainer(App);
export default container;

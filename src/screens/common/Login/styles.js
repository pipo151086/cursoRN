const React = require('react-native');
const {Dimensions, Platform} = React;
const commonColor = require('../../../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const third = commonColor.brandThird;
const fourth = commonColor.brandFourth;
const normalFontColor = commonColor.brandNormalFontColor;
const secundaryFontColor = commonColor.brandSecundaryFontColor;
const formButtonColor = commonColor.brandFormButtonColor;
const deviceHeight = Dimensions.get('window').height;
import {appActivityIndicator} from '~/';

export default {
  activityIndicator: {
    //Ojo Este Solo Recibe El Color
    ...appActivityIndicator,
  },
  buttonStyle: {
    //unicamente aplica al Fondo
    backgroundColor: formButtonColor,
  },

  loading: {
    backgroundColor: third,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    flex: 1,
    width: null,
    height: deviceHeight - 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    height: deviceHeight / 4,
  },
  logoBanco: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
    height: deviceHeight / 8,
    marginTop: 50,
  },
  form: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  formErrorIcon: {
    color: '#fff',
    marginTop: 5,
    right: 10,
  },
  formErrorText1: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: 'right',
    paddingTop: 2,
    paddingBottom: 2,
  },
  formErrorText2: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: 'transparent',
    textAlign: 'right',
    paddingTop: 2,
    paddingBottom: 2,
  },
  loginBtn: {
    marginTop: 7,
    height: 50,
  },
  otherLinksContainer: {
    paddingTop: deviceHeight < 600 ? 5 : Platform.OS === 'android' ? 10 : 15,
    flexDirection: 'row',
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: Platform.OS === 'android' ? 12 : 12,
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 0,
    height: deviceHeight / 15,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    flex: 1,
    fontSize: deviceHeight / 50,
    color: '#FFF',
  },
  skipBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: '#FFF',
    position: 'absolute',
    bottom: 15,
    right: 0,
  },

  forgotContainer: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotUserPassword: {
    textDecorationLine: 'underline',
  },
};

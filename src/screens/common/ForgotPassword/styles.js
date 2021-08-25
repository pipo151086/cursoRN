import {Dimensions, Platform} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const primary = require('../../../theme/variables/commonColor').brandPrimary;
const commonColor = require('../../../theme/variables/commonColor');

export default {
  forgotPasswordContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:
      deviceWidth < 330
        ? Platform.OS === 'android'
          ? deviceHeight / 9 - 20
          : deviceHeight / 8 - 10
        : Platform.OS === 'android'
        ? deviceHeight / 7 - 20
        : deviceHeight / 6 - 30,
  },
  forgotPasswordHeader: {
    alignSelf: 'center',
    fontSize: 22,
    padding: 10,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop:
      Platform.OS === 'android' ? deviceHeight / 6 : deviceHeight / 6 + 10,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: primary,
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
    paddingBottom: 3,
  },
  formErrorText2: {
    fontSize: Platform.OS === 'android' ? 12 : 15,
    color: 'transparent',
    textAlign: 'right',
    top: -10,
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
  emailBtn: {
    height: deviceHeight / 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    color: '#fff',
    fontSize: deviceHeight / 30,
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
};

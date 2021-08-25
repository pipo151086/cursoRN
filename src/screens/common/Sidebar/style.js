const React = require('react-native');

const { Platform } = React;

const primary = require('../../../theme/variables/commonColor').brandPrimary;

export default {
  links: {
    paddingTop: Platform.OS === 'android' ? 8 : 10,
    paddingBottom: Platform.OS === 'android' ? 8 : 10,
    paddingLeft: Platform.OS === 'android' ? 0 : 10,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 0,
    borderBottomColor: 'transparent',
  },
  linkText: {
    paddingLeft: 15,
    color: 'black',
  },
  image: {
    color: primary,
    width: 30
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 25,
    position: "absolute",
    top: 5,
    left: 20
  },
  badgeText: {
    fontSize: 8,
    paddingHorizontal: 2
  },
  logoutContainer: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#f0f8ff',
  },
  logoutbtn: {
    paddingTop: 13,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
  },
  drawerContent: {
    paddingTop: Platform.OS === 'android' ? 20 : 40,
    backgroundColor: 'white',
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: Platform.OS === 'android' ? 40 : 20,
  },
  imageSignout: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  titleStyleSignout: {
    color: primary,
  },
  buttonStyleSignout: {
    backgroundColor: 'white',
    borderTopColor: primary,
    borderWidth: 2,
    height: 35,
    borderRadius: 5,
  },
  logoIcon: {
    margin: 6,
    width: 80,
    height: 40,
    borderRadius: 5,
  },
  logoContainer: {
    padding: 0,
    backgroundColor: primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    backgroundColor: primary,
  },
};

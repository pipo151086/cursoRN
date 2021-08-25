const React = require('react-native');
const {Dimensions, Platform} = React;
const primary = require('../../../theme/variables/commonColor').brandPrimary;
const deviceWidth = Dimensions.get('window').width;

export default {
  fullItem: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  asesor: {
    color: 'red',
    margin: 3,
    backgroundColor: '#dadada',
    borderRadius: 4,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  midItem50: {
    width: '50%', // is 50% of container width
    padding: 0,
    margin: 0,
  },
  bg: {
    backgroundColor: primary,
  },
  newsImage: {
    width: 100,
    height: 120,
  },
  newsContent: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  swiperContentBox: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  IIconInewsLink: {
    opacity: 0.8,
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: Platform.OS === 'android' ? '#777' : '#666',
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === 'android' ? 15 : 0,
    paddingLeft: Platform.OS === 'android' ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === 'android' ? -1 : -3,
    color: '#666',
  },
  newsLink: {
    color: Platform.OS === 'android' ? '#777' : '#666',
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  newsHeader: {
    color: '#444',
    fontWeight: 'bold',
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    alignSelf: 'flex-end',
  },
  newsTypeText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: 'contain',
  },
  loginBtn: {
    marginTop: 7,
    height: 45,
  },
  modal: {
    backgroundColor: primary,
    position: 'absolute',
    width: deviceWidth,
    height: null,
    top: Platform.OS === 'android' ? 55 : 60,
    paddingBottom: Platform.OS === 'android' ? 20 : 10,
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    height: 230,
    backgroundColor: 'transparent',
  },
  modalContentBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  dayButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nightButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  modalContentGrid1: {
    padding: 20,
    paddingBottom: 15,
    justifyContent: 'center',
  },
  modalContentGridText: {
    fontSize: 12,
    marginTop: 8,
    alignSelf: 'center',
  },
  modalContentGrid2: {
    flexDirection: 'row',
    paddingTop: 20,
    marginHorizontal: 10,
  },
  modalSmallText: {
    alignSelf: 'flex-start',
    fontWeight: '700',
  },
  modalLargeText: {
    alignSelf: 'flex-end',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  nextStoryBtn: {
    color: primary,
    fontWeight: '900',
  },
  testButton: {
    margin: 10,
    width: '100%',
  },
  testTitle: {
    margin: 10,
  },
};

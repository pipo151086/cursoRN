import {listHighlightValue} from '../../screens/comStyles';
const commonColor = require('../../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const fourth = commonColor.brandFourth;
const normalFontColor = commonColor.brandNormalFontColor;
const secundaryFontColor = commonColor.brandSecundaryFontColor;

export default {
  uncompletedIndicatorColor: listHighlightValue.color,
  completedIndicatorColor: '#00a65a',
  imageContainer: {
    //borderWidth: 0.2,
    borderRadius: 10,
    borderColor: fourth,
    backgroundColor: secundary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    //color: secundaryFontColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    //elevation: 5,
    //borderRadius: 10
  },
  styledIcon: {
    alignSelf: 'center',
    color: secundaryFontColor,
    //width: 25,
    fontSize: 120,
  },
  indicatorContainer: {left: 5, top: 5},
  indicatorText: {fontSize: 19},
  indicatorTextTwo: {fontSize: 16},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    //  backgroundColor: 'red',
  },
};

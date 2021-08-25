import * as comStyles from '../../comStyles'
import color from "color";
const commonColor = require('../../../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const fourth = commonColor.brandFourth;


export default {
  primaryColor: primary,
  primaryColorRBG: color(primary).rgb().array(),
  ...comStyles,
  numCentral: {
    ...comStyles.centeredText,
    fontSize: 80
  },
  paginationDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: fourth,
    borderColor: fourth
  },
 
};

const commonColor = require('../../../theme/variables/commonColor');
const secundaryFontColor = commonColor.brandSecundaryFontColor;
const primary = commonColor.brandPrimary;
import * as comStyles from '../../comStyles'

export default {
  primayColor: primary,
  ...comStyles,
  switchContainer: {
    ...comStyles.rowContainer,
    paddingLeft: 3

  },
  switchLabel: {
    color: secundaryFontColor,
    marginTop: -3,
    width: 'auto'
  },
  switch: {
    marginBottom: 5,
    marginTop: 3,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
};

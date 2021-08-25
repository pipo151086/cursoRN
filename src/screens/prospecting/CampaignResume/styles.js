import * as comStyles from '../../comStyles'
import color from "color";
const commonColor = require('../../../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const fourth = commonColor.brandFourth;


export default {
    primaryColor: primary,
    secundaryColor: secundary,
    primaryColorRBG: color(primary).rgb().array(),
    primaryRegestion: color(primary).darken(0.8).hex(),
    primaryGestion: color(primary).darken(0.3).hex(),
    primaryNoGestionado: color(primary).hex(),
    ...comStyles,
    numCentral: {
        ...comStyles.centeredText,
        fontSize: 80
    },
   

};

import * as comStyles from '../../comStyles';
import color from "color";

const commonColor = require('../../../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const darkenSecundary = color(secundary).darken(0.1).hex();
const third = commonColor.brandThird;
const fourth = commonColor.brandFourth;
const fifth = commonColor.brandFifth;
const normalFontColor = commonColor.brandNormalFontColor;
const secundaryFontColor = commonColor.brandSecundaryFontColor;
const iconColor = '#323edd';

export default {
    ...comStyles,
    timeDeltaS: {
        ...comStyles.listLabel,
        fontWeight: "normal", fontStyle: 'italic', fontSize: 9 
    },
    titleNotif:{
        ...comStyles.listHighlightValue, 
        textAlign: "justify" 
    },
    MessageNotif:{
        ...comStyles.listValue, 
        textAlign: "justify" 
    }
}
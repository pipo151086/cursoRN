import * as comStyles from '../../screens/comStyles';

const commonColor = require('../../theme/variables/commonColor');
const normalFontColor = commonColor.brandNormalFontColor;
const secundaryFontColor = commonColor.brandSecundaryFontColor;

export default {
    ...comStyles,
    highlightText: { color: secundaryFontColor, textAlign: 'center', fontSize: 13 },
    tituloGrupo:{
        color: secundaryFontColor, 
        ...comStyles.centeredText, 
        backgroundColor: 'white', 
        fontStyle: 'italic', 
        marginTop: -12 
    },
    borderSeccionDev: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginTop: 2
    },
    footer: {
        borderColor: "gray",
        paddingTop: 10,
    },
    gestionIcon: {
        color: secundaryFontColor,
        width: 28
    },
    label: {
        color: secundaryFontColor,
        width:40
    },
    value: {
        color: normalFontColor,
        fontWeight: 'bold',
    },
    tabView: {
        ...comStyles.styledForm,
        marginTop: 0,
        alignItems: 'center',
        paddingBottom: 10
    },
    roundNewBtnStyle: {
        ...comStyles.viewItem,
        backgroundColor: "#4bc943",
        borderRadius: 30,
        padding: 5,
        ...comStyles.centeredText
    },
    roundRemoveBtnStyle: {
        backgroundColor: "red",
        borderRadius: 30,
        padding: 5,
        ...comStyles.centeredText
    },
    roundBtnText: {
        color: 'white',
        paddingRight: 10,
        paddingLeft: 10
    },
};

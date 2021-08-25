import * as comStyles from '../../screens/comStyles';
const commonColor = require('../../theme/variables/commonColor');
const secundary = commonColor.brandSecondary;
const fourth = commonColor.brandFourth;
const primary = commonColor.brandPrimary;

export default {
    headerComp: {
        width: '100%',
        paddingBottom: 5,
        backgroundColor: secundary,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    headerVfType: {
        ...comStyles.normalTextColor,
        ...comStyles.centeredText,
        fontSize: 20,
    },
    ...comStyles,
    label: { ...comStyles.listLabel },
    //headerLabel: { ...comStyles.listLabel },
    value: {
        ...comStyles.listValue,
        color: '#444444',
        fontWeight: 'bold',
    },
    clientName: {
        ...comStyles.listHighlightValue,
        ...comStyles.centeredText,
        fontSize: 15,
        color: primary,
    },
    midItem100: {
        ...comStyles.fullItem,
    },

    headerVfVCont: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },




    midItem5: {
        width: '5%',
        padding: 0,
        margin: 0,
    },
    midItem15: {
        width: '15%',
        padding: 0,
        margin: 0,
    },

    midItem66: {
        width: '66%',
        padding: 0,
        margin: 0,
    },
    midItem75: {
        width: '75%',
        padding: 0,
        margin: 0,
    },
    midItem80: {
        width: '80%',
        padding: 0,
        margin: 0,
    },
    saveButton: {
        width: '100%',
        paddingBottom: 0,
        paddingTop: 10,
        margin: 0,
    },

    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#dadada',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRow: {
        ...comStyles.rowContainer,
        marginLeft: 5,
    },
    headerLabelContainer: {
        width: 65,
    },
    headerValueContainer: {
        width: 115,
    }
};

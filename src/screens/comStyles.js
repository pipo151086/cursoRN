//////TODO CONFIRMAR SI TODA LA APP TENDRA EL MISMO ESTILO,
//////SI ES ASI, SE DEBE ELIMINAR ESTE ARCHIVO Y UTILIZAR
//////THEME/APPSTYLE
import { appActivityIndicator } from '~/';
import { appNavigationView } from '~/';
import color from 'color';

const commonColor = require('../theme/variables/commonColor');
const primary = commonColor.brandPrimary;
const secundary = commonColor.brandSecondary;
const third = commonColor.brandThird;
const fourth = commonColor.brandFourth;
const normalFontColor = commonColor.brandNormalFontColor;
const secundaryFontColor = commonColor.brandSecundaryFontColor;
const formButtonColor = commonColor.brandFormButtonColor;
const darkenSecundary = color(secundary)
  .darken(0.1)
  .hex();

export const isDark = commonColor.isDark;

export const strechedScroll = { width: '100%', height: '100%' };

export const styledView = {
  ...appNavigationView,
};

export const viewItemSeparation = { marginTop: 10 };

export const viewItem = {
  ...viewItemSeparation,
  borderColor: fourth,
  //borderColor: 'red'
};

export const formPadding = {
  padding: 10,
};

export const styledForm = {
  ...viewItem,
  ...formPadding,
  backgroundColor: secundary,
};
export const loading = {
  backgroundColor: third,
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
};
export const rowContainer = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
};
export const midItem50 = {
  width: '50%',
  padding: 0,
  margin: 0,
};
export const midItem40 = {
  width: '40%',
  padding: 0,
  margin: 0,
};
export const midItem45 = {
  width: '45%',
  padding: 0,
  margin: 0,
};
export const midItem4 = {
  width: '4%',
  padding: 0,
  margin: 0,
};
export const midItem33 = {
  width: '33%',
  padding: 0,
  margin: 0,
};
export const fullItem = {
  width: '100%',
  padding: 0,
  margin: 0,
};

export const midItem35 = {
  width: '35%',
  padding: 0,
  margin: 0,
};

export const midItem25 = {
  width: '25%',
  padding: 0,
  margin: 0,
};

export const midItem20 = {
  width: '20%',
  padding: 0,
  margin: 0,
};

export const midItem10 = {
  width: '10%',
  padding: 0,
  margin: 0,
};

export const midItem30 = {
  width: '30%',
  padding: 0,
  margin: 0,
};
export const midItem70 = {
  width: '70%',
  padding: 0,
  margin: 0,
};

export const asesor = {
  ...viewItem,
  backgroundColor: secundary,
  marginTop: 0,
  padding: 10,
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.4,
  shadowRadius: 3,
  elevation: 5,
};
export const asesorLabel = {
  fontSize: 13,
  marginTop: 4.5,
};

export const actionButtonIcon = {
  fontSize: 25,
  height: 25,
  color: 'white',
  top: -3,
};

export const elementFoatLeft = { alignSelf: 'flex-start' };
export const elementFoatRight = { alignSelf: 'flex-end' };
export const normalTextColor = { color: normalFontColor };
export const secundaryTextColor = { color: secundaryFontColor };

export const modalTitle = {
  ...fullItem,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  backgroundColor: primary,
  color: '#FFF', //normalFontColor,
  alignSelf: 'center',
  textAlign: 'center',
  fontSize: 18,
};

export const luzSemaforo = { width: 15, height: 15, borderRadius: 100 / 2 };
export const centeredText = {
  alignSelf: 'center',
  justifyContent: 'center',
  textAlignVertical: 'center',
  textAlign: 'center',
};

export const modalBody = {
  backgroundColor: secundary,
  borderColor: 'black',
  borderRadius: 10,
  borderWidth: 1,
  position: 'absolute',
  width: '100%',
  overflow: 'hidden'
};

export const scroleableModalBody = {
  backgroundColor: secundary,
  borderColor: 'black',
  borderRadius: 10,
  borderWidth: 1,
};

export const listItem = {
  backgroundColor: secundary,
};
export const styledDevider = { backgroundColor: fourth };

export const activityIndicator = {
  //Ojo Este Solo Recibe El Color
  ...appActivityIndicator,
};

export const listLabel = {
  ...secundaryTextColor,
  fontSize: 12,
  marginTop: 2  
};
export const listValue = {
  ...normalTextColor,
};
export const rowSwipBtnText = {
  color: 'white',
  ...centeredText,
};
export const rowSwipBtn = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 75,
};

export const buttonStyle = {
  //unicamente aplica al Fondo
  backgroundColor: formButtonColor,
};

export const standaloneRowBack = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  ...listItem,
};

export const standaloneRowFront = {
  justifyContent: 'center',
  backgroundColor: darkenSecundary,
  borderRightWidth: 0.5,
  borderLeftWidth: 0.5,
  borderColor: fourth,
  paddingLeft: 5,
  paddingRight: 5,
};

export const listHighlightValue = {
  color: primary,
  fontWeight: 'bold',
};

export const ListTittle = {
  fontSize: 18,
  fontWeight: 'bold',
  ...normalTextColor,
};

export const TipoGestionSemaforo = {
  NOGESTIONADO: "#FF5722",//'#FF5722',
  REGESTION: '#FFC107',
  GESTIONADO: '#4CAF50',
};

export const cardView = {
  margin: 7,
  borderWidth: 0,
  borderRadius: 5,
  shadowColor: '#FFF',
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 5,
  overflow: 'hidden'
  //backgroundColor:'green'
};

export const card = {
  ...viewItemSeparation,
  backgroundColor: secundary,
  ...cardView,
  overflow: 'hidden'
}
export const cardBody = {
  ...formPadding,
}
export const cardTittle = {
  ...normalTextColor,
  ...fullItem,
  ...centeredText,
  paddingTop: 5,
  paddingBottom: 5,
  backgroundColor: "#E8F5FD",
  fontWeight: 'bold'
}


export const fullItemAccrodion = {
  ...fullItem,
  ...viewItem,
  marginTop: 0,
  borderRadius: 5,
}
export const accordionHeader = {
  flexDirection: 'row',
  padding: 10,
  marginTop: 0.25,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f8ff',
  borderRadius: 5,
}
export const accordionHeaderText = {
  color: normalFontColor,
  fontWeight: '600',
}
export const accordionIcon = {
  ...normalTextColor,
  color: primary,
  fontSize: 15,
  marginRight: 5,
}
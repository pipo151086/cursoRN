import * as comStyles from '../../comStyles';
import color from "color";
const commonColor = require('../../../theme/variables/commonColor');
const secundary = commonColor.brandSecondary;
const fourth = commonColor.brandFourth;
const darkenSecundary = color(secundary).darken(0.1).hex();

export default {
	...comStyles,
	swListRightBtn: {
		...comStyles.rowSwipBtn,
		backgroundColor: '#3f79a5'
	},
	swListLeftBtn: {
		...comStyles.rowSwipBtn,
		backgroundColor: 'green'
	},
	itemBody: {
		margin: 0,
		paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 5,
	},
	ListTittle: {
		...comStyles.ListTittle,
		textTransform: 'capitalize',
		fontWeight: 'normal',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		paddingTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 0,
	},
	listValue: {
		...comStyles.listValue,
		color: '#444444',
		fontWeight: 'bold',
	},
	standaloneRowFront: {
		...comStyles.standaloneRowFront,
		backgroundColor: 'white',
		margin: 5,
		paddingTop: 4,
		paddingLeft: 5,
		paddingRight: 5,
		paddingBottom: 0,
	},
	resaltado: {
		backgroundColor: "#E8F5FD",
		paddingTop: 2,
		paddingBottom: 2,
		marginTop: -3
	},
	listLabel: {
		...comStyles.listLabel,
		width: 88
	},

};

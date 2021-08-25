import { styledView, strechedScroll } from '../../comStyles'
const commonColor = require('../../../theme/variables/commonColor');

import * as comStyles from '../../comStyles';

export default {
  ...comStyles,
  styledView: { ...styledView },
  strechedScroll: { ...strechedScroll },
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
};

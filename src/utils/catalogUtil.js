export const getValueFromIdServer = (cat, idServ) => {
    var result = cat.filter(el => el.idServ === idServ)[0];
    return result ? result.value : cat[0].value;
}

export const getIdServerFromValue = (cat, value) => {
    var result = cat.filter(el => el.value === value)[0];
    return result ? result.idServ : cat[0].idServ;
}

export const variableCus = 'esta es mi vairable';

/*import {variableCus} from 'Prospekta/utils/catalogUtil';
*/

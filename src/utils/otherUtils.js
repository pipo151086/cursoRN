import moment from 'moment';
import _ from 'lodash';
import { dateFormat } from 'odc-mobile-common';
import { getUbicacionGeografica } from '../database/common/dbHandlerCatalogs'

export const getUnique = (arrIn) => {
  var arr = [];
  for (var i = 0; i < arrIn.length; i++) {
    if (!arr.some(itm => itm === arrIn[i])) {
      arr.push(arrIn[i]);
    }
  }
  return arr;
}

export const getFechVencimiento = (datosRangoProducto) => {
  let systemDate = globalSession?.session?.jwt?.claims?.dateSystem;
  let endDate = moment(systemDate).add(30, 'day');
  if (datosRangoProducto) {
    endDate = moment(systemDate).add(datosRangoProducto.valorMaximoDia, 'day');
    let invalidDays = datosRangoProducto.rangoDia.split(',');
    let dayOfEndDate = +endDate.format('DD');
    let invalidDate = invalidDays.some(arrVal => dayOfEndDate === +arrVal);
    while (invalidDate === true) {
      endDate = endDate.add(-1, 'day')
      dayOfEndDate = +endDate.format('DD');
      invalidDate = invalidDays.some(arrVal => dayOfEndDate === +arrVal);
    }
  }
  return endDate.format(dateFormat);
}

export const getMaxMinDate = (datosRangoProducto) => {
  let systemDate = globalSession?.session?.jwt?.claims?.dateSystem
  let initialDate = moment(systemDate).add(datosRangoProducto.valorMinimoDia, 'day').format('YYYY-MM-DD');
  let endDate = moment(systemDate).add(datosRangoProducto.valorMaximoDia, 'day').format('YYYY-MM-DD');
  var newInitialdate = new Date(initialDate + 'T00:00:00')
  var newEndDate = new Date(endDate + 'T00:00:00')
  let res = {
    min: newInitialdate,//min,
    max: newEndDate//max,
  }
  return res;
}

export const valFechVencimiento = (datosRangoProducto, fchSelected) => {
  var parsedDate = typeof (fchSelected) === "string" ?
    moment(fchSelected, dateFormat) : moment(fchSelected);

  let systemDate = globalSession?.session?.jwt?.claims?.dateSystem

  let initialDate = moment(systemDate).add(datosRangoProducto.valorMinimoDia, 'day');
  let endDate = moment(systemDate).add(datosRangoProducto.valorMaximoDia, 'day');
  let isBetween = parsedDate.isBetween(initialDate, endDate, undefined, '[]');
  if (!isBetween) {
    parsedDate = endDate;
  }
  let invalidDays = datosRangoProducto.rangoDia.split(',');

  let dayOfEndDate = +parsedDate.format('DD');
  let invalidDate = invalidDays.some(arrVal => dayOfEndDate === +arrVal);
  while (invalidDate === true) {
    parsedDate = parsedDate.add(-1, 'day')
    dayOfEndDate = +parsedDate.format('DD');
    invalidDate = invalidDays.some(arrVal => dayOfEndDate === +arrVal);
  }
  return parsedDate;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const getGeoLocations4Description = async (separator, geo1, geo2, geo3, geo4) => {
  const { GeographicLocation1 } = GLOBAL.geographicLocation;
  let des1 = GeographicLocation1.find(ub1 => ub1.value == geo1)?.label;
  let des2 = await getUbicacionGeografica("GeographicLocation2", geo2);
  let des3 = await getUbicacionGeografica("GeographicLocation3", geo3);
  let des4 = await getUbicacionGeografica("GeographicLocation4", geo4);
  let des2Label = des2?.label
  let des3Label = des3?.label
  let des4Label = des4?.label

  let finalRes = "";
  if (des1)
    finalRes = finalRes + `${des1}${separator}`;
  if (des2)
    finalRes = finalRes + `${des2Label}${separator}`;
  if (des3)
    finalRes = finalRes + `${des3Label}${separator}`;
  if (des4)
    finalRes = finalRes + `${des4Label}`;
  return finalRes;
}

export const transformDateUtil = (unformatedDate) => moment(unformatedDate).format(dateFormat)

export const toCamel = (o) => {
  var newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO
}

export const getAniosAtrasCatalog = () => {
  var years = moment().diff('1922-01-01', 'years');
  var cat = [];
  let valueCat = years;
  for (i = 1922; i <= (1922 + years); i++) {
    cat.push({ label: String(i), value: String(i) })
    valueCat = valueCat - 1;
  }
  return cat;
}

export const getMesesCatalog = () => {
  let cat = [];
  cat.push({ label: '1', value: "1" });
  cat.push({ label: '2', value: "2" });
  cat.push({ label: '3', value: "3" });
  cat.push({ label: '4', value: "4" });
  cat.push({ label: '5', value: "5" });
  cat.push({ label: '6', value: "6" });
  cat.push({ label: '7', value: "7" });
  cat.push({ label: '8', value: "8" });
  cat.push({ label: '9', value: "9" });
  cat.push({ label: '10', value: "10" });
  cat.push({ label: '11', value: "11" });
  return cat;
}
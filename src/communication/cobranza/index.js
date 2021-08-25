import settings from "../../settings";
import { fetchPostService, getAge, dateFormat } from 'odc-mobile-common';

const pspUrl = settings.cobranza + 'Mobile/';

export const validarAsesorCobranza = async args => {
  var re = {
    idAsesor: args.codigoAsesor
  }
  return await fetchPostService('get', pspUrl + 'ConsultarAsesorId', re);
};


export const GrabarClienteCobranza = async args => {
  //return await fetchPostService('post', pspUrl + 'GrabarCliente', args);
  return { state: false, data: true, message: "data ERROR" }

};
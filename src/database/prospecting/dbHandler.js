import { Q } from '@nozbe/watermelondb';
import { dateFormat } from 'odc-mobile-common';
import moment from 'moment';
/*
 *********************************************************************************************************
 ********************************************PROSPECT DB**************************************************
 *********************************************************************************************************
 */
export const getProspectsId = async () => {
  try {
    let prospectIds = [];
    await database.collections
      .get('prospects').query().fetch().then(async res => {
        if (res.length > 0) {
          res.map(el => prospectIds.push(el.idDetalleAsignacionRecurso));
        }
      })
    return prospectIds;
  }
  catch (err) {
    console.log(err);
  }
}



export const addDBProspect = async ent =>
  await database.action(async () => {
    const newProspect = await database.collections
      .get('prospects')
      .create(prospect => {
        prospect.idDetalleAsignacionRecurso = ent.idDetalleAsignacionRecurso;
        prospect.idCampania = ent.idCampania;
        prospect.idCliente = ent.idCliente;
        prospect.idClienteCampania = ent.idCliente;
        prospect.nombreCampania = ent.nombreCampania;
        prospect.fechaInicioCampania = ent.fechaInicioCampania;
        prospect.fechaFinCampania = ent.fechaFinCampania;
        prospect.tipoIdentificacion = ent.tipoIdentificacion;
        prospect.identificacion = ent.identificacion;
        prospect.nombreCliente = ent.nombreCliente;
        prospect.perfilConsumo = ent.perfilConsumo;
        prospect.tipoClienteComercial = ent.tipoClienteComercial;
        prospect.grupoAgenciaConsumo = ent.grupoAgenciaConsumo;
        prospect.primerNombre = ent.primerNombre;
        prospect.segundoNombre = ent.segundoNombre;
        prospect.primerApellido = ent.primerApellido;
        prospect.segundoApellido = ent.segundoApellido;
        prospect.numeroGestiones = ent.numeroGestiones;
        prospect.codigoSubProducto = ent.codigoSubProducto;
        prospect.codigoProducto = ent.codigoProducto;
        prospect.tasa = ent.tasa;
        prospect.monto = ent.monto;
        prospect.plazo = ent.plazo;
        prospect.seGestiono = ent.seGestiono;
        prospect.tipoControl = ent.tipoControl;
        prospect.tipoGestion = ent.tipoGestion;
        prospect.dispositivo = JSON.stringify(ent.dispositivo);
        prospect.direccion = JSON.stringify(ent.direccion);
        prospect.correo = JSON.stringify(ent.correo);
        prospect.fechaGestiono = ent.fechaGestiono;
        prospect.noCumplePolCom = ent.noCumplePolCom;
        prospect.noContactadoCom = ent.noContactadoCom;

        prospect.cuota = ent.cuota;
        prospect.tiempoRespuesta = ent.tiempoRespuesta;
        prospect.motivosNoContactados = JSON.stringify(ent.motivosNoContactados);
        prospect.datosRangoProducto = JSON.stringify(ent.datosRangoProducto);
        prospect.numeroReferenciaSIB = ent.numeroReferenciaSIB;
        prospect.tipoControlModifica = ent.tipoControlModifica;
        prospect.descripcionProducto = ent.descripcionProducto;
        prospect.idArbolRespuesta = ent.idArbolRespuesta;
      });
    return newProspect._raw;
  });

export const queryDBProspect = async exp => {
  const result = await database.collections
    .get('prospects')
    .query(exp)
    .fetch();
  return result;
};

export const getAllProspects = async () => {
  let allProspects = await database.collections
    .get('prospects').query().fetch().then(async res => {
      console.log("bdProspects:", res.length)
      if (res.length > 0) {
        res.map(function (el, idx) {
          try {
            el._raw.dispositivo
            if (typeof el._raw.dispositivo === 'string' &&
              typeof el._raw.direccion === 'string' &&
              typeof el._raw.correo === 'string') {
              el._raw.dispositivo = JSON.parse((el._raw.dispositivo) ? el._raw.dispositivo : "[]");
              el._raw.direccion = JSON.parse((el._raw.direccion) ? el._raw.direccion : "[]");
              el._raw.correo = JSON.parse((el._raw.correo) ? el._raw.correo : "[]");
              el._raw.motivosNoContactados = JSON.parse((el._raw.motivosNoContactados) ? el._raw.motivosNoContactados : "[]");
              el._raw.datosRangoProducto = JSON.parse((el._raw.datosRangoProducto) ? el._raw.datosRangoProducto : "[]");
            }
          } catch (errTran) {
            console.log({ errTran: errTran, element: el._raw });
          }
        });
      }
      return res;
    })
    .catch(err => {

    });
  return allProspects;
}


export const getDBProspectByIdCliente = async idClienteCampania =>
  await database.collections
    .get('prospects')
    .query(Q.where('idCliente', idClienteCampania))
    .fetch()
    .then(async res => {
      if (res[0] != undefined) {
        if (typeof res[0]._raw.dispositivo === 'string' &&
          typeof res[0]._raw.direccion === 'string' &&
          typeof res[0]._raw.correo === 'string') {
          res[0]._raw.dispositivo = JSON.parse((res[0]._raw.dispositivo) ? res[0]._raw.dispositivo : "[]");
          res[0]._raw.direccion = JSON.parse((res[0]._raw.direccion) ? res[0]._raw.direccion : "[]");
          res[0]._raw.correo = JSON.parse((res[0]._raw.correo) ? res[0]._raw.correo : "[]");
          res[0]._raw.motivosNoContactados = JSON.parse((res[0]._raw.motivosNoContactados) ? res[0]._raw.motivosNoContactados : "[]");
          res[0]._raw.datosRangoProducto = JSON.parse((res[0]._raw.datosRangoProducto) ? res[0]._raw.datosRangoProducto : "[]");
        }
        return res[0]._raw;
      }
      return undefined;
    })
    .catch(err => { })




export const getDBProspectEntityByIdCliente = async idClienteCampania =>
  await database.collections
    .get('prospects')
    .query(Q.where('idClienteCampania', idClienteCampania))
    .fetch()
    .then(async res => {
      return res[0];
    })
    .catch(err => { });


const obtenerTipoGestion = (numeroGestiones) => {
  if (numeroGestiones === 0) return 'NOGESTIONADO'
  else if (numeroGestiones === 1) return 'GESTIONADO'
  else if (numeroGestiones > 1) return 'REGESTION'
}

export const upCumplePolNoContact = async (idClienteCampania, msgTercero, noCumplePolCom, noContactadoCom, noContactMotivo) => {
  await database.action(async () => {
    let prospectLocal = await getDBProspectEntityByIdCliente(idClienteCampania);
    let tmpContGestiones = prospectLocal.numeroGestiones + 1
    let tmpTipoGestion = obtenerTipoGestion(tmpContGestiones);
    let resultupdate = await prospectLocal.update(prospect => {
      prospect.msgTercero = msgTercero;
      prospect.noCumplePolCom = noCumplePolCom;
      prospect.noContactadoCom = noContactadoCom;
      prospect.noContactMotivo = noContactMotivo;
      prospect.fechaGestiono = moment().format(dateFormat);
      prospect.seGestiono = false;
      prospect.numeroGestiones = tmpContGestiones;
      prospect.tipoGestion = tmpTipoGestion;
      prospect.numeroSolicitud = undefined;
      prospect.dispositivo = JSON.stringify(prospect.dispositivo);
      prospect.direccion = JSON.stringify(prospect.direccion);
      prospect.correo = JSON.stringify(prospect.correo);
      prospect.motivosNoContactados = JSON.stringify(prospect.motivosNoContactados);
      prospect.datosRangoProducto = JSON.stringify(prospect.datosRangoProducto);
    });
    return resultupdate;
  });
}


export const upSeGestiono = async (psp, seGestiono, numeroSolicitud, tiempoRespuestaModifica) => {
  await database.action(async () => {
    let prospectLocal = await getDBProspectEntityByIdCliente(psp.idClienteCampania);
    let tmpContGestiones = prospectLocal.numeroGestiones + 1
    let tmpTipoGestion = obtenerTipoGestion(tmpContGestiones);
    let resultupdate = await prospectLocal.update(prospect => {
      prospect.fechaGestiono = moment().format(dateFormat);
      prospect.seGestiono = seGestiono;
      prospect.numeroSolicitud = numeroSolicitud;
      if (tiempoRespuestaModifica && tiempoRespuestaModifica != "")
        prospect.tiempoRespuesta = tiempoRespuestaModifica
      prospect.numeroGestiones = tmpContGestiones;
      prospect.tipoGestion = tmpTipoGestion;
      prospect.dispositivo = JSON.stringify(prospect.dispositivo);
      prospect.direccion = JSON.stringify(prospect.direccion);
      prospect.correo = JSON.stringify(prospect.correo);
      prospect.motivosNoContactados = JSON.stringify(prospect.motivosNoContactados);
      prospect.datosRangoProducto = JSON.stringify(prospect.datosRangoProducto);
      prospect.monto =
        (numeroSolicitud && numeroSolicitud != "" && numeroSolicitud.length > 0) ? +psp.ofertaSeleccionada.solicitada.montoLiqSol : +psp.monto;
      prospect.plazo = +psp.ofertaSeleccionada.solicitada.periodosSol;
      prospect.cuota =
        (psp.ofertaSeleccionada.solicitada.cuotaMostrar && psp.ofertaSeleccionada.solicitada.cuotaMostrar > 0) ?
          +psp.ofertaSeleccionada.solicitada.cuotaMostrar : psp.cuota;
      prospect.tipoControl = psp.calTblAmortResult?.esCambioTipoAnalisis == true ?
        psp.ofertaSeleccionada.tipoControlModifica :
        psp.ofertaSeleccionada.sugerida.control;
    });
    return resultupdate;
  });
}

export const updateDBProspect = async ent =>
  await database.action(async () => {
    let prospectLocal = await getDBProspectEntityByIdCliente(ent.idClienteCampania);
    let resultupdate = await prospectLocal.update(prospect => {
      prospect.numeroSolicitud = ent.numeroSolicitud
      prospect.idDetalleAsignacionRecurso = ent.idDetalleAsignacionRecurso;
      prospect.idClienteCampania = ent.idClienteCampania;
      prospect.nombreCampania = ent.nombreCampania;
      prospect.fechaInicioCampania = ent.fechaInicioCampania;
      prospect.fechaFinCampania = ent.fechaFinCampania;
      prospect.tipoIdentificacion = ent.tipoIdentificacion;
      prospect.identificacion = ent.identificacion;
      prospect.nombreCliente = ent.nombreCliente;
      prospect.perfilConsumo = ent.perfilConsumo;
      prospect.tipoClienteComercial = ent.tipoClienteComercial;
      prospect.grupoAgenciaConsumo = ent.grupoAgenciaConsumo;
      prospect.primerNombre = ent.primerNombre;
      prospect.segundoNombre = ent.segundoNombre;
      prospect.primerApellido = ent.primerApellido;
      prospect.segundoApellido = ent.segundoApellido;
      prospect.numeroGestiones = ent.numeroGestiones;
      prospect.codigoSubProducto = ent.codigoSubProducto;
      prospect.codigoProducto = ent.codigoProducto;
      prospect.tasa = ent.tasa;
      prospect.monto = ent.monto;
      prospect.plazo = ent.plazo;
      prospect.seGestiono = ent.seGestiono;
      prospect.tipoControl = ent.tipoControl;
      prospect.tipoGestion = ent.tipoGestion;
      prospect.dispositivo = JSON.stringify(ent.dispositivo);
      prospect.direccion = JSON.stringify(ent.direccion);
      prospect.correo = JSON.stringify(ent.correo);
      prospect.fechaGestiono = ent.fechaGestiono;
      prospect.cuota = ent.cuota;
      prospect.tiempoRespuesta = ent.tiempoRespuesta;
      prospect.motivosNoContactados = JSON.stringify(ent.motivosNoContactados);
      prospect.datosRangoProducto = JSON.stringify(ent.datosRangoProducto);
      prospect.numeroReferenciaSIB = ent.numeroReferenciaSIB;
      prospect.tipoControlModifica = ent.tipoControlModifica;
      prospect.descripcionProducto = ent.descripcionProducto;
      prospect.idArbolRespuesta = ent.idArbolRespuesta;
    });
    return resultupdate;
  });

export const updateUbicacionNueva = async ent => await database.action(
  async () => {
    let prospectLocal = await getDBProspectEntityByIdCliente(ent.idClienteCampania);
    var resultupdate = await prospectLocal.update(prospect => {
      prospect.dispositivo = JSON.stringify(ent.dispositivo);
      prospect.direccion = JSON.stringify(ent.direccion);
      prospect.correo = JSON.stringify(ent.correo);
      prospect.motivosNoContactados = JSON.stringify(ent.motivosNoContactados);
      prospect.datosRangoProducto = JSON.stringify(ent.datosRangoProducto);
    })
    return resultupdate;
  });


export const deleteDBProspect = async idClienteCampania =>
  await database.action(async () => {
    const prospect = await getCogetProspectByIdntext(idClienteCampania);
    await prospect.markAsDeleted();
    await prospect.destroyPermanently();
    return true;
  });

export const deleteAllRecords = async () => await database.action(async () => {
  let prospects = await database.collections
    .get('prospects')
    .query()
    .fetch();

  const deleted = prospects.map(prospect => prospect.prepareDestroyPermanently());
  database.batch(...deleted);
});




//INSERT NEW RECORDS
const insRecords = async (idAsesor, newRecs) => {
  console.log('Inserting new records: ', newRecs.length)
  try {
    if (newRecs.length > 0) {
      await database.action(async () => {
        let insertStat = await newRecs.map(async ent => await database.collections
          .get('prospects')
          .create(prospect => {
            prospect.numeroSolicitud = ent.numeroSolicitud
            prospect.idAsesor = idAsesor;
            prospect.idDetalleAsignacionRecurso = ent.idDetalleAsignacionRecurso;
            prospect.idCampania = ent.idCampania;
            prospect.idCliente = ent.idCliente;
            prospect.idClienteCampania = ent.idCliente;
            prospect.nombreCampania = ent.nombreCampania;
            prospect.fechaInicioCampania = ent.fechaInicioCampania;
            prospect.fechaFinCampania = ent.fechaFinCampania;
            prospect.tipoIdentificacion = ent.tipoIdentificacion;
            prospect.identificacion = ent.identificacion;
            prospect.nombreCliente = ent.nombreCliente;
            prospect.perfilConsumo = ent.perfilConsumo;
            prospect.tipoClienteComercial = ent.tipoClienteComercial;
            prospect.grupoAgenciaConsumo = ent.grupoAgenciaConsumo;
            prospect.primerNombre = ent.primerNombre;
            prospect.segundoNombre = ent.segundoNombre;
            prospect.primerApellido = ent.primerApellido;
            prospect.segundoApellido = ent.segundoApellido;
            prospect.numeroGestiones = ent.numeroGestiones;
            prospect.codigoSubProducto = ent.codigoSubProducto;
            prospect.codigoProducto = ent.codigoProducto;
            prospect.tasa = ent.tasa;
            prospect.monto = ent.monto;
            prospect.plazo = ent.plazo;
            prospect.seGestiono = ent.seGestiono;
            prospect.tipoControl = ent.tipoControl;
            prospect.tipoGestion = ent.tipoGestion;//NOGESTIONADO - REGESTION
            prospect.dispositivo = JSON.stringify(ent.dispositivo);
            prospect.direccion = JSON.stringify(ent.direccion);
            prospect.correo = JSON.stringify(ent.correo);
            prospect.fechaGestiono = ent.seGestiono === true ?
              prospect.fechaGestiono = moment(ent.fechaGestiono, "YYYY-MM-DDTHH:mm:ss").format(dateFormat) :
              "";
            prospect.noCumplePolCom = ent.noCumplePolCom;
            prospect.noContactadoCom = ent.noContactadoCom;

            prospect.msgTercero = ent.msgTercero;

            prospect.cuota = ent.cuota;
            prospect.tiempoRespuesta = ent.tiempos_Respuesta;
            prospect.motivosNoContactados = JSON.stringify(ent.motivosNoContactados);
            prospect.datosRangoProducto = JSON.stringify(ent.datosRangoProducto);
            prospect.numeroReferenciaSIB = ent.numeroReferenciaSIB;
            prospect.tipoControlModifica = ent.tipoControlModifica;
            prospect.descripcionProducto = ent.descripcionProducto;
            prospect.idArbolRespuesta = ent.idArbolRespuesta;
          }));
        database.batch(...insertStat);
      });
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }

}

//Delete Records
const delRecords = async (delRecs) => {
  try {
    if (delRecs.length > 0) {
      console.log('Deleting records: ', delRecs.length)
      await database.action(async () => {
        let pspsToDel = await database.collections
          .get('prospects')
          .query(Q.where('idDetalleAsignacionRecurso', Q.oneOf(delRecs)))
          .fetch();
        pspsToDel.map(ent => ent.prepareDestroyPermanently());
        database.batch(...pspsToDel);
      });
    }
    return true;

  } catch (err) {
    console.error(err);
    return false;
  }
}

export const syncProspectsDB = async (idAsesor, newRecs, delRecs) => {
  let resInsDel = await Promise.all([
    insRecords(idAsesor, newRecs),
    delRecords(delRecs)
  ]).then(values => {
    return values;
  });

  let resultIns = resInsDel[0];
  let resultDel = resInsDel[1];
  let result = [];
  if (resultIns && resultDel)
    result = await getAllProspects();
  return result;
}
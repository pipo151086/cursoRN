import settings from "../../settings";
import { fetchPostService, getAge, dateFormat } from 'odc-mobile-common';
import moment from 'moment';
import { getIdServerFromValue } from '../../utils/catalogUtil';

const pspUrl = settings.PspBaseUrl + 'Mobile/';

const dateFormatServidor = 'yyyy-MM-DD';

const transformDateToServerDate = (value) =>
  typeof (value) === "string" ?
    moment(value, dateFormat).format(dateFormatServidor) :
    moment(value).format(dateFormatServidor)

export const validarAsesor = async args => {
  var re = {
    idAsesor: args.codigoAsesor
  }
  return await fetchPostService('get', pspUrl + 'ConsultarAsesorId', re);
};

export const ConsultarCliente = async args => {
  var re = {
    tipoIdentificacion: args.tipoIdentificacion,
    identificacion: args.identificacion
  }
  return await fetchPostService('get', pspUrl + 'ConsultarClienteInfoMovil', re);
};

export const GrabarCliente = async args => {
  let celularSend = args.celular;
  if (!celularSend) {
    let res = args.dispositivo.filter(el => el.tipoDispositivo === 'CEL')[0]
    if (res)
      celularSend = res.valor;
  }
  var parsedFechaNacimiento = transformDateToServerDate(args.fechaNacimiento);

  var req = {
    "nit": args.nit ? args.nit : "",
    "primerNombre": args.primerNombre,
    "segundoNombre": args.segundoNombre,
    "primerApellido": args.primerApellido,
    "segundoApellido": args.segundoApellido,
    "fechaNacimiento": parsedFechaNacimiento,
    "claseCliente": "CLIENTE",
    "idAsesor": args.idAsesor,
    "identificacion": args.identificacion,
    "tipoIdentificacion": args.tipoIdentificacion,
    "celular": celularSend,
    "codigoBuro": "SIRC",
    "origenEvaluacion": "SuiteCredito",
    "numeroDiasFuenteExterna": 30,
    "numeroEntidad": "",
    "cedulaVecindad": "",
    "proceso": "ONLINE",
    "esSeguimiento": args.esSeguimiento ? args.esSeguimiento : false
  }
  return await fetchPostService('post', pspUrl + 'GrabarCliente', req);
};

export const ConsultarBuro = async args => {
  var parsedDate = transformDateToServerDate(args.fechaNacimiento);
  var req =
  {
    "nit": args.nit,
    "primerNombre": args.primerNombre,
    "segundoNombre": args.segundoNombre,
    "primerApellido": args.primerApellido,
    "segundoApellido": args.segundoApellido,
    "fechaNacimiento": parsedDate,
    "claseCliente": "CLIENTE",
    "idAsesor": args.idAsesor,
    "identificacion": args.identificacion,
    "tipoIdentificacion": args.tipoIdentificacion,
    "celular": args.celular,
    "codigoBuro": "SIRC",
    "origenEvaluacion": "SuiteCredito",
    "numeroDiasFuenteExterna": 30,
    "numeroEntidad": "",
    "cedulaVecindad": "",
    "proceso": "ONLINE",
    "esSeguimiento": true,
    "fechaNacimientoUI": parsedDate,
    "numeroIdentificacion": args.identificacion,
    "idUsuarioCreacion": 0,
    "idUsuarioActualizacion": 0
  }
  return await fetchPostService('post', pspUrl + 'ConsultarBuro', req);
};

export const GrabarClientePerfilCompleto = async args => {
  var parsedFechaNacimiento = transformDateToServerDate(args.fechaNacimiento);
  var req = {
    "nit": args.nit,
    "primerNombre": args.primerNombre,
    "segundoNombre": args.segundoNombre,
    "primerApellido": args.primerApellido,
    "segundoApellido": args.segundoApellido,
    "fechaNacimiento": parsedFechaNacimiento,
    "claseCliente": "CLIENTE",
    "idAsesor": args.idAsesor,
    "identificacion": args.identificacion,
    "tipoIdentificacion": args.tipoIdentificacion,
    "celular": args.celular,
    "codigoBuro": "SIRC",
    "origenEvaluacion": "SuiteCredito",
    "numeroDiasFuenteExterna": 30,
    "numeroEntidad": "",
    "cedulaVecindad": "",
    "proceso": "ONLINE",
    "esSeguimiento": args.esSeguimiento,
    "aniosAntiguedadLaboral": +args.aniosAntiguedad,
    "mesesAntiguedadLaboral": +args.mesesAntiguedad,
    "estadoCivil": args.estadoCivil,
    "fuenteIngreso": args.fuenteIngresos,
    "origenIngreso": args.origenIngresos,
    "subTipoIngreso": args.subtipoOrigenIngresos,
    "ingresos": (+args.ingresos == 0) ? 5000 : +args.ingresos,
    "garantia": args.tipoGarantia,
    "telefono": args.telefono, ///NO HAY TELEFONO
    "profesion": args.profesion,
    "sector": args.sector,
    "nacionalidad": args.nacionalidad,
    "nivelEducacion": args.nivelEducacion,
    "region": args.region,
    "sexo": args.sexo,
    "tipovivienda": args.tipoVivienda,
    "cargaFamiliares": +args.cargasFamiliares,
    "destinoCredito": args.destinoCredito,
    "departamento": args.departamento,
    "canton": args.canton,
    "referenciaSib": (args.buro) ? args.buro.valorRespuesta[0].value : 'NO POSEE REFERENCIA SIB',
    "idCliente": args.idCliente,
    "guidBuroCredito": (args.buro) ? args.buro.guidSujetoBuro : 'NO POSEE REFERENCIA guidBuroCredito',
    "conexionSirc": true,
    "grabarVariablesDemograficas": true,
    "antiguedadLaboral": (+args.aniosAntiguedad * 12) + +args.mesesAntiguedad,
    "fechaNacimientoUI": parsedFechaNacimiento,
  }
  if (args.fuenteIngresos === "VEN" && args.origenIngresos === "ORIGEN3") {
    req = {
      ...req,
      sectorNegocio: args.sectorNegocio,
      giroNegocio: args.giroNegocio,
      departamentoNegocio: args.departamentoNegocio,
      municipioNegocio: args.municipioNegocio,
    }
  }
  if (args.estadoCivil === "ESTCIVC") {
    req = {
      ...req,
      identificacionConyugue: args.identificacionConyugue,
    }
  }
  return await fetchPostService('post', pspUrl + 'GrabarClientePerfilCompleto', req);
};

export const ConsultarOperacionesVigentes = async (args, credSeleccionado) => {
  const { Catalogs } = GLOBAL;
  var req = {
    identificacion: args.identificacion ? args.identificacion : '1605101390501',
    tipoIdentificacion: args.tipoIdentificacion ? args.tipoIdentificacion : 'CED',
    estados: "",
    origenCredito: "",
    codigoProducto: credSeleccionado.producto ? credSeleccionado.producto : 'CONSUMO',
    codigoSubProducto: credSeleccionado.subProducto ? credSeleccionado.subProducto : 'PERSONAL',
    control: credSeleccionado.control,
    origenIngreso: getIdServerFromValue(Catalogs.OrigenIngreso, args.origenIngreso),
    nacionalidad: args.nacionalidad,
    claseCliente: 'CLIENTE'
  };
  var result = await fetchPostService('post', pspUrl + 'ListarOperacionesVigentes', req);
  return result;
};

export const CalcularValoresSeguros = async (args, solicitada, retanqueoResult) => {
  let parsedDate = transformDateToServerDate(args.fechaNacimiento);
  let age = getAge(parsedDate)
  let req = {
    "saldoCredito": +solicitada.montoLiqSol,
    "producto": args.ofertaSeleccionada.sugerida.producto,
    "subProducto": args.ofertaSeleccionada.sugerida.subProducto,
    "TipoCredito": retanqueoResult.listaCreditos.length <= 0 ? "NUEV" : "RENV",
    "edad": age,
    "rubros": retanqueoResult.rubros.rubrosPlanes
  }
  return await fetchPostService('post', pspUrl + 'CalcularValoresSeguros', req);
}


export const ConsultarDocumentosHabilitantesApp = async (args) => {
  const { idOffice } = JSON.parse(globalSession?.session?.profileTransactions)[0];
  let params = `subTipoIngreso=${args.subtipoOrigenIngresos}&codigoProducto=${args.codigoProducto}&origenIngreso=${args.origenIngresos}&idOrigenIngreso=${getIdServerFromValue(Catalogs.OrigenIngreso, args.origenIngresos)}&nacionalidad=${args.nacionalidad}&claseCliente=${"CLIENTE"}&destinoCredito=${args.destinoCredito ? args.destinoCredito : ""}&identificacion=${args.identificacion}&idCampania=${+args.idCampania}&fuenteIngresos=${args.fuenteIngresos}&idOffice=${idOffice}`
  //var result = await fetchPostService('get', `http://10.10.1.28:5060/Ventas/ConsultarDocumentosHabilitantesApp?${params}`);
  var result = await fetchPostService('get', pspUrl + `ConsultarDocumentosHabilitantesApp?${params}`);
  return result;
}

export const ConsultarTransaccionCompletaMovil = async (args) => {
  const { Catalogs } = GLOBAL;
  let celularSend = args.celular;
  if (!celularSend) {
    let res = args.dispositivo.filter(el => el.tipoDispositivo === 'CEL')[0]
    if (res)
      celularSend = res.valor;
  }
  var parsedFechaNacimiento = transformDateToServerDate(args.fechaNacimiento);

  let req2 = {
    "Identificacion": args.identificacion,
    "TipoIdentificacion": args.tipoIdentificacion,
    "CodigoProducto": args.codigoProducto,
    "CodigoSubProducto": args.codigoSubProducto,
    "Nacionalidad": args.nacionalidad,
    "OrigenIngreso": getIdServerFromValue(Catalogs.OrigenIngreso, args.origenIngreso),
    "TipoControl": args.tipoControl,
    "ClaseCliente": args.claseCliente,
    "GrupoAgenciaConsumo": args.grupoAgenciaConsumo,
    "FechaNacimiento": parsedFechaNacimiento,
    "Ingresos": args.ingresosRaw,
    "Monto": args.monto,
    "Plazo": args.plazo,
    "TipoClienteComercial": args.tipoClienteComercial,
    "PerfilConsumo": args.perfilConsumo,
    "NombreCampania": args.nombreCampania,
  }
  return await fetchPostService('post', pspUrl + 'ConsultarTransaccionCompletaMovil', req2);
}

export const ConsultarTipoTablaProductoMobile = async (codigoProducto) => {
  return await fetchPostService('get', pspUrl + 'ConsultarTipoTablaProductoMobile?codigoProducto=' + codigoProducto);
}

export const CalcularTablaAmortizacion = async (ofertaSugerida, args, values) => {
  let parsedDate = transformDateToServerDate(args.fechaNacimiento);
  let age = getAge(parsedDate);

  let segurosSend = args.ofertaSeleccionada.solicitada.seguros ?
    args.ofertaSeleccionada.solicitada.seguros.filter(itm => itm.esActivo) :
    args.ofertaSeleccionada.seguros;

  let parsedFechaPrimerVencimiento = transformDateToServerDate(args.ofertaSeleccionada.solicitada.fchVenSol);

  let esTransaccionCampania = false;
  if (args.idDetalleAsignacionRecurso && args.idDetalleAsignacionRecurso > 0)
    esTransaccionCampania = true;

  var req = {
    "departamento": args.departamento,
    "fechaNacimiento": parsedDate,
    "codigoProducto": args.ofertaSeleccionada.sugerida.producto,
    "subProductoConsumo": args.ofertaSeleccionada.sugerida.subProducto,
    "tipoCredito": args.retanqueoResult.listaCreditos.length <= 0 ? "NUEV" : "RENV",
    "grupo": args.oferta.grupoAgenciaConsumo,
    "edad": age,
    "codigoTipoCliente": args.oferta.tipoCliente,
    "perfilConsumo": args.oferta.perfilConsumo,
    "nombreCampania": !args.nombreCampania ? "Acelera" : args.nombreCampania,
    "numeroOperaciones": args.retanqueoResult.listaCreditos.length,
    "ingresos": args.ingresosRaw ? args.ingresosRaw : args.ingresos,
    //OFERTA SOLICITADA
    "montoSolicitado": +args.ofertaSeleccionada.sugerida.monto,
    "plazo": args.ofertaSeleccionada.sugerida.periodos,
    "listaSeguros": segurosSend,
    "montoSolicitado": values.montoSolRaw ? +values.montoSolRaw : +values.montoSol,
    "montoCampania": args.ofertaSeleccionada.sugerida.monto,
    "montoAprobado": values.montoSolRaw ? +values.montoSolRaw : +values.montoSol,
    "plazo": values.periodosSol,
    "fechaPrimerVencimiento": parsedFechaPrimerVencimiento,
    "tablaAmortizacionSolicitada": args.ofertaSeleccionada.solicitada.tablaSol,
    "cuotaFinanciada": args.ofertaSeleccionada.tipoCampaniaSend === "RIESGOS" ? args.ofertaSeleccionada.sugerida.cuota : 0,
    "tipoCampania": args.ofertaSeleccionada.tipoCampaniaSend,
    "antiguedadClienteConsumo": args.oferta.antiguedadClienteConsumo,

    tasaCampania: 0,
    plazoCampania: 0,
    montoCampania: 0
  }

  if (esTransaccionCampania) {
    req.tasaCampania = args.tasa;
    req.plazoCampania = args.ofertaSeleccionada.sugerida.plazo;
    req.montoCampania = args.ofertaSeleccionada.sugerida.monto;
  }
  return await fetchPostService('post', pspUrl + 'CalcularTablaConCambioTipoAnalisis', req);
};

export const IniciarFlujo = async args => {
  var req = getTramaIniciarFlujo(args);
  req.aceptaOferta = true;
  req.noAceptaOferta = false;
  req.esAgendamiento = false;
  if (args.idDetalleAsignacionRecurso && args.idDetalleAsignacionRecurso > 0) {
    req.esTransaccionCampania = true;
    req.grabarVariablesDemograficas = false
  }
  return await fetchPostService('post', pspUrl + 'iniciarFlujo', req);
}

export const AgendarFlujo = async args => {
  var req = getTramaIniciarFlujo(args);
  req.fechaAgendamiento = args.fechaAgendamiento;
  req.observacion = args.observacion;
  req.esAgendamiento = true;
  req.aceptaOferta = false;
  req.noAceptaOferta = true;
  if (args.idDetalleAsignacionRecurso && args.idDetalleAsignacionRecurso > 0) {
    req.esTransaccionCampania = true;
    req.grabarVariablesDemograficas = false
  }
  return await fetchPostService('post', pspUrl + 'iniciarFlujo', req);
}

export const RechazarFlujo = async args => {
  var req = getTramaIniciarFlujo(args);
  req.motivoRechazo = args.motivoRechazo;
  req.observacionMotivoRechazo = args.observacionRechazo;
  req.aceptaOferta = false;
  req.noAceptaOferta = true;
  if (args.idDetalleAsignacionRecurso && args.idDetalleAsignacionRecurso > 0) {
    req.esTransaccionCampania = true;
    req.grabarVariablesDemograficas = false
  }
  return await fetchPostService('post', pspUrl + 'iniciarFlujo', req);
}

const getTramaIniciarFlujo = args => {
  const { Catalogs } = GLOBAL;
  let celularSend = args.celular;
  if (!celularSend) {
    let res = args.dispositivo.filter(el => el.tipoDispositivo === 'CEL')[0]
    if (res)
      celularSend = res.valor;
  }
  let ingresoSend = args.ingresosRaw ? args.ingresosRaw : +args.ingresos

  if (!ingresoSend)
    ingresoSend = 0;

  let tasaSend = (args.calTblAmortResult && args.calTblAmortResult.tasa) ? args.calTblAmortResult.tasa : args.ofertaSeleccionada.sugerida.tasa

  let tipoClienteSend = args.oferta.tipoCliente
  let perfilConsumoSend = args.oferta.perfilConsumo

  let segurosSend = args.ofertaSeleccionada?.solicitada?.seguros;
  if (args.ofertaSeleccionada?.solicitada?.segurosAf && args.ofertaSeleccionada.solicitada.segurosAf.length > 0) {
    segurosSend = args.ofertaSeleccionada?.solicitada?.segurosAf.filter(ex => ex.esActivo)
  }

  let esTransaccionCampania = false;
  if (args.idDetalleAsignacionRecurso && args.idDetalleAsignacionRecurso > 0)
    esTransaccionCampania = true;

  let controlSend = {};
  if (esTransaccionCampania === true)
    controlSend.tipoControl = args.calTblAmortResult?.esCambioTipoAnalisis == true ?
      args.ofertaSeleccionada.tipoControlModifica :
      args.ofertaSeleccionada.sugerida.control
  else
    controlSend = args.calTblAmortResult?.esCambioTipoAnalisis == true ?
      { tipoControl: args.ofertaSeleccionada.tipoControlModifica } :
      args.ofertaSeleccionada.sugerida.tipoControl

  let cuotaSend = (args.calTblAmortResult && args.calTblAmortResult.dividendos[0].cuota > 0) ?
    args.calTblAmortResult.dividendos[0].cuota : +args.ofertaSeleccionada.solicitada.cuotaSol


  args.aniosAntiguedad = !args.aniosAntiguedad ? 0 : args.aniosAntiguedad;
  args.mesesAntiguedad = !args.mesesAntiguedad ? 0 : args.mesesAntiguedad;

  let tipoCta = ''
  let tipoCombinacion = ""
  if (args.ofertaSeleccionada.solicitada.ctaDesembolsoSelectSol != "CtaNueva") {
    let ctaSelect = args.ofertaSeleccionada.solicitada.ctaDesembolsoSol.find(cta => cta.numeroCuenta === args.ofertaSeleccionada.solicitada.ctaDesembolsoSelectSol)
    tipoCta = ctaSelect.tipoCuenta
    tipoCombinacion = ctaSelect.tipoCombinacion;
  }

  let parsedFechaNacimiento = transformDateToServerDate(args.fechaNacimiento);

  let ofertaValorSend = args.oferta?.ofertaValor;

  if (esTransaccionCampania === true)
    ofertaValorSend = {
      campania_Especial: [],
      campania_EspecialXml: null,
      capacidad_Maxima: [],
      capacidad_MaximaXml: null,
      oferta: [{
        ...args.ofertaSeleccionada.sugerida,
        monto: args.ofertaSeleccionada.sugerida.monto,
        plazo: null,
        periodos: args.ofertaSeleccionada.sugerida.periodos,
        "producto": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.producto : null,
        "subProducto": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.subProducto : null,
        nombreCampania: args.nombreCampania,
      }],
      ofertaXml: null
    }

  var req = {
    ofertaValor: ofertaValorSend,
    "chequeAcreditacion": (args.ofertaSeleccionada.solicitada.desembolsoSol === "MIXTO") ?
      {
        "codigo": "NCCONTAB",//OJO
        "valor": args.ofertaSeleccionada.solicitada.valorChequeRaw ? args.ofertaSeleccionada.solicitada.valorChequeRaw : +args.ofertaSeleccionada.solicitada.valorCheque,
      } : undefined,
    "acreditacionCuenta": (args.ofertaSeleccionada.solicitada.desembolsoSol === "MIXTO") ?
      {
        "codigo": "NOTACRED",//OJO
        "valor": args.ofertaSeleccionada.solicitada.acredicacionCuentaRaw ? args.ofertaSeleccionada.solicitada.acredicacionCuentaRaw : +args.ofertaSeleccionada.solicitada.acredicacionCuenta,
      } : undefined,

    "antiguedadClienteConsumo": args.oferta.antiguedadClienteConsumo,
    "numeroCuenta": (args.ofertaSeleccionada.solicitada.ctaDesembolsoSelectSol === "CtaNueva") ? "" : args.ofertaSeleccionada.solicitada.ctaDesembolsoSelectSol,
    "esNueva": (args.ofertaSeleccionada.solicitada.desembolsoSol === "NOTACRED") ? (args.ofertaSeleccionada.solicitada.ctaDesembolsoSelectSol === "CtaNueva") ? true : false : false,
    "tipoCuenta": tipoCta,
    "tipoCombinacion": tipoCombinacion,
    "destino": undefined,//args.ofertaSeleccionada.solicitada.destinoCredSol,
    "grupoAgenciaConsumo": args.grupoAgenciaConsumo ? args.grupoAgenciaConsumo : args.oferta.grupoAgenciaConsumo,
    "esTransaccionCampania": esTransaccionCampania,
    "CambioTipoControl": args.calTblAmortResult?.esCambioTipoAnalisis,
    "periodicidad": args.calTblAmortResult?.periodicidad,
    "montoFinanciado": args.calTblAmortResult?.montoFinanciado,
    "tasa": tasaSend ? tasaSend : 0,
    "idCampania": args.idCampania,
    "nit": (!args.nit) ? "" : args.nit,
    "primerNombre": args.primerNombre,
    "segundoNombre": args.segundoNombre,
    "primerApellido": args.primerApellido,
    "segundoApellido": args.segundoApellido,
    "fechaNacimiento": parsedFechaNacimiento,
    "tipoCliente": tipoClienteSend, //REPETIDO
    "tipoClientePerfil": perfilConsumoSend,
    "claseCliente": "CLIENTE", //"CLIENTE"
    "idAsesor": args.idAsesor,
    "identificacion": args.identificacion,
    "tipoIdentificacion": args.tipoIdentificacion,
    "celular": celularSend ? celularSend : "0",
    "codigoBuro": "SIRC",// args.codigoBuro, NO HAY
    "origenEvaluacion": "SuiteCredito",// args.origenEvaluacion NO HAY
    "numeroDiasFuenteExterna": 30, //NO HAY
    "numeroEntidad": "",
    "cedulaVecindad": "",
    "proceso": "ONLINE", // NOHAY
    "esSeguimiento": args.esSeguimiento ? args.esSeguimiento : false,
    "aniosAntiguedadLaboral": args.aniosAntiguedad ? +args.aniosAntiguedad : 0,
    "mesesAntiguedadLaboral": args.mesesAntiguedad ? +args.mesesAntiguedad : 0,
    "estadoCivil": args.estadoCivil,
    "fuenteIngreso": args.fuenteIngresos ? args.fuenteIngresos : "SALARIO",
    "origenIngreso": getIdServerFromValue(Catalogs.OrigenIngreso, args.origenIngresos ? args.origenIngresos : args.origenIngreso),//args.origenIngresos,//"190", OJO
    "subTipoIngreso": args.subtipoOrigenIngresos ? args.subtipoOrigenIngresos : "ASALARIADO",//"PROFESIONAL",
    "ingresos": ingresoSend,
    "garantia": args.tipoGarantia,
    "telefono": args.telefono,
    "profesion": args.profesion,
    "sector": args.sector,
    "nacionalidad": args.nacionalidad,
    "nivelEducacion": args.nivelEducacion,
    "region": args.region,
    "sexo": args.sexo,
    "tipovivienda": args.tipoVivienda,
    "cargaFamiliares": args.cargasFamiliares ? +args.cargasFamiliares : 0,
    "destinoCredito": args.destinoCredito,
    "departamento": args.departamento,
    "canton": args.canton,
    "referenciaSib": args.buro ? args.buro.valorRespuesta[0].value : undefined,
    "idCliente": args.idCliente,
    "guidBuroCredito": args.buro ? args.buro.guidSujetoBuro : undefined,
    "conexionSirc": true, //// ?????????????????????????
    "grabarVariablesDemograficas": true, //?????????????

    //REPETIDO
    "antiguedadLaboral": (args.aniosAntiguedad && args.mesesAntiguedad) ? ((+args.aniosAntiguedad * 12) + +args.mesesAntiguedad) : 0,
    "esCampania": true, //??????????????? args.ofertaSeleccionada.sugerida.codigoCampania == null ? false:true

    //REPETIDO
    "guidInstaciaFlujo": args.buro ? args.oferta.instanciaFlujo : undefined,

    "monto": args.ofertaSeleccionada ? +args.ofertaSeleccionada.solicitada.montoSol : 0,
    "saldo": args.ofertaSeleccionada ? +args.ofertaSeleccionada.solicitada.saldoVal : 0,
    "montoLiquido": args.ofertaSeleccionada ? +args.ofertaSeleccionada.solicitada.montoLiqSol : 0,
    "periodos": args.ofertaSeleccionada ? +args.ofertaSeleccionada.solicitada.periodosSol : 0,
    "fechaVencimiento": args.ofertaSeleccionada ?
      transformDateToServerDate(args.ofertaSeleccionada.solicitada.fchVenSol)
      :
      moment().format(dateFormatServidor),
    "tabla": args.ofertaSeleccionada ? args.ofertaSeleccionada.solicitada.tablaSol : null,
    "cuota": cuotaSend,
    "esRenovacion": (args.retanqueoResult && args.retanqueoResult.listaCreditos.length <= 0) ? false : true,
    "desembolsoCuenta": args.ofertaSeleccionada ? args.ofertaSeleccionada.solicitada.desembolsoSol : 0,
    "tipoControl": controlSend,

    //sugerida
    "CodigoProducto": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.producto : null,
    "montoSugerido": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.monto : 0,
    "periodosSugerido": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.periodos : 0,
    "codigoCampania": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.codigoCampania : null,

    //REPETIDO
    "producto": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.producto : null,
    "subProducto": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.subProducto : null,

    //REPETIDO?????????
    "plazo": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.plazo : null,
    "montoMaximo": args.ofertaSeleccionada ? +args.ofertaSeleccionada.limites.montBrtMax : 0,
    "tiempos_Respuesta": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.tiempos_Respuesta : null,

    "control": args.ofertaSeleccionada ? args.ofertaSeleccionada.sugerida.control : null,
    "controlModifica": args.ofertaSeleccionada ? args.ofertaSeleccionada.tipoControlModifica : null,


    "id": 1, ///??????????????????????????????????????
    "perfil": args.oferta.perfilConsumo,//?????
    "perfilComercial": args.oferta.perfilConsumo,
    "segurosVoluntarios": segurosSend,
    "documentosHabilitantes": args.retanqueoResult ? args.retanqueoResult.documentosHabilitantes : [],

    //REPETIDO
    //"fechaNacimientoUI": mntFormatedDateToSecondTimeStamp(args.fechaNacimiento),
    "fechaNacimientoUI": parsedFechaNacimiento,
    horaGestion: moment().format('HH:mm:ss')//args.horaGestion,
  }
  if (args.fuenteIngresos === "VEN" && args.origenIngresos === "ORIGEN3") {
    req = {
      ...req,
      sectorNegocio: getIdServerFromValue(Catalogs.SECTORNEGOCIO, args.sectorNegocio),
      giroNegocio: args.giroNegocio,
      departamentoNegocio: args.departamentoNegocio,
      municipioNegocio: args.municipioNegocio,
    }
  }
  if (args.estadoCivil === "ESTCIVC") {
    req = {
      ...req,
      identificacionConyugue: args.identificacionConyugue,
    }
  }
  return req;
}

export const GuardarDispositivosMobile = async args => {
  args = {
    ...args,
    IdArbolRespuesta: args.idArbolRespuesta,
    CumplePoliticasInfo: {
      CumplePoliticas: args.CumplePolInfo?.cumplePol && args.ContactadoInfo?.contactado && args.ContactadoInfo?.directo,
      ComentarioCumplePoliticas: args.CumplePolInfo?.noCumplePolCom,
      MotivoCumplePoliticas: 'NOCUMPOLIT'//args.CumplePolInfo?.noCumplePolMotivo,
    },

    ContactadoInfo: {
      Contactado: args.ContactadoInfo?.contactado,
      ComentarioContactado: (args.ContactadoInfo?.contactado === true && args.ContactadoInfo?.directo === false) ? args.ContactadoInfo?.msgTercero : args.ContactadoInfo?.noContactCom,
      MotivoContactado: (args.ContactadoInfo?.contactado === true && args.ContactadoInfo?.directo === false) ? "MSJTERCEROS" : args.ContactadoInfo?.noContactMotivo,
    },
    horaGestion: moment().format('HH:mm:ss')//args.horaGestion,
  }
  return await fetchPostService('post', pspUrl + 'GuardarDispositivosMobile', args);
}

export const ConsultarProductoFormaDesembolso = async (codigoProducto) => await fetchPostService('get', pspUrl + 'ConsultarProductoFormaDesembolso?codigoProducto=' + codigoProducto);

export const ConsultarCampaniaPorAsesor = async args => await fetchPostService('post', pspUrl + 'ConsultarCampaniaPorAsesor', args);

export const ConsultarCampaniaGraficoMovil = async () => await fetchPostService('get', pspUrl + 'ConsultarCampaniaGraficoMovil', undefined);

export const ConsultarGestionesCampania = async (args) => await fetchPostService('get', pspUrl + 'ConsultarGestionesApp?identificacion=' + args.identificacion + '&idCampania=' + args.idCampania);

export const ConsultarDestinosCreditos = async (args) => await fetchPostService('get', pspUrl + 'ConsultarDestinosCreditos?codigoProducto=' + args);


export const ConsultarCuentas = async (tipoIdentificacion, identificacion) => await fetchPostService('get', pspUrl + 'ConsultarCuentas?tipoIdentificacion=' + tipoIdentificacion + '&identificacion=' + identificacion);


export const GetAgendadas = async () => {
  const { userCode, institutionID } = globalSession.session.jwt.claims;
  // await fetchPostService('get', pspUrl + 'GetAllAppointments?userCode=' + userCode + '&institution=' + institutionID);
  let fetchResult = JSON.parse("{\"dataIsNull\":false,\"state\":true,\"data\":[{\"idAppointment\":1527,\"userCode\":\"PALMAR\",\"institution\":\"2\",\"title\":\"PRUEBA CUATRO\",\"description\":\"QWERTY\",\"startDate\":1624284000,\"endDate\":1624285800,\"location\":null,\"transaction\":null,\"allDay\":false,\"isActive\":true,\"owner\":true,\"creationDate\":null,\"creationUserId\":null,\"creationOfficeId\":null,\"updateDate\":null,\"updateUserId\":null,\"updateOfficeId\":null,\"agendedUsers\":[]},{\"idAppointment\":1528,\"userCode\":\"PALMAR\",\"institution\":\"2\",\"title\":\"ROBERTO VASQUEZ\",\"description\":\"Miguel prueba pod Dorian\",\"startDate\":1624898940,\"endDate\":1624902540,\"location\":\"ONLINE\",\"transaction\":\"ONLINE\",\"allDay\":false,\"isActive\":true,\"owner\":true,\"creationDate\":null,\"creationUserId\":null,\"creationOfficeId\":null,\"updateDate\":null,\"updateUserId\":null,\"updateOfficeId\":null,\"agendedUsers\":[]}],\"code\":\"00\",\"message\":\"\",\"guid\":null}");
  fetchResult.data[0].startDate = moment().add(1, 'hour').unix();
  fetchResult.data[0].endDate = moment().add(2, 'hour').unix();
  fetchResult.data[1].startDate = moment().add(3, 'hour').unix();
  fetchResult.data[1].endDate = moment().add(5, 'hour').unix();
  fetchResult.message="DATA INCORRECT FORMAT"
  return fetchResult;
}

export const ValidateUsrExists = async (usrCode) => await fetchPostService('get', pspUrl + 'FindUserByUserCode?userCode=', usrCode);

export const EditAgenda = async (appointment) => {
  var parsedStartDate = typeof (appointment.start) === "string" ?
    `${moment(appointment.start, dateFormat).format(dateFormatServidor)}T${appointment.startHour}:00.000` :
    `${moment(appointment.start).format(dateFormatServidor)}T${appointment.startHour}:00.000`

  var parsedEndDate;
  if (!appointment.allDay) {
    parsedEndDate = typeof (appointment.start) === "string" ?
      `${moment(appointment.start, dateFormat).format(dateFormatServidor)}T${appointment.endHour}:00.000` :
      `${moment(appointment.start).format(dateFormatServidor)}T${appointment.endHour}:00.000`
  }
  else {
    parsedEndDate = typeof (appointment.start) === "string" ?
      `${moment(appointment.start, dateFormat).format(dateFormatServidor)}T20:00:00.000` :
      `${moment(appointment.start).format(dateFormatServidor)}T20:00:00.000`
  }
  let longParsedStartDate = moment(parsedStartDate).unix();
  let longParsedEndDate = moment(parsedEndDate).unix();
  debugger;

  let req = {
    ...appointment,
    startDate: longParsedStartDate,
    endDate: longParsedEndDate
  }
  return { state: true, data: true }//await fetchPostService('post', pspUrl + 'EditAppointment', req);
}


export const ConsultarEmpresaPersonaJuridica = async (args) => {
  return await fetchPostService('get', `${pspUrl}ConsultarEmpresaPersonaJuridica?tipoConsulta=${args.tipoConsulta}&valorConsulta=${args.valorConsulta}&idInstitution=${args.idInstitution}`);
}

export const ConsultarAgencia = async (args) => {
  return await fetchPostService('get', `${pspUrl}ConsultarAgencia?idEmpresa=${args.idEmpresa}&idInstitution=${args.idInstitution}`);
}

export const ConsultarReferenciaPorSolicitud = async (args) => {
  return await fetchPostService('get', `${pspUrl}consultarReferenciaPorSolicitud?numSolicitud=${args.numSolicitud}&idInstitution=${args.idInstitution}`);
}

export async function obtenerSolicitudesConsultaUnificada(parametro, idInstitucion) {
  let body = {
    // idSolicitud: parametro.idSolicitud
  }
  let url = ''
  if (parametro.tipoConsulta === "I") {
    body = {
      identificacion: parametro.idSolicitud,
      idInstitucion: idInstitucion
    }
    url = pspUrl + 'ConsultarSolicitudesConsultaUnificada'
  } else {
    body = {
      numeroSolicitud: parametro.idSolicitud
    }
    url = pspUrl + 'ConsultarInformacionSolicitudConsultaUnificada'
  }
  return fetchPostService('get', url, body)
    .then(res => {
      if (res.data === null) {
        return []
      } else {
        if (res.data.resumenSolicitud !== undefined) {
          let capital = 0
          let interes = 0
          let otros = 0
          let descuentos = 0
          let tInteres = 0
          let capitalReducido = 0

          let a;
          a = res.data.resumenSolicitud.montoOferta
          res.data.resumenSolicitud.montoOferta = a.toFixed(2)
          a = res.data.resumenSolicitud.saldoActualOferta
          res.data.resumenSolicitud.saldoActualOferta = a.toFixed(2)
          a = res.data.resumenSolicitud.montoLiquidoOferta
          res.data.resumenSolicitud.montoLiquidoOferta = a.toFixed(2)
          a = res.data.resumenSolicitud.cuotaOferta
          res.data.resumenSolicitud.cuotaOferta = a.toFixed(2)

          let b;
          b = res.data.resumenSolicitud.montoSolicitado
          res.data.resumenSolicitud.montoSolicitado = b.toFixed(2)
          b = res.data.resumenSolicitud.saldoActualSolicitada
          res.data.resumenSolicitud.saldoActualSolicitada = b.toFixed(2)
          b = res.data.resumenSolicitud.montoLiquidoSolicitado
          res.data.resumenSolicitud.montoLiquidoSolicitado = b.toFixed(2)
          b = res.data.resumenSolicitud.cuotaSolicitada
          res.data.resumenSolicitud.cuotaSolicitada = b.toFixed(2)

          let c;
          c = res.data.resumenSolicitud.montoAprobado
          res.data.resumenSolicitud.montoAprobado = c.toFixed(2)
          c = res.data.resumenSolicitud.saldoActualAprobado
          res.data.resumenSolicitud.saldoActualAprobado = c.toFixed(2)
          c = res.data.resumenSolicitud.montoLiquidoAprobado
          res.data.resumenSolicitud.montoLiquidoAprobado = c.toFixed(2)
          c = res.data.resumenSolicitud.cuotaAprobado
          res.data.resumenSolicitud.cuotaAprobado = c.toFixed(2)

          res.data.resumenSolicitud.fechaCreacion = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.resumenSolicitud.fechaCreacion))
          res.data.resumenSolicitud.fechaPrimerVctoOferta = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.resumenSolicitud.fechaPrimerVctoOferta))
          res.data.resumenSolicitud.fechaPrimerVctoSolicitado = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.resumenSolicitud.fechaPrimerVctoSolicitado))
          res.data.resumenSolicitud.fechaPrimerVctoAprobado = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.resumenSolicitud.fechaPrimerVctoAprobado))

          res.data.tablaAmortizacion.forEach((o, i) => {
            (o.fechaVencimiento !== undefined) ? o.fechaVencimiento = new Intl.DateTimeFormat('en-GB').format(new Date(o.fechaVencimiento)) : null

            capital = o.capital
            interes = o.interes
            otros = o.otros
            descuentos = o.descuento
            tInteres = o.tasaInteres
            capitalReducido = o.capitalReducido

            o.capital = capital.toFixed(2)
            o.interes = interes.toFixed(2)
            o.otros = otros.toFixed(2)
            o.descuento = descuentos.toFixed(2)
            o.tasaInteres = tInteres.toFixed(2)
            o.capitalReducido = capitalReducido.toFixed(2)
          })
          res.data.actividades.forEach((o, i) => {
            (o.startTime !== undefined) ? o.startTime = new Intl.DateTimeFormat('en-GB',
              {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              }).format(new Date(o.startTime)) : null
          })
        } else {
          res.data.forEach((o, i) => (o.fechaCreacion !== undefined) ? o.fechaCreacion = new Intl.DateTimeFormat('en-GB').format(new Date(o.fechaCreacion)) : null)
        }
        return res.data
      }
    })
    .catch(ex => {
      return []
    })
}


export async function obtenerAnalisisDomiciliario(parametro) {
  let body = Object.assign({}, parametro)
  let url = pspUrl + 'consultarInformacionClienteConsultaUnificadaApp'
  return fetchPostService('get', url, body)
    .then(res => {
      if (res.state) {
        res.data.analisisDomicilio.fechaVerificacion = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.analisisDomicilio.fechaVerificacion))
        res.data.analisisLaboral.fechaVerificacion = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.analisisLaboral.fechaVerificacion))
        res.data.analisisNegocio.fechaVerificacion = new Intl.DateTimeFormat('en-GB').format(new Date(res.data.analisisNegocio.fechaVerificacion))
        return res.data
      } else {
        return {
          documentos: [],
          analisisTelefonico: [],
          analisisDomicilio: {
            estado: null,
            verificador: null,
            tipo: null,
            fechaVerificacion: '0001-01-01T00:00:00',
            comentario: null,
            departamento: null,
            municipio: null,
            zona: null,
            localidad: null,
            callePrincipal: null,
            calleTransversal: null,
            numeroVivienda: null,
            referencia: null
          },
          analisisLaboral: {
            estado: null,
            verificador: null,
            tipo: null,
            fechaVerificacion: '0001-01-01T00:00:00',
            comentario: null,
            departamento: null,
            municipio: null,
            zona: null,
            localidad: null,
            callePrincipal: null,
            calleTransversal: null,
            numeroVivienda: null,
            referencia: null
          },
          analisisNegocio: {
            estado: null,
            verificador: null,
            tipo: null,
            fechaVerificacion: '0001-01-01T00:00:00',
            comentario: null,
            departamento: null,
            municipio: null,
            zona: null,
            localidad: null,
            callePrincipal: null,
            calleTransversal: null,
            numeroVivienda: null,
            referencia: null
          }, estadoFinanciero: []
        }
      }
    })
    .catch(ex => {
      return []
    })
}































//Dummy
export const GetCarteraResp = async args => {
  return await tramas.newSinc2;
};
export const GetPescarResp = async args => {
  return await tramas.PescarResp;
};
export const GetProspectarResp = async args => {
  return await tramas.ProspectarResp;
};
export const GetResp = async args => {
  return await tramas.CalcularResp;
};

export const ObtenerOferta = async args => {
  return await tramas.ObtenerOferta;
};


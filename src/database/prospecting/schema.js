import { tableSchema } from '@nozbe/watermelondb';

export default [
  tableSchema({
    name: 'prospects',
    columns: [
      { name: "numeroSolicitud", type: 'string' },
      { name: "idAsesor", type: 'number' },
      { name: "idDetalleAsignacionRecurso", type: 'number', isIndexed: true },
      { name: "idCampania", type: 'number', isIndexed: true },
      { name: "idCliente", type: 'number', isIndexed: true },
      { name: "idClienteCampania", type: 'number', isIndexed: true },
      { name: "nombreCampania", type: 'string' },
      { name: "fechaInicioCampania", type: 'string' },
      { name: "fechaFinCampania", type: 'string' },
      { name: "tipoIdentificacion", type: 'string' },
      { name: "identificacion", type: 'string', isIndexed: true },
      { name: "nombreCliente", type: 'string' },
      { name: "perfilConsumo", type: 'string' },
      { name: "tipoClienteComercial", type: 'string' },
      { name: "grupoAgenciaConsumo", type: 'string' },
      { name: "primerNombre", type: 'string' },
      { name: "segundoNombre", type: 'string' },
      { name: "primerApellido", type: 'string' },
      { name: "segundoApellido", type: 'string' },
      { name: "numeroGestiones", type: 'number' },
      { name: "codigoSubProducto", type: 'string' },
      { name: "codigoProducto", type: 'string' },
      { name: "tasa", type: 'number' },
      { name: "monto", type: 'number' },
      { name: "plazo", type: 'number' },
      { name: "seGestiono", type: 'boolean' },
      { name: "tipoControl", type: 'string' },
      { name: "tipoGestion", type: 'string' },
      { name: "dispositivo", type: 'string' },
      { name: "direccion", type: 'string' },
      { name: "correo", type: 'string' },
      { name: "fechaGestiono", type: 'string' },
      { name: "noContactadoCom", type: 'string' },
      { name: "noContactMotivo", type: 'string' },
      { name: "noCumplePolCom", type: 'string' },
      { name: "msgTercero", type: 'string' },
      { name: "cuota", type: 'number' },
      { name: "tiempoRespuesta", type: 'string' },
      { name: "motivosNoContactados", type: 'string' },
      { name: "datosRangoProducto", type: 'string' },
      { name: "numeroReferenciaSIB", type: 'string' },
      { name: "tipoControlModifica", type: 'string' },
      { name: "descripcionProducto", type: 'string' },
      { name: "idArbolRespuesta", type: 'number' },
      

    ],
  }),

];
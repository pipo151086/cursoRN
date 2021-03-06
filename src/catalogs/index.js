import { getCatalogByCode, getCatalogDetailByCatalogCode } from '../database/common/dbHandlerCatalogs'

/*
export let Catalogs = {
    ...GLOBAL.Catalogs
}

export const Catalogs = {
    get: async (code) => await getCatalogDetailByCatalogCode(code),

    TipoIdentificacion:
        [
            { value: "CED", label: "DPI" },
            { value: "PAS", label: "PASAPORTE" },
            { value: "NIT", label: "NIT" }
        ],













    TipoDispositivoUbi: [
        { value: 'CEL', label: 'CELULAR' },
        { value: 'COV', label: 'CONVENCIONAL' }
    ],
    RegionSegmentacion:
        [
            { value: "REGNORORIENTE", parent: "16", label: "REGION NOR-ORIENTE" },
            { value: "REGSUR", parent: "04", label: "REGION SUR" },
            { value: "REGNORORIENTE", parent: "20", label: "REGION NOR-ORIENTE" },
            { value: "REGNORORIENTE", parent: "02", label: "REGION NOR-ORIENTE" },
            { value: "REGSUR", parent: "05", label: "REGION SUR" },
            { value: "REGCAPITAL", parent: "01", label: "REGION CAPITAL" },
            { value: "REGOCCIDENTE", parent: "13", label: "REGION OCCIDENTE" },
            { value: "REGNORORIENTE", parent: "18", label: "REGION NOR-ORIENTE" },
            { value: "REGNORORIENTE", parent: "21", label: "REGION NOR-ORIENTE" },
            { value: "REGSUR", parent: "22", label: "REGION SUR" },
            { value: "REGNORORIENTE", parent: "17", label: "REGION NOR-ORIENTE" },
            { value: "REGOCCIDENTE", parent: "09", label: "REGION OCCIDENTE" },
            { value: "REGOCCIDENTE", parent: "14", label: "REGION OCCIDENTE" },
            { value: "REGOCCIDENTE", parent: "11", label: "REGION OCCIDENTE" },
            { value: "REGSUR", parent: "03", label: "REGION SUR" },
            { value: "REGOCCIDENTE", parent: "12", label: "REGION OCCIDENTE" },
            { value: "REGSUR", parent: "06", label: "REGION SUR" },
            { value: "REGOCCIDENTE", parent: "07", label: "REGION OCCIDENTE" },
            { value: "REGOCCIDENTE", parent: "10", label: "REGION OCCIDENTE" },
            { value: "REGOCCIDENTE", parent: "08", label: "REGION OCCIDENTE" },
            { value: "REGNOR-ORIENTE", parent: "19", label: "REGION NOR-ORIENTE" }
        ],


    GIRONEGOCIO: [
        { value: "38", parent: 'C', label: "Abarrotes" },
        { value: "39", parent: 'C', label: "Agroindustria" },
        { value: "40", parent: 'C', label: "Art??culos de cuero" },
        { value: "41", parent: 'C', label: "Carnicer??a" },
        { value: "42", parent: 'C', label: "Combustibles / Gas Propano / Sustancias qu??micas" },
        { value: "43", parent: 'C', label: "Distribuidor" },
        { value: "44", parent: 'C', label: "Electr??nicos / Telefon??a" },
        { value: "45", parent: 'C', label: "Farmacia" },
        { value: "46", parent: 'C', label: "Ferreter??a" },
        { value: "47", parent: 'C', label: "Ganader??a" },
        { value: "48", parent: 'C', label: "Importadora / Exportadora" },
        { value: "49", parent: 'C', label: "Joyer??a y Relojer??a" },
        { value: "50", parent: 'C', label: "Librer??a / Imprenta" },
        { value: "51", parent: 'C', label: "Recicladora" },
        { value: "52", parent: 'C', label: "Tortiller??a" },
        { value: "53", parent: 'C', label: "Venta De Instrumentos Musicales" },
        { value: "54", parent: 'C', label: "Venta de Muebles / Articulos para el hogar" },
        { value: "55", parent: 'C', label: "Venta de Ropa / Articulos deportivos" },
        { value: "56", parent: 'C', label: "Venta De Veh??culos" },
        { value: "57", parent: 'C', label: "Vivero" },
        { value: "58", parent: 'P', label: "Artesan??as" },
        { value: "59", parent: 'P', label: "Carpinter??as / Aserraderos" },
        { value: "60", parent: 'P', label: "Confecciones" },
        { value: "61", parent: 'P', label: "Construcci??n" },
        { value: "62", parent: 'P', label: "Elaboraci??n de productos alimenticios" },
        { value: "63", parent: 'P', label: "Molino" },
        { value: "64", parent: 'P', label: "Panader??a / Pasteler??a" },
        { value: "65", parent: 'S', label: "Aire acondicionado / Refrigeraci??n" },
        { value: "66", parent: 'S', label: "Alquileres" },
        { value: "67", parent: 'S', label: "Cuidados personales" },
        { value: "68", parent: 'S', label: "Funeraria" },
        { value: "69", parent: 'S', label: "Metal??rgia" },
        { value: "70", parent: 'S', label: "Restaurantes" },
        { value: "71", parent: 'S', label: "Servicios automotrices" },
        { value: "72", parent: 'S', label: "Servicios de Seguridad" },
        { value: "73", parent: 'S', label: "Servicios Educativos" },
        { value: "74", parent: 'S', label: "Servicios Hoteleros / Turismo / Diversi??n" },
        { value: "75", parent: 'S', label: "Servicios M??dicos" },
        { value: "76", parent: 'S', label: "Servicios para el hogar" },
        { value: "77", parent: 'S', label: "Servicios Profesionales / Outsourcing" },
        { value: "78", parent: 'S', label: "Transporte" },
        { value: "79", parent: 'D', label: "Salario" },
    ],


    SECTORNEGOCIO: [
        { idServ: '3', parent: 'VEN', value: "C", label: "COMERCIO" },//idSector
        { idServ: '5', parent: 'SAL', value: "D", label: "DEPENDENCIA" },//idSector
        { idServ: '1', parent: 'REN', value: "E", label: "PERSONAL" },//idSector
        { idServ: '2', parent: 'VEN', value: "P", label: "PRODUCCION" },//idSector
        { idServ: '4', parent: 'VEN', value: "S", label: "SERVICIOS" }//idSector
    ],

    DestinoCredFteIngTodos: [
        { value: "LIBREDISPO", label: "LIBRE DISPONIBILIDAD" },
        { value: "CONSOLIDADEUDA", label: "COMPRA DE DEUDA" },
        { value: "REGULARIZADEUDA", label: "REGULARIZACION DE DEUDA EN BDA" }
    ],
    

    DESTINOCREDITO: [
        { value: "CAPITALTRABAJO", label: "CAPITAL DE TRABAJO", "esIndependiente": true },
        { value: "COMPRAACTIVOS", label: "COMPRA Y MEJORA DE ACTIVOS FIJOS", "esIndependiente": true },
        { value: "REGULARIZADEUDA", label: "REGULARIZACION DE DEUDA EN BDA", "esIndependiente": false },
    ],

	DestinoCredFteIngVentas: [
        { value: "REGULARIZADEUDA", label: "REGULARIZACION DE DEUDA EN BDA" },
        { value: "CAPITALTRABAJO", label: "CAPITAL DE TRABAJO" },
        { value: "COMPRAACTIVOS", label: "COMPRA Y MEJORA DE ACTIVOS FIJOS" },
        { value: "CONSOLIDADEUDA", label: "COMPRA DE DEUDA" },
        { value: "LIBREDISPO", label: "LIBRE DISPONIBILIDAD" },
    ],

    MOTIVORECHAZA: [
        { value: "DESEMPLE", label: "DESEMPLEADO" },
        { value: "FUEPERIM", label: "FUERA DE PERIMETRO" },
        { value: "NOACTVET", label: "NO APLICA POR ACTIVIDAD VETADA" },
        { value: "NOAPACVE", label: "NO APLICA RESIDE EN ZONA ROJA" },
        { value: "NOAPEDAD", label: "NO APLICA POR EDAD" },
        { value: "NO APNEZR", label: "NO APLICA NEGOCIO ZONA ROJA" },
        { value: "NOINTMON", label: "NO INTERESA MONTO" },
        { value: "NOINTPLA", label: "NO INTERESA PLAZO" },
        { value: "NONECE", label: "NO LO QUIERE NO LO NECESITA" },
        { value: "NOTASALT", label: "NO ACEPTA TASA ALTA" },
        { value: "OTRPROC", label: "SE PRECALIFICARA OTRO PRODUCTO" },
        { value: "PENRESPT", label: "PENDIENTE RESPUESTA DEFINITIVA" },
        { value: "PROCINF", label: "PROCESO LEVANTADO DE INFORMACION" }
    ],
    FormasDesembolso: [
        { value: "NOTACRED", label: "CR??DITO A CUENTA" },
        { value: "EFECENTR", label: "EFECTIVO" },
        { value: "CHEQGER", label: "CHEQUE GERENCIA" },
        { value: "MIXTO", label: "MIXTO" }
    ],

    TipoTabla: [
        { value: "CUOTAFIJA", label: "CUOTA FIJA", },
        { value: "GRADIENTE", label: "GRADIENTE", },
        { value: "CUOTON", label: "CUOTON", }
    ],

    TipoVivienda: [
        { value: "P", label: "Propia hipotecada" },
        { value: "N", label: "Propia" },
        { value: "A", label: "Arrendada" },
        { value: "S", label: "Prestada" },
        { value: "F", label: "Vive con familiares" }
    ],


    TIPOGARANTIAZ: [
        { value: "SINGARANTIA", label: "SINGARANTIA" },
        { value: "AVAL", label: "AVAL" },
        { value: "HIPOTECARIA", label: "HIPOTECARIA" },
        { value: "PRENDARIA", label: "PRENDARIA" },
        { value: "MIXTA", label: "MIXTA" },
        { value: "FIDUCIARIA", label: "FIDUCIARIA" },
    ],

    FuenteIngreso: [
        { label: "SALARIO", value: "SAL" },
        { label: "VENTAS", value: "VEN" },
        { label: "RENTAS", value: "REN" }
    ],

    OrigenIngreso: [
        { idServ: '187', value: "ORIGEN1", parent: "SAL", label: "SALARIO" },
        { idServ: '190', value: "ORIGEN3", parent: "VEN", label: "INDEPENDIENTE" },
        { idServ: '192', value: "ORIGEN5", parent: "REN", label: "REMESAS" },
        { idServ: '193', value: "ORIGEN6", parent: "REN", label: "JUBILADO" }
    ],

    SubtipoOrigenIngreso: [
        { parent: "ORIGEN6", value: "JUBILADO", label: "JUBILADO" },
        { parent: "ORIGEN5", value: "REMESAS", label: "REMESAS" },
        { parent: "ORIGEN1", value: "ASALARIADO", label: "ASALARIADO" },
        { parent: "ORIGEN1", value: "PROFESIONAL", label: "PROFESIONAL" },
        { parent: "ORIGEN3", value: "AMBULANTE", label: "AMBULANTE" },
        //{ parent: "ORIGEN3", value: "PROFESIONAL", label: "PROFESIONAL" },
        { parent: "ORIGEN3", value: "OFICIOMENOR", label: "OFICIO MENOR" },
        { parent: "ORIGEN3", value: "COMERCIO", label: "COMERCIO" },
        { parent: "ORIGEN3", value: "GANADERO", label: "GANADERO" },
        { parent: "ORIGEN3", value: "PRODUCCION", label: "PRODUCCION" },
        { parent: "ORIGEN3", value: "SERVICIO", label: "SERVICIO" },
    ],

    Genero: [
        { value: 'M', label: 'MASCULINO' },
        { value: 'F', label: 'FEMENINO' }
    ],
    Nacionalidad: [
        { value: 'ADS', label: 'ANDORRA' },
        { value: 'AES', label: 'EMIRATOS ARABES UNIDOS' },
        { value: 'AFS', label: 'AFGANISTAN' },
        { value: 'AGS', label: 'ANTIGUA' },
        { value: 'AIS', label: 'AFARES Y LOS ISSAS' },
        { value: 'ALS', label: 'ALBANIA' },
        { value: 'AMS', label: 'ARMENIA' },
        { value: 'ANS', label: 'ANTILLAS NEERLANDESAS' },
        { value: 'AOS', label: 'ANGOLA' },
        { value: 'ARP', label: 'ARGENTINA' },
        { value: 'ASS', label: 'SAMOA AMERICANA' },
        { value: 'ATS', label: 'AUSTRIA' },
        { value: 'AUD', label: 'AUSTRALIA' },
        { value: 'BAS', label: 'BOSNIA-HERCEGOVINA' },
        { value: 'BBD', label: 'BARBADOS' },
        { value: 'BEF', label: 'BELGICA' },
        { value: 'BFS', label: 'BURQUINA FASO' },
        { value: 'BGS', label: 'BULGARIA' },
        { value: 'BHS', label: 'BAHREIN' },
        { value: 'BIS', label: 'BURUNDI' },
        { value: 'BLS', label: 'RSS DE BIOLORRUSIA' },
        { value: 'BMS', label: 'BERMUDAS' },
        { value: 'BNS', label: 'BRUNEI' },
        { value: 'BOP', label: 'BOLIVIA' },
        { value: 'BRC', label: 'BRASIL' },
        { value: 'BSD', label: 'BAHAMAS' },
        { value: 'BTS', label: 'BUTAN' },
        { value: 'BUS', label: 'BURMA' },
        { value: 'BWS', label: 'BOTSWANA' },
        { value: 'BZS', label: 'BELICE' },
        { value: 'CAD', label: 'CANADA' },
        { value: 'CCS', label: 'ISLAS COCOS' },
        { value: 'CFS', label: 'REPUBLICA CENTROAFRICANA' },
        { value: 'CHF', label: 'SUIZA' },
        { value: 'CIS', label: 'COSTA DE MARFIL' },
        { value: 'CKS', label: 'ISLAS COOK' },
        { value: 'CLP', label: 'CHILE' },
        { value: 'CMS', label: 'CAMERUN' },
        { value: 'CNY', label: 'CHINA' },
        { value: 'COP', label: 'COLOMBIA' },
        { value: 'CRC', label: 'COSTA RICA' },
        { value: 'CSS', label: 'CHECOSLOVAQUIA' },
        { value: 'CUP', label: 'CUBA' },
        { value: 'CVS', label: 'CABO VERDE' },
        { value: 'CXS', label: 'ISLA DE PASCUA' },
        { value: 'CYK', label: 'ISLAS CANTON Y ENDERBURY' },
        { value: 'CYS', label: 'CHIPRE' },
        { value: 'DBS', label: 'BANGADESH' },
        { value: 'DEM', label: 'ALEMANIA' },
        { value: 'DKK', label: 'DINAMARCA' },
        { value: 'DOP', label: 'REPUBLICA DOMINICANA' },
        { value: 'DYS', label: 'DAHOMEY' },
        { value: 'DZS', label: 'ARGELIA' },
        { value: 'ECS', label: 'ECUADOR' },
        { value: 'EGS', label: 'EGIPTO' },
        { value: 'EHS', label: 'SAHARA OCCIDENTAL' },
        { value: 'ELS', label: 'ESLOVAQUIA' },
        { value: 'ESP', label: 'ESPA??A' },
        { value: 'ETS', label: 'ETIOPIA' },
        { value: 'EVS', label: 'ESLOVENIA' },
        { value: 'FIM', label: 'FINLADIA' },
        { value: 'FJS', label: 'FIJI' },
        { value: 'FKS', label: 'ISLAS MALVINAS' },
        { value: 'FOS', label: 'ISLAS FEROE' },
        { value: 'FRF', label: 'FRANCIA' },
        { value: 'GAS', label: 'GABON' },
        { value: 'GBR', label: 'REINO UNIDO' },
        { value: 'GDS', label: 'GRANADA' },
        { value: 'IGE', label: 'ISLAS GILBERT ELLICE' },
        { value: 'GFS', label: 'GUAYANA FRANCESA' },
        { value: 'GHS', label: 'GHANA' },
        { value: 'GIS', label: 'GIBRALTAR' },
        { value: 'GLS', label: 'GROENLANDIA' },
        { value: 'GNS', label: 'GINEA' },
        { value: 'GDP', label: 'GUADALUPE' },
        { value: 'GQS', label: 'GINEA ECUATORIAL' },
        { value: 'GRS', label: 'GRECIA' },
        { value: 'GTO', label: 'GUATEMALA' },
        { value: 'GUS', label: 'GUAM' },
        { value: 'GWS', label: 'GINEA BISSAU' },
        { value: 'GYS', label: 'GUYANA' },
        { value: 'HKS', label: 'HONG KONG' },
        { value: 'HMS', label: 'ISLAS HEARD Y MCDONALD' },
        { value: 'HNL', label: 'HONDURAS' },
        { value: 'HRS', label: 'CROACIA' },
        { value: 'HTG', label: 'HAITI' },
        { value: 'HUS', label: 'HUNGRIA' },
        { value: 'IDS', label: 'INDONESIA' },
        { value: 'IES', label: 'IRLANDA' },
        { value: 'ILS', label: 'ISRAEL' },
        { value: 'INR', label: 'INDIA' },
        { value: 'IQS', label: 'IRAQ' },
        { value: 'IRR', label: 'IRAN' },
        { value: 'ISS', label: 'ISLANDIA' },
        { value: 'ITL', label: 'ITALIA' },
        { value: 'JMS', label: 'JAMAICA' },
        { value: 'JOD', label: 'JORDANIA' },
        { value: 'JPY', label: 'JAPON' },
        { value: 'JTS', label: 'ISLA JOHNSTON' },
        { value: 'KES', label: 'KENIA' },
        { value: 'KHS', label: 'KAMPUCHEA DEMOCRATICA' },
        { value: 'KMS', label: 'CAMORAS' },
        { value: 'KNS', label: 'SAN CRISTOBAL Y NEVIS' },
        { value: 'KPS', label: 'COREA REP. DECRATICA POPULAR' },
        { value: 'KRS', label: 'COREA' },
        { value: 'KWS', label: 'KUWAIT' },
        { value: 'KYS', label: 'ISLAS CAIMAN' },
        { value: 'KZS', label: 'KAZAJST??N' },
        { value: 'LAS', label: 'LAOS' },
        { value: 'LBP', label: 'LIBANO' },
        { value: 'LCS', label: 'SANTA LUCIA' },
        { value: 'LHF', label: 'LIECHTENSTEIN' },
        { value: 'LKS', label: 'SRI LANKA' },
        { value: 'LRS', label: 'LIBERIA' },
        { value: 'LSS', label: 'LESOTHO' },
        { value: 'LTU', label: 'LITUANIA' },
        { value: 'LUF', label: 'LUXEMBURGO' },
        { value: 'LYS', label: 'LIBIA' },
        { value: 'MAS', label: 'MARRUECOS' },
        { value: 'MCS', label: 'MONACO' },
        { value: 'MGS', label: 'MADAGASCAR' },
        { value: 'MIS', label: 'ISLAS MIDWAY' },
        { value: 'MKS', label: 'MACEDONIA' },
        { value: 'MLS', label: 'MALI' },
        { value: 'MNS', label: 'MONGOLIA' },
        { value: 'MOS', label: 'MACAO' },
        { value: 'MQS', label: 'MARTINICA' },
        { value: 'MRS', label: 'MAURITANIA' },
        { value: 'MSS', label: 'MONTSERRAT' },
        { value: 'MTS', label: 'MALTA' },
        { value: 'MUS', label: 'MAURICIO' },
        { value: 'MVS', label: 'MALDIVAS' },
        { value: 'MWS', label: 'MALAWI' },
        { value: 'MXP', label: 'MEXICO' },
        { value: 'MYS', label: 'MALASIA' },
        { value: 'MZS', label: 'MOZAMBIQUE' },
        { value: 'NAS', label: 'NAMIBIA' },
        { value: 'NCS', label: 'NUEVA CALEDONIA' },
        { value: 'NES', label: 'NIGER' },
        { value: 'NGS', label: 'NIGERIA' },
        { value: 'NHS', label: 'NUEVAS H??BRIDAS' },
        { value: 'NIC', label: 'NICARAGUA' },
        { value: 'NKS', label: 'ISLA NORFOLF' },
        { value: 'NLG', label: 'PAISES BAJOS' },
        { value: 'NOK', label: 'NORUEGA' },
        { value: 'NPS', label: 'NEPAL' },
        { value: 'NRS', label: 'NAURU' },
        { value: 'NUS', label: 'ISLA NIUE' },
        { value: 'NZS', label: 'NUEVA ZELANDIA' },
        { value: 'OIN', label: 'ORGANISMO INTERNACIONAL' },
        { value: 'OMS', label: 'OMAN' },
        { value: 'PAB', label: 'PANAMA' },
        { value: 'PCS', label: 'ISLAS DEL PACIFICO' },
        { value: 'PES', label: 'PERU' },
        { value: 'PFS', label: 'POLINESIA FRANCESA' },
        { value: 'PGS', label: 'PAPUA NUEVA GUINEA' },
        { value: 'PHS', label: 'FILIPINAS' },
        { value: 'PKS', label: 'PAKISTAN' },
        { value: 'PLS', label: 'POLONIA' },
        { value: 'PMS', label: 'S. PEDRO Y MIGELON' },
        { value: 'PNS', label: 'ISLAS PITCAIRN' },
        { value: 'PRS', label: 'PUERTO RICO' },
        { value: 'PTE', label: 'POTUGAL' },
        { value: 'PUS', label: 'ISLAS DEL PACIFICO (EE.UU)' },
        { value: 'PYG', label: 'PARAGUAY' },
        { value: 'QAS', label: 'QATAR' },
        { value: 'RES', label: 'REUNION' },
        { value: 'RHS', label: 'RHODESIA DEL SUR' },
        { value: 'ROS', label: 'RUMANIA' },
        { value: 'RSS', label: 'RUSIA' },
        { value: 'RWS', label: 'RWANDA' },
        { value: 'SAS', label: 'ARABIA SAUDITA' },
        { value: 'SBS', label: 'ISLAS SOLOMON BRITANICAS' },
        { value: 'SCS', label: 'SEYCHELLES' },
        { value: 'SDS', label: 'SUDAN' },
        { value: 'SEK', label: 'SUECIA' },
        { value: 'SGS', label: 'SINGAPUR' },
        { value: 'SJS', label: 'ISLAS SVALBART Y JAN MAYEN' },
        { value: 'SKS', label: 'SIKKIM' },
        { value: 'SLS', label: 'SIERRA LEONA' },
        { value: 'SMS', label: 'SAN MARINO' },
        { value: 'SNS', label: 'SENEGAL' },
        { value: 'SOS', label: 'SOMALIA' },
        { value: 'SRS', label: 'SURINAME' },
        { value: 'STS', label: 'SANTO TOM?? Y PRINCIPE' },
        { value: 'SVC', label: 'EL SALVADOR' },
        { value: 'SYP', label: 'SIRIA' },
        { value: 'SZS', label: 'SWAZILANDIA' },
        { value: 'TCS', label: 'ISLAS TURCAS Y CAICOS' },
        { value: 'TDS', label: 'CHAD' },
        { value: 'TGS', label: 'TOGO' },
        { value: 'THS', label: 'TAILANDIA' },
        { value: 'TKS', label: 'ISLAS TOKELAU' },
        { value: 'TNS', label: 'TUNEZ' },
        { value: 'TOS', label: 'TONGA' },
        { value: 'TRS', label: 'TURQUIA' },
        { value: 'TTS', label: 'TRINIDAD Y TABAGO' },
        { value: 'TWS', label: 'TAIWAN' },
        { value: 'TZS', label: 'TANZANIA' },
        { value: 'UAS', label: 'RSS DE UCRANIA' },
        { value: 'UGS', label: 'UGANDA' },
        { value: 'USA', label: 'ESTADOS UNIDOS' },
        { value: 'UYP', label: 'URUGUAY' },
        { value: 'VAS', label: 'CIUDAD DEL VATICANO' },
        { value: 'VCS', label: 'SAN VICENTE' },
        { value: 'VEB', label: 'VENEZUELA' },
        { value: 'VGS', label: 'ISLAS VIRGENES BRITANICAS' },
        { value: 'VNS', label: 'VIETNAM' },
        { value: 'VTS', label: 'VANUATU' },
        { value: 'WFS', label: 'ISLAS WALLIS FUTUNA' },
        { value: 'WKS', label: 'ISLA WAKE' },
        { value: 'WSS', label: 'SAMOA OCCIDENTAL' },
        { value: 'XCD', label: 'DOMINICA' },
        { value: 'YDS', label: 'YEMEN DEMOCRATICO' },
        { value: 'YES', label: 'YEMEN' },
        { value: 'YUD', label: 'YUGOSLAVIA' },
        { value: 'ZAS', label: 'SUD??FRICA' },
        { value: 'ZMS', label: 'ZAMBIA' },
        { value: 'ZRS', label: 'ZAIRE' },
        { value: 'ZWE', label: 'ZIMBABWE' }
    ],
    TipoNacionalidad: [
        { value: 'NEXTR', label: 'EXTRANJERA' },
        //{ value: 'NECUA', label: 'ECUATORIANA' },
        { value: 'NEXTRR', label: 'EXTRANJERA RESIDENTE' },
        { value: 'NGT', label: 'GUATEMALA' }
    ],
    EstadoCivil: [
        { value: 'ESTCIVC', label: 'CASADO' },
        { value: 'ESTCIVD', label: 'DIVORCIADO' },
        { value: 'ESTCIVS', label: 'SOLTERO' },
        { value: 'ESTCIVU', label: 'UNI??N LIBRE' },
        { value: 'ESTCIVV', label: 'VIUDO' }
    ],
    Cargo: [
        { value: 'CARGADM', label: 'ADMINISTRATIVO' },
        { value: 'CARGOPER', label: 'OPERARIO' },
        { value: 'CARGOBRE', label: 'OBRERO' },
        { value: 'CARGEJEC', label: 'EJECUTIVO' },
        { value: 'CARGMMED', label: 'MANDO MEDIO' },
        { value: 'CARGGTE', label: 'GERENTE' },
        { value: 'CARGPRP', label: 'PROPIETARIO' },
        { value: 'CARGSUPV', label: 'SUPERVISOR' },
        { value: 'CARGVEND', label: 'VENDEDOR' }
    ],
    TipoContrato: [
        { value: 'CONTPLAFJO', label: 'PLAZO FIJO' },
        { value: 'CONTINDEF', label: 'INDEFINIDO' }
    ],
    TipoSueldo: [
        { value: 'SUELFIJO', label: 'FIJO' },
        { value: 'SUELVAR', label: 'VARIABLE' }
    ],
    FormaPago: [
        { value: 'FPAGOSEM', label: 'SEMANAL' },
        { value: 'FPAGO2SEM', label: '2 SEMANAS' },
        { value: 'FPAGOQUIN', label: 'QUINCENAL' },
        { value: 'FPAGO28D', label: 'CADA 28 D??AS' },
        { value: 'FPAGO30D', label: 'MENSUAL' },
        { value: 'FPAGO60D', label: 'BIMENSUAL' },
        { value: 'FPAGO90D', label: 'TRIMESTRAL' },
        { value: 'FPAGO120D', label: 'CUATRIMESTRAL' },
        { value: 'FPAGO180D', label: 'SEMESTRAL' },
        { value: 'FPAGO360D', label: 'ANUAL' },
        { value: 'FPAGOVENCI', label: 'AL VENCIMIENTO' }
    ],
    Ocupacion: [
        { value: "OCUPAMADE ", label: "AMA DE CASA" },
        { value: "OCUPASEO C", label: "ASESOR O CONSULTOR" },
        { value: "OCUPCOMIND", label: "COMERCIANTE INDIVIDUAL " },
        { value: "OCUPCOMINDFER", label: "COMERCIANTE INDIVIDUAL - FERRETERIA" },
        { value: "OCUPCOMINDVENVEH", label: "COMERCIANTE INDIVIDUAL - VENTA VEHICULOS" },
        { value: "OCUPCOMINDTIE", label: "COMERCIANTE INDIVIDUAL - TIENDA/ABARROTER??A/DEPOSITO" },
        { value: "OCUPCOMINDAUTHOT", label: "COMERCIANTE INDIVIDUAL - AUTO HOTEL/MOTEL" },
        { value: "OCUPCOMINDRESVEN", label: "COMERCIANTE INDIVIDUAL -  RESTAURANTE/VENTA DE COMIDA" },
        { value: "OCUPCOMINDACE", label: "COMERCIANTE INIDIVIDUAL - ACEITERA" },
        { value: "OCUPCOMINDTALLER", label: "COMERCIANTE INDIVIDUAL - TALLER" },
        { value: "OCUPCOMINDPROMIN", label: "COMERCIANTE INDIVIDUAL - PROMOCI??N INMOBILIARIA" },
        { value: "OCUPCOMINDAGE", label: "COMERCIANTE INDIVIDUAL - AGENCIA DE VIAJES" },
        { value: "OCUPCOMINDZAP", label: "COMERCIANTE INDIVIDUAL - ZAPATERIA" },
        { value: "OCUPCOMINDVENTRO", label: "COMERCIANTE INDIVIDUAL - VENTA DE ROPA" },
        { value: "OCUPCOMINDMIS", label: "COMERCIANTE INDIVIDUAL - MISCELANEA/VARIEDADES" },
        { value: "OCUPCOMINDVENELE", label: "COMERCIANTE INDIVIDUAL - VENTA ELECTRODOM??STICOS" },
        { value: "OCUPCOMINDVENREP", label: "COMERCIANTE INDIVIDUAL - VENTA REPUESTOS" },
        { value: "OCUPCOMINDCOL", label: "COMERCIANTE INDIVIDUAL - COLEGIOS/ACADEMIAS" },
        { value: "OCUPCOMINDPAN", label: "COMERCIANTE INDIVIDUAL - PANADERIA" },
        { value: "OCUPCOMINDCAR", label: "COMERCIANTE INDIVIDUAL - CARNICERIA" },
        { value: "OCUPCOMINDTRA", label: "COMERCIANTE INDIVIDUAL - TRANSPORTE" },
        { value: "OCUPCOMINDLIB", label: "COMERCIANTE INDIVIDUAL - LIBRERIA" },
        { value: "OCUPCOMINDFAR", label: "COMERCIANTE INDIVIDUAL - FARMACIA/VENTA DE MEDICINA" },
        { value: "OCUPCOMINDDIS", label: "COMERCIANTE INDIVIDUAL - DISTRIBUIDORA" },
        { value: "OCUPCOMINDCON", label: "COMERCIANTE INDIVIDUAL - CONFECCIONES/SASTRERIA" },
        { value: "OCUPCOMINDCAP", label: "COMERCIANTE INDIVIDUAL - CARPINTERIA/VENTA MADERA" },
        { value: "OCUPCOMINDDEP", label: "COMERCIANTE INDIVIDUAL - DEPOSITO/VENTA GRANOS" },
        { value: "OCUPCOMINDVENVER", label: "COMERCIANTE INDIVIDUAL - VENTA VERDURAS Y FRUTAS" },
        { value: "OCUPCOMINDTOR", label: "COMERCIANTE INDIVIDUAL - TORTILLERIA" },
        { value: "OCUPDIP", label: "DIPLOMATICO" },
        { value: "OCUPEMPPRI", label: "EMPLEADO PRIVADO" },
        { value: "OCUPEMPPUB", label: "EMPLEADO PUBLICO" },
        { value: "OCUPFUNPRI", label: "FUNCIONARIO PRIVADO" },
        { value: "OCUPFUNPUB", label: "FUNCIONARIO PUBLICO" },
        { value: "OCUPJUB", label: "JUBILADO" },
        { value: "OCUNIN", label: "NINGUNA" },
        { value: "OCUPPROIND", label: "PROFESIONAL INDEPENDIENTE" },
        { value: "OCUPMIG", label: "MIGRACION" }
    ],
    Profesion: [
        { value: "PROABOY N", label: "ABOGADO Y NOTARIO" },
        { value: "PROADMDE ", label: "ADMINISTRADOR DE EMPRESAS" },
        { value: "PROAGEDE ", label: "AGENTE DE SEGURIDAD" },
        { value: "PROAGR", label: "AGRICULTOR" },
        { value: "PROAGO", label: "AGRONOMO" },
        { value: "PROALB", label: "ALBA??IL" },
        { value: "PROARQ", label: "ARQUEOLOGO" },
        { value: "PROARG", label: "ARQUITECTO" },
        { value: "PROART", label: "ARTESANO " },
        { value: "PROARI", label: "ARTISTA" },
        { value: "PROBAC", label: "BACHILLER" },
        { value: "PROBAR", label: "BARBERO" },
        { value: "PROBIO", label: "BIOLOGO" },
        { value: "PROBIQ", label: "BIOQUIMICO" },
        { value: "PROCAJ", label: "CAJERO" },
        { value: "PROCAR", label: "CARNICERO" },
        { value: "PROCAP", label: "CARPINTERO" },
        { value: "PROCER", label: "CERRAJERO " },
        { value: "PROCHE", label: "CHEF" },
        { value: "PROCOLDE ", label: "COLECCIONISTA DE ARTE O ANTIGUEDADES" },
        { value: "PROCONPUB", label: "CONTADOR PUBLICO Y/O AUDITOR" },
        { value: "PROCOS", label: "COSMETOLOGO" },
        { value: "PRODEC", label: "DECORADOR" },
        { value: "PRODEN", label: "DENTISTA" },
        { value: "PRODEPPRO", label: "DEPORTISTA PROFESIONAL " },
        { value: "PRODIR", label: "DIRECTOR" },
        { value: "PRODIS", label: "DISE??ADOR " },
        { value: "PRODOC", label: "DOCTOR" },
        { value: "PROECO", label: "ECONOMISTA" },
        { value: "PROELE", label: "ELECTRICISTA " },
        { value: "PROENF", label: "ENFERMERO" },
        { value: "PROESC", label: "ESCRITOR" },
        { value: "PROEST", label: "ESTUDIANTE" },
        { value: "PROFAR", label: "FARMACEUTICO" },
        { value: "PROFOT", label: "FOTOGRAFO " },
        { value: "PROGAN", label: "GANADERO" },
        { value: "PROIMPY/O", label: "IMPORTADOR Y/O EXPORTADOR" },
        { value: "PROIND", label: "INDUSTRIAL " },
        { value: "PROING", label: "INGENIERO" },
        { value: "PROINTO T", label: "INTERPRETE O TRADUCTOR" },
        { value: "PROJOY", label: "JOYERO" },
        { value: "PROLIC", label: "LICENCIADO" },
        { value: "PROLOC", label: "LOCUTOR " },
        { value: "PROMAE", label: "MAESTRO" },
        { value: "PROMEC", label: "MECANICO" },
        { value: "PROMIL", label: "MILITAR" },
        { value: "PROMEN", label: "MENSAJERO" },
        { value: "PROCOMIN", label: "COMERCIANTE INDIVIDUAL" },

        { value: "PROJUBI", label: "JUBILADO" },
        { value: "PROAMCASA", label: "AMA DE CASA" },

        { value: "PROMINREL", label: "MINISTRO RELIGIOSO" },
        { value: "PROMUS", label: "MUSICO" },
        { value: "PRONIN", label: "NINGUNA" },
        { value: "PRONUT", label: "NUTRICIONISTA" },
        { value: "PROPAN", label: "PANADERO" },
        { value: "PROPER", label: "PERIODISTA" },
        { value: "PROPERCON", label: "PERITO CONTADOR" },
        { value: "PROPIL", label: "PILOTO " },
        { value: "PROPIN", label: "PINTOR" },
        { value: "PROPLO", label: "PLOMERO" },
        { value: "PROPOL", label: "POLICIA " },
        { value: "PROPRO", label: "PROFESOR" },
        { value: "PROPSI", label: "PSICOLOGO" },
        { value: "PROPUB", label: "PUBLICISTA" },
        { value: "PRORELPUB", label: "RELACIONISTA PUBLICO" },
        { value: "PROSAS", label: "SASTRE" },
        { value: "PROSEC", label: "SECRETARIA" },
        { value: "PROSOC", label: "SOCIOLOGO" },
        { value: "PROTEC", label: "TECNICO" },
        { value: "PROTEO", label: "TEOLOGO" },
        { value: "PROVEN", label: "VENDEDOR" },
        { value: "PROVET", label: "VETERINARIO" },
        { value: "PROZAP", label: "ZAPATERO" },
        { value: "PROMIG", label: "MIGRACION" },
        { value: "N", label: "Ninguno" }
    ],
    Cargo: [
        { value: "CARGCOBR", label: "COBRADOR" }
    ],
    ProfesionOficio: [
        { value: "Albanil-Obrero", label: "Albanil-Obrero" },
        { value: "Carpintero", label: "Carpintero" },
        { value: "ChoferTransport", label: "Chofer Transporte Publico" },
        { value: "Cocinero-ayudant", label: "Cocinero-ayudante de cocina" },
        { value: "Costureros", label: "Costureros" },
        { value: "Due??odeTranspo", label: "Due??o de Transporte Publico" },
        { value: "Electricista", label: "Electricista" },
        { value: "EmpleadaDomesti", label: "Empleada Domestica" },
        { value: "Enfermerasadom", label: "Enfermeras a domicilio" },
        { value: "Gasfitero", label: "Gasfitero" },
        { value: "Jardinero", label: "Jardinero" },
        { value: "LavadoresdeCar", label: "Lavadores de Carro" },
        { value: "Maestrodeobra", label: "Maestro de obra" },
        { value: "Maestropanadero", label: "Maestro panadero" },
        { value: "Mecanico", label: "Mec??nico" },
        { value: "MeserodeRestau", label: "Mesero de Restaurante" },
        { value: "Pension-Alquiler", label: "Pensi??n-Alquiler Cuartos" },
        { value: "PeonesAgricultu", label: "Peones Agricultura" },
        { value: "Pintor", label: "Pintor" },
        { value: "Planchador", label: "Planchador" },
        { value: "Taxista-Chofer", label: "Taxista-Chofer" },
        { value: "Taxista-Due??ode", label: "Taxista-Due??o de unidad" },
        { value: "Vendedorindepen", label: "Vendedor independiente" },
        { value: "Otros", label: "Otros" }
    ],
    SegmentoCliente: [
        { value: "CLIENTE", label: "CLIENTE" },
        { value: "NOCLIENTE", label: "NO CLIENTE" },
        { value: "CLIENTETIENDA", label: "CLIENTE TIENDA" },
        { value: "NOAPLICA", label: "NO APLICA" }
    ],



    TipoContrato: [
        { value: "FACTSERV", label: "FACTURACION POR SERVICIOS" },
        { value: "TEMPORAL", label: "TEMPORAL" }
    ],
    FuenteInfoAsalariado: [
        { value: "FIAD", label: "DOCUMENTO" },
        { value: "FIAND", label: "NO DEFINIDO" },
        { value: "FIAP", label: "PRESUNTO" },
        { value: "FINP", label: "PERITAJE" },
        { value: "FIND", label: "DOCUMENTO" },
        { value: "FINPR", label: "PRESUNTO" }
    ],
    NivelInstruccionCli: [
        { value: "N", label: "SIN ESTUDIOS" },
        { value: "P", label: "PRIMARIA" },
        { value: "S", label: "SECUNDARIA" },
        { value: "T", label: "FORMACION INTERMEDIA" },
        { value: "U", label: "UNIVERSIDAD" },
        { value: "G", label: "POSTGRADO" },
        //{ value: "D", label: "DIVERSIFICADO" },
    ],
    Sector: [
        { value: "URB", label: "Urbano" },
        { value: "RUR", label: "Rural" }
    ],
    Localidad: [
        { value: "COLMAYA", label: "Colonia Maya" }
    ],
    MotivosRechazoDomicilio: [
        { value: "RCHDOM1", label: "Cr??dito para terceros" },
        { value: "RCHDOM2", label: "Cuartos de alquiler" },
        { value: "RCHDOM3", label: "Desisti?? del cr??dito" },
        { value: "RCHDOM4", label: "Direcci??n incorrecta / faltan datos" },
        { value: "RCHDOM5", label: "Discrepancia en informaci??n" },
        { value: "RCHDOM6", label: "Fuera de per??metro" },
        { value: "RCHDOM7", label: "No accesible" },
        { value: "RCHDOM8", label: "No aplica condiciones de vivienda" },
        { value: "RCHDOM9", label: "No aplica por antig??edad" },
        { value: "RCHDOM10", label: "No atendieron" },
        { value: "RCHDOM11", label: "No dieron informaci??n / informaci??n incompleta" },
        { value: "RCHDOM12", label: "Malas Referencias en campo" },
        { value: "RCHDOM13", label: "No reside" },
        { value: "RCHDOM14", label: "No se ubico" },
        { value: "RCHDOM15", label: "Persona que atiende no presenta DPI" },
        { value: "RCHDOM16", label: "Vecinos no conocen a titular" },
        { value: "RCHDOM17", label: "Zona Vetada" },
        { value: "RCHDOM18", label: "Enfermedad cr??nica, degenerativa, terminal" },
    ],
    MotivosRechazoNegocio: [
        { value: "RCHNEG1", label: "Negocio ambulante" },
        { value: "RCHNEG2", label: "Negocio no le pertenece" },
        { value: "RCHNEG3", label: "Instalaciones no acordes al giro del negocio" },
        { value: "RCHNEG4", label: "No aplica giro de negocio" },
        { value: "RCHNEG5", label: "Titular no tiene negocio" },
        { value: "RCHNEG6", label: "No atendieron" },
        { value: "RCHNEG7", label: "No dieron informaci??n" },
        { value: "RCHNEG8", label: "No aplica por antig??edad del negocio" },
        { value: "RCHNEG9", label: "Malas Referencias en campo" },
        { value: "RCHNEG10", label: "No accesible" },
        { value: "RCHNEG11", label: "Direcci??n incorrecta / faltan datos" },
        { value: "RCHNEG12", label: "No se ubico" },
        { value: "RCHNEG13", label: "Persona que atiende no presenta DPI" },
        { value: "RCHNEG14", label: "Cr??dito para terceros" },
        { value: "RCHNEG15", label: "Desisti?? del cr??dito" },
        { value: "RCHNEG16", label: "Discrepancia en informaci??n" },
        { value: "RCHNEG17", label: "Fuera de per??metro" },
        { value: "RCHNEG18", label: "Zona Vetada" },
    ],
    MotivosRechazoEmpresa: [
        { value: "RCHEMP1", label: "Zona vetada" },
        { value: "RCHEMP2", label: "Actividad vetada" },
        { value: "RCHEMP3", label: "Antig??edad de la empresa" },
        { value: "RCHEMP4", label: "Sin patente" },
        { value: "RCHEMP5", label: "Documentaci??n adulterada" },
        { value: "RCHEMP6", label: "Sin condiciones m??nimas" },
        { value: "RCHEMP7", label: "Casa particular sin movimiento de personal" },
        { value: "RCHEMP8", label: "No mostraron documento de antig??edad" },
        { value: "RCHEMP9", label: "No cumple con la cantidad de empleados" },
        { value: "RCHEMP10", label: "No accesible" },
        { value: "RCHEMP11", label: "Direcci??n incorrecta / faltan datos" },
        { value: "RCHEMP12", label: "No se ubico" },
        { value: "RCHEMP13", label: "Discrepancia en informaci??n" },
        { value: "RCHEMP14", label: "Fuera de per??metro" },
        { value: "RCHEMP15", label: "No se confirma informaci??n de la empresa" },
        { value: "RCHEMP16", label: "Instalaciones no acordes al giro del negocio" },
        { value: "RCHEMP17", label: "Titular es propietario de empresa" },
        { value: "RCHEMP18", label: "Titular no labora" },
        { value: "RCHEMP19", label: "Validaci??n con datos incompletos" },
        { value: "RCHEMP20", label: "No aplica giro de negocio" },
    ],

    MotivosDevolucion: [
        { value: 'DEVNOATIENDE', label: 'No atendieron' },
        { value: 'DEVNOINFO', label: 'No dieron informaci??n' },
    ],

    Colors: [
        { id: 0, hex: "#FCBF49" },
        { id: 1, hex: "#96705B" },
        { id: 2, hex: "#7CA982" },
        { id: 3, hex: "#3D314A" },
        { id: 4, hex: "#305252" },
        { id: 5, hex: "#3C0000" },
        { id: 6, hex: "#1F487E" },
        { id: 7, hex: "#DDBDD5" },
    ]
}
*/
import { getUbicacionGeograficaByParent } from '../database/common/dbHandlerCatalogs';


export const getRegionFromGeoLoc1 = geoLoc1 => GLOBAL.Catalogs.RegionSegmentacion.filter(reg => reg.parent === geoLoc1);

export const getGeographicLocation2 = async geoLoc1 => {
    let res = await getUbicacionGeograficaByParent('GeographicLocation2', geoLoc1);
    return res;
}

export const getGeographicLocation3 = async geoLoc2 => {
    let res = await getUbicacionGeograficaByParent('GeographicLocation3', geoLoc2);
    return res;
}

export const getGeographicLocation4 = async geoLoc3 => {
    let res = await getUbicacionGeograficaByParent('GeographicLocation4', geoLoc3);
    return res;
}




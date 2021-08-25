import { Model, Q } from '@nozbe/watermelondb';
import { showToast } from 'odc-mobile-common';

/*
 *********************************************************************************************************
 *********************************************Catalogs TBL*************************************************
 *********************************************************************************************************
 */


const makeCatalog = (ent) =>
    database.collections.get('catalogs').prepareCreate(catalog => {
        catalog.code = ent.code;
        catalog.description = ent.description;
    })

const makeCatalogDetail = (catalog, ent) =>
    database.collections.get('catalogDetails').prepareCreate(catDet => {
        catDet.catalog.set(catalog);
        catDet.value = ent.value;
        catDet.label = ent.label;
        catDet.parent = ent.parent;
        catDet.idServ = String(ent.idServ);
    })

const generate = (catalogs) => database.action(async action => {
    let allCatalogs = [];
    let allCatalogDetails = [];
    catalogs.flatMap(cat => {
        const catalog = makeCatalog(cat);
        const catDetails = cat.catalogDetails.flatMap(catDetail => makeCatalogDetail(catalog, catDetail));
        allCatalogs.push(catalog);
        allCatalogDetails = [...allCatalogDetails, ...catDetails];
    });
    const allRecords = [...allCatalogs, ...allCatalogDetails]
    await database.batch(...allRecords)
    console.log("Guardo: " + allRecords.length)
    return allRecords.length
})

export const addCatalog = async ent => {
    try {
        if (ent) {
            let newCat = await database.action(async () => await database.collections
                .get('catalogs')
                .create(catalog => {
                    catalog.code = ent.code;
                    catalog.description = ent.description;
                }));

            await database.action(async () => {
                let insertStat = await ent.catalogDetails.map(async ent => await database.collections
                    .get('catalogDetails')
                    .create(catDet => {
                        catDet.catalog.set(newCat);
                        catDet.value = ent.value;
                        catDet.label = ent.label;
                        catDet.parent = ent.parent;
                        catDet.idServ = String(ent.idServ);
                    }));
                database.batch(...insertStat);
            });

            //newCat.catalogo = await newCat.catalogDetails.fetch();
            return newCat;
        }
    } catch (ex) {
        console.log(ex);
    }
}

export const syncCatalogs = async (catalogList) => {
    if (catalogList && catalogList.length > 0) {
        await deleteAllCatalogs();
        generate(catalogList);
        putLocalCatalogsInMemory();
    }
}


export const putLocalCatalogsInMemory = async () => {
    this.GLOBAL.Catalogs = {};
    this.GLOBAL.geographicLocation = {};
    let tmpCatalogsNoFilter = await getAllCatalogs();

    if (tmpCatalogsNoFilter) {
        let tmpCatalogs = tmpCatalogsNoFilter.filter(cat => !cat.code.includes('Geographic'))

        tmpCatalogs.map(async tmpCatalog => {
            this.GLOBAL.Catalogs[tmpCatalog.code] = await tmpCatalog.catalogDetails.fetch();
        });

        let geoLocations = tmpCatalogsNoFilter.filter(cat => cat.code == 'GeographicLocation1');

        geoLocations.map(async tmpgeo => {
            this.GLOBAL.geographicLocation[tmpgeo.code] = await tmpgeo.catalogDetails.fetch();
        });
    }
}

export const getUbicacionGeograficaByParent = async (parent, parentCode) =>
    await database.collections
        .get('catalogs')
        .query(Q.where('code', parent))
        .fetch()
        .then(async res =>
            await res[0].catalogDetails.extend(Q.where('parent', parentCode)).fetch()
        )

export const getUbicacionGeografica = async (parent, code) =>
    await database.collections
        .get('catalogs')
        .query(Q.where('code', parent))
        .fetch()
        .then(async res => {
            let resDetail = await res[0].catalogDetails.extend(Q.where('value', code)).fetch()
            return resDetail.length > 0 ? resDetail[0] : {};
        })


export const getAllCatalogDetails = async () => await database.action(async () => await database.collections
    .get('catalogDetails').query().fetch());

export const getAllCatalogs = async () => await database.action(async () => await database.collections
    .get('catalogs').query().fetch());


export const getCatalogByCode = async code =>
    await database.collections
        .get('catalogs')
        .query(Q.where('code', code))
        .fetch()
        .then(async res => {
            return res[0];
        })
        .catch(err => { });

export const getCatalogDetailByCatalogCode = async code =>
    await database.collections
        .get('catalogs')
        .query(Q.where('code', code))
        .fetch()
        .then(async res => {
            if (res[0])
                return await res[0].catalogDetails.fetch();

            return [];
        })
        .catch(err => { });

export const deleteCatalog = async code => {
    await database.action(async () => {
        const catalog = await getCatalogByCode(code);
        if (catalog) {
            console.log("toDelete", catalog)
            await catalog.markAsDeleted();
            await catalog.destroyPermanently();
        }
        return true;
    });
}

export const deleteAllCatalogs = async () => {
    let catalogCodes = await database.action(async () => await database.collections.get('catalogs').
        query().fetch()).then(cats => cats.map(cat => cat.code))
    await database.action(async () => {
        let catsToDel = await database.collections
            .get('catalogs')
            .query(Q.where('code', Q.oneOf(catalogCodes)))
            .fetch();
        catsToDel.map(ent => ent.prepareDestroyPermanently());
        database.batch(...catsToDel);
    });
    return true;
}


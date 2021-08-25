import { Model, Q } from '@nozbe/watermelondb';
import moment from 'moment';
/*
 *********************************************************************************************************
 *********************************************Params TBL*************************************************
 *********************************************************************************************************
 */

export const addParam = async ent =>
    await database.action(async () => {
        const newParam = await database.collections
            .get('parameters')
            .create(parameter => {
                parameter.code = ent.code;
                parameter.description = ent.description;
                parameter.value = String(ent.value);
                parameter.type = ent.type;
            });
        return newParam._raw;
    });

export const getAllParams = async () => {
    let getAllParams = await database.collections.get('parameters').query().fetch().then(res => res);
    this.GLOBAL.AppParams = getAllParams;
    return getAllParams;
}

export const getParamByCode = async code =>
    await database.collections
        .get('parameters')
        .query(Q.where('code', code))
        .fetch()
        .then(async res => {
            return res[0];
        })
        .catch(err => { });


export const updateParam = async (code, value, type) =>
    await database.action(async () => {
        let paramLocal = await getParamByCode(code);
        let resultupdate = await paramLocal.update(parameter => {
            parameter.value = String(value);
            parameter.type = type;
        });
        return resultupdate;
    });

export const deleteParam = async code =>
    await database.action(async () => {
        const parameter = await getParamByCode(code);
        await parameter.markAsDeleted();
        await parameter.destroyPermanently();
        return true;
    });

export const deleteAllParams = async () => {
    let paramCodes = this.GLOBAL.AppParams.map(p => p.code);
    if (paramCodes && paramCodes.length > 0)
        await database.action(async () => {
            let catsToDel = await database.collections
                .get('parameters')
                .query(Q.where('code', Q.oneOf(paramCodes)))
                .fetch();
            catsToDel.map(ent => ent.prepareDestroyPermanently());
            database.batch(...catsToDel);
        });
    this.GLOBAL.AppParams = [];
    return true;
}

export const syncParams = async (lstSrvParams) => {
    if (lstSrvParams && lstSrvParams.length > 0) {
        await deleteAllParams();
        await addParams(lstSrvParams);
        await getAllParams();
    }
}

export const syncSingleParam = async (srvParam) => {
    let paramLocal = await getParamByCode(srvParam.code);
    if (paramLocal) {
        if ((paramLocal.value !== srvParam.value) || (paramLocal.type !== srvParam.type))
            await updateParam(srvParam.code, srvParam.value, srvParam.type);
    }
    else {
        await addParam(srvParam);
    }
}

export const addParams = async (lstParams) => {
    await database.action(async () => {
        let insertStat = await lstParams.map(async ent => await database.collections
            .get('parameters')
            .create(parameter => {
                parameter.code = ent.code;
                parameter.description = ent.description;
                parameter.value = String(ent.value);
                parameter.type = ent.type;
            }));
        database.batch(...insertStat);
    });
    return true;
}
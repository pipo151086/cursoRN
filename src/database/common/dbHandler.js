import { Model, Q } from '@nozbe/watermelondb';
import moment from 'moment';
/*
 *********************************************************************************************************
 *********************************************Context TBL*************************************************
 *********************************************************************************************************
 */

export const addContext = async ent =>
  await database.action(async () => {
    const newContext = await database.collections
      .get('contexts')
      .create(context => {
        context.context = ent.context;
        context.lastTimeAccessed = ent.lastTimeAccessed;
      });
    return newContext._raw;
  });

export const getContext = async () =>
  await database.collections
    .get('contexts')
    .query()
    .fetch()
    .then(async res => {
      if (res.length > 0) {
        this.GLOBAL.globalSession = JSON.parse(res[0]._raw.context);
        this.GLOBAL.globalSession.lastTimeAccessed =
          res[0]._raw.lastTimeAccessed;
        return res[0];
      }
      return [];
    })
    .catch(err => { });

export const getInsertContext = async () =>
  await database.collections
    .get('contexts')
    .query()
    .fetch()
    .then(async res => {
      let defaultContext = {
        context: '{}',
        lastTimeAccessed: new Date().toString(),
      };
      if (res.length > 0) {

        let today = moment();
        let lastTimeAccessed = moment(
          res[0]._raw.lastTimeAccessed,
          'YYYY-MM-DD h:mm:ss',
          true,
        );
        let dateDiff = lastTimeAccessed.diff(today, 'days');
        
        if (dateDiff >= 0) {
          this.GLOBAL.globalSession = JSON.parse(res[0]._raw.context);
          this.GLOBAL.globalSession.lastTimeAccessed = lastTimeAccessed;
          return res[0]._raw;
        }
        return defaultContext;
      }
      return await addContext(defaultContext);
    })
    .catch(err => { });

export const updateContext = async ent =>
  await database.action(async () => {
    let contextLocal = await getContext();
    await contextLocal.update(context => {
      context.context = ent.context;
      context.lastTimeAccessed = ent.lastTimeAccessed;
    });
    this.GLOBAL.globalSession = JSON.parse(ent.context);
    this.GLOBAL.globalSession.lastTimeAccessed = ent.lastTimeAccessed;
    return true;
  });

export const deleteContext = async () =>
  await database.action(async () => {
    const context = await getContext();
    await context.markAsDeleted();
    await context.destroyPermanently();
    return true;
  });

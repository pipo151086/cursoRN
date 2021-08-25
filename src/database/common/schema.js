import { tableSchema } from '@nozbe/watermelondb';

export default [
  tableSchema({
    name: 'contexts',
    columns: [
      { name: 'context', type: 'string' },
      { name: 'lastTimeAccessed', type: 'string' },
    ],
  }),


  tableSchema({
    name: 'parameters',
    columns: [
      { name: 'code', type: 'string', isIndexed: true },
      { name: 'description', type: 'string' },
      { name: 'value', type: 'string' },
      { name: 'type', type: 'string' }
    ],
  }),

  tableSchema({
    name: 'catalogs',
    columns: [
      { name: 'code', type: 'string', isIndexed: true },
      { name: 'description', type: 'string' },
    ],
  }),

  tableSchema({
    name: 'catalogDetails',
    columns: [
      { name: 'value', type: 'string', isIndexed: true },
      { name: 'label', type: 'string' },
      { name: 'parent', type: 'string'},
      { name: 'idServ', type: 'string' },
      { name: 'catalog_id', type: 'string', isIndexed: true },
    ],
  }),

];

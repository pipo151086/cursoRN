import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class CatalogDetail extends Model {
    static table = 'catalogDetails';
    static associations = {
        catalog: { type: 'belongs_to', key: 'catalog_id' },
    }

    @field('value')
    value;

    @field('label')
    label;

    @field('parent')
    parent;

    @field('idServ')
    idServ;

    @relation('catalogs', 'catalog_id') 
    catalog;
}

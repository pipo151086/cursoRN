import { Model, Q } from '@nozbe/watermelondb';
import { field, children, action, lazy } from '@nozbe/watermelondb/decorators';

export default class Catalog extends Model {
  static table = 'catalogs';
  static associations = {
    catalogDetails: { type: 'has_many', foreignKey: 'catalog_id' },
  }

  @field('code')
  code;

  @field('description')
  description;

  @children('catalogDetails')
  catalogDetails;

  @lazy catalogo = this.catalogDetails.extend(Q.notLike('%GeographicLocation%'))

  @action async addCatalogDetail(ent) {
    return await this.collections.get('catalogDetails').create(catDetail => {
      catDetail.catalog.set(this);
      catDetail.value = ent.value;
      catDetail.label = ent.label;
      catDetail.parent = ent.parent;
      catDetail.idServ = ent.idServ;
    })
  }
}

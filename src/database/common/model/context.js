import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Context extends Model {
  static table = 'contexts';
  static associations = {};

  @field('context')
  context;

  @field('lastTimeAccessed')
  lastTimeAccessed;
}

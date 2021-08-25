import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Parameter extends Model {
  static table = 'parameters';
  
  @field('code')
  code;

  @field('description')
  description;

  @field('value')
  value;

  @field('type')
  type;
}


  

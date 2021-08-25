import {appSchema, tableSchema} from '@nozbe/watermelondb';
import commonSchema from './common/schema';
import pspSchema from './prospecting/schema';


const dbVersion = 4;

export default appSchema({
	version: dbVersion,
	tables: [...commonSchema, ...pspSchema],
});

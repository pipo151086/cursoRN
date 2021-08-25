import {fetchPostService} from 'odc-mobile-common';
import settings from "../../../settings";

const configurationBaseUrl = settings.CoreBaseUrl + 'configuration/';

export const getCatalogsByCodes = async args => {
  return await fetchPostService('get', configurationBaseUrl + 'getcatalogsbycodes', args);
};

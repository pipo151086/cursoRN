import { fetchPostService } from 'odc-mobile-common';
import settings from '../../../settings';
const securityBaseUrl = settings.CoreBaseUrl + 'security/';

export const signout = async () => {
  let idInstitution = globalSession?.session.jwt.claims.institutionID;
  const body = {
    "usercode": globalSession?.session.jwt.claims.userCode
  }
  return await fetchPostService('put', securityBaseUrl + 'signout?idInstitution=' + idInstitution, body);
};

export const signin = async (args, deviceInfo, token) => {
  let catVersion = this.GLOBAL.AppParams.find(par => par.code === 'CatalogVersion');

  const body = {
    IdUser: 0,
    UserCode: args.usercode,
    Password: args.password,
    DeviceUUID: deviceInfo.uniqueId,
    NewPassword: "",
    AppCode: deviceInfo.bundleId,
    TokenPush: token,
    Manufacturer: deviceInfo.manufacturer,
    Model: deviceInfo.model,
    OSPlatform: deviceInfo.systemName,
    DeviceVersion: deviceInfo.systemVersion,
    //IMEI: "88865515887931",
    IMEI: deviceInfo.Imei,
    PhoneNumber: "555-41528",
    Carrier: deviceInfo.carrier,
    DeviceState: 0,
    CatalogVersion: catVersion ? isNaN(+catVersion?.value) ? 0 : +catVersion?.value : 0
  }

  let resSignIn = await fetchPostService('post', securityBaseUrl + 'signinmobile', body);
  debugger;
  return resSignIn;
};

export const connect = async args => {
  const body = {
    usercode: args.usercode,
    password: args.password,
    station: args.station,
    office: args.office,
    profileCode: args.profileCode,
  };
  return await fetchPostService('post', securityBaseUrl + 'connect', body);
};

export const reset = async userCode => {
  return await fetchPostService(
    'put',
    securityBaseUrl + 'reset?userCode=' + userCode,
  );
};

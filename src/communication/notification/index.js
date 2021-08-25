import settings from "../../settings";
import { fetchPostService } from 'odc-mobile-common';

const notUrl = settings.NotificationUrl + 'Notification/';

export const GetInbox = async args => {
    let docType = GLOBAL?.globalSession?.session?.docType;
    let docNumber = GLOBAL?.globalSession?.session?.docNumber;
    if (docType == undefined || docNumber == undefined) {
        docType = args.docType;
        docNumber = args.docNumber;
    }
    //let resFetch = await fetchPostService('get', notUrl + 'GetInbox', { documentType: docType, documentNumber: docNumber });
    return JSON.parse("{\"state\":true,\"data\":[{\"idPushInbox\":56,\"tittle\":\"RECORDATORIO: ROBERTO VASQUEZ\",\"message\":\"Miguel prueba pod Dorian\",\"messageDetail\":\"10:49-11:49\",\"dateTime\":\"2021-06-28T16:34:03.287\",\"jmessage\":\"{\\\"message\\\":\\\"Miguel prueba pod Dorian\\\",\\\"title\\\":\\\"RECORDATORIO: ROBERTO VASQUEZ\\\",\\\"messageDetail\\\":\\\"10:49-11:49\\\",\\\"dateTime\\\":\\\"0001-01-01T00:00:00\\\",\\\"infoData\\\":null,\\\"timeToLive\\\":0,\\\"instructions\\\":null,\\\"alert\\\":null}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ASESORVENTA\"},{\"idPushInbox\":55,\"tittle\":\"ROBERTO VASQUEZ\",\"message\":\"Miguel prueba pod Dorian\",\"messageDetail\":\"10:49-11:49\",\"dateTime\":\"2021-06-25T16:56:43.617\",\"jmessage\":\"{\\\"message\\\":\\\"Miguel prueba pod Dorian\\\",\\\"title\\\":\\\"ROBERTO VASQUEZ\\\",\\\"messageDetail\\\":\\\"10:49-11:49\\\",\\\"dateTime\\\":\\\"0001-01-01T00:00:00\\\",\\\"infoData\\\":null,\\\"timeToLive\\\":0,\\\"instructions\\\":null,\\\"alert\\\":null}\",\"isActive\":true,\"isRead\":true,\"businessTopic\":\"ASESORVENTA\"},{\"idPushInbox\":54,\"tittle\":\"RECORDATORIO: PRUEBA CUATRO\",\"message\":\"QWERTY\",\"messageDetail\":\"08:00-08:30\",\"dateTime\":\"2021-06-25T16:33:54.273\",\"jmessage\":\"{\\\"message\\\":\\\"QWERTY\\\",\\\"title\\\":\\\"RECORDATORIO: PRUEBA CUATRO\\\",\\\"messageDetail\\\":\\\"08:00-08:30\\\",\\\"dateTime\\\":\\\"0001-01-01T00:00:00\\\",\\\"infoData\\\":null,\\\"timeToLive\\\":0,\\\"instructions\\\":null,\\\"alert\\\":null}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ASESORVENTA\"},{\"idPushInbox\":53,\"tittle\":\"PRUEBA CUATRO\",\"message\":\"QWERTY\",\"messageDetail\":\"08:00-08:30\",\"dateTime\":\"2021-06-25T16:33:45.31\",\"jmessage\":\"{\\\"message\\\":\\\"QWERTY\\\",\\\"title\\\":\\\"PRUEBA CUATRO\\\",\\\"messageDetail\\\":\\\"08:00-08:30\\\",\\\"dateTime\\\":\\\"0001-01-01T00:00:00\\\",\\\"infoData\\\":null,\\\"timeToLive\\\":0,\\\"instructions\\\":null,\\\"alert\\\":null}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ASESORVENTA\"},{\"idPushInbox\":52,\"tittle\":\"Hola Titulo ANAFISICO\",\"message\":\"hola message\",\"messageDetail\":\"Hola messageDetail\",\"dateTime\":\"2021-06-25T15:33:23.977\",\"jmessage\":\"{\\\"message\\\":\\\"hola message\\\",\\\"title\\\":\\\"Hola Titulo ANAFISICO\\\",\\\"messageDetail\\\":\\\"Hola messageDetail\\\",\\\"dateTime\\\":\\\"2021-06-06T00:00:00\\\",\\\"infoData\\\":\\\"Hola infoData\\\",\\\"timeToLive\\\":1000,\\\"instructions\\\":[{\\\"order\\\":1,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0},{\\\"order\\\":0,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0}],\\\"alert\\\":\\\"\\\"}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ANAFISICO\"},{\"idPushInbox\":51,\"tittle\":\"Hola Titulo ANAFISICO\",\"message\":\"hola message\",\"messageDetail\":\"Hola messageDetail\",\"dateTime\":\"2021-06-25T15:33:16.11\",\"jmessage\":\"{\\\"message\\\":\\\"hola message\\\",\\\"title\\\":\\\"Hola Titulo ANAFISICO\\\",\\\"messageDetail\\\":\\\"Hola messageDetail\\\",\\\"dateTime\\\":\\\"2021-06-06T00:00:00\\\",\\\"infoData\\\":\\\"Hola infoData\\\",\\\"timeToLive\\\":1000,\\\"instructions\\\":[{\\\"order\\\":1,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0},{\\\"order\\\":0,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0}],\\\"alert\\\":\\\"\\\"}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ANAFISICO\"},{\"idPushInbox\":50,\"tittle\":\"Hola Titulo ANAFISICO\",\"message\":\"hola message\",\"messageDetail\":\"Hola messageDetail\",\"dateTime\":\"2021-06-25T15:32:28.54\",\"jmessage\":\"{\\\"message\\\":\\\"hola message\\\",\\\"title\\\":\\\"Hola Titulo ANAFISICO\\\",\\\"messageDetail\\\":\\\"Hola messageDetail\\\",\\\"dateTime\\\":\\\"2021-06-06T00:00:00\\\",\\\"infoData\\\":\\\"Hola infoData\\\",\\\"timeToLive\\\":1000,\\\"instructions\\\":[{\\\"order\\\":1,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0},{\\\"order\\\":0,\\\"instructionData\\\":{},\\\"aditionalData\\\":\\\"\\\",\\\"instructionType\\\":0}],\\\"alert\\\":\\\"\\\"}\",\"isActive\":true,\"isRead\":false,\"businessTopic\":\"ANAFISICO\"}],\"code\":\"00\",\"message\":\"\",\"guid\":null}");
}

export const MarkAsDeleted = async idPushInbox => {
    //let resFetch = await fetchPostService('get', notUrl + 'MarkAsDeleted', { idPushInbox: idPushInbox });
    return {
        state: true,
        data: true
    };
}

export const MarkAsRead = async idPushInbox => {
    //let resFetch = await fetchPostService('get', notUrl + 'MarkAsRead', { idPushInbox: idPushInbox });
    return {
        state: true,
        data: true
    };
}
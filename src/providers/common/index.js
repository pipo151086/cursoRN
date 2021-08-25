import React, { createContext, useState } from 'react';
import PushNotification from 'react-native-push-notification';
import settings from '../../settings';
import EjecuteInstruction from '../../utils/pushActionInstruction'
export const AppContext = createContext({});
export const { AppConsumer } = AppContext;
import moment from 'moment';

export const AppProvider = ({ children }) => {
  const initialSession = {
    session: {},
  };
  const [validSession, setValidSession] = useState(false);
  const [globalSession, setGlobalSession] = useState(initialSession);
  const [profileTransactions, setProfileTransactions] = useState();
  const [token, setToken] = useState();
  const [notification, setNotification] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState();
  const [initialView, setInitialView] = useState(undefined);
  const [notifCont, setNotifCont] = useState(0);
  const [notifInbox, setNotifInbox] = useState([]);

  const changeInitialView = (profileCode) => {
    let initView = 'NotifInbox';
    setInitialView(initView);
    return initView;
  }
  /*PushNotification.popInitialNotification((notification) => {
    if (validSession)
      EjecuteInstruction(newNotification.data);
    });*/

  PushNotification.configure({
    onRegister: newToken => {
      if (!token) setToken(newToken.token);
      console.log(newToken.token);
    },
    onNotification: newNotification => {
      const { foreground } = newNotification;
      if (foreground) { //true = Usuario tiene la app abierta  ||| false = usuario tenia la app en segundo plano
        global.props.displayAlert(
          newNotification.title,
          newNotification.message,
          undefined,
          () => {
            if (validSession)
              EjecuteInstruction(newNotification.data);
          },
          'info'//'question',//'info'
        );
      }
      else {
        if (validSession)
          EjecuteInstruction(newNotification.data);
        else
          global.props.displayAlert(
            "Suite de Créditos",
            "Necesitas una sesión válida para ver este mensaje",
            undefined,
            undefined,
            'info'//'question',//'info'
          );
      }
      //if (!newNotification.collapse_key) setNotification(newNotification);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
      // process the action
    },
    senderID: settings.senderID,
    popInitialNotification: true,
    requestPermissions: true,
  });

  const clearNotifications = () => {
    setNotification();
  };

  const setNotifInboxFull = inboxArr => {
    if (inboxArr.length > 0) {
      let today = moment().startOf('day');
      let notifAgrupadas = [];
      let hoy = []
      let antiguas = [];
      inboxArr.map(not => {
        let resultDif = moment(not.dateTime).startOf('day').diff(today);
        if (resultDif === 0)
          hoy.push(not);
        else
          antiguas.push(not)
      });

      if (hoy.length > 0)
        notifAgrupadas.push({ title: "Hoy", data: hoy });
      if (antiguas.length > 0)
        notifAgrupadas.push({ title: "Antiguas", data: antiguas });
      setNotifInbox(notifAgrupadas);
      let notReadArr = inboxArr.filter(not => !not.isRead);
      setNotifCont(notReadArr.length);
    }
  }

  const sessionContext = {
    globalSession,
    setGlobalSession,
    profileTransactions,
    setProfileTransactions,
    token, setToken,
    notification,
    clearNotifications,
    isLoading, setIsLoading,
    deviceInfo, setDeviceInfo,
    initialView, changeInitialView,
    validSession, setValidSession,
    notifCont, setNotifCont,
    notifInbox, setNotifInboxFull
  };

  return (
    <AppContext.Provider value={sessionContext}>{children}</AppContext.Provider>
  );
};

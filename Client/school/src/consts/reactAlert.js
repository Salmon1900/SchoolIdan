import { store } from "react-notifications-component";

export const alertError = (messageToAlert) => {
  store.addNotification({
    message: messageToAlert,
    type: "danger",
    container: "top-center",
    animationIn: ["animated", "slideInDown"],
    animationOut: ["animated", "slideOutUp"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const alertSuccess = (messageToAlert) => {
  store.addNotification({
    message: messageToAlert,
    type: "success",
    container: "top-center",
    animationIn: ["animated", "slideInDown"],
    animationOut: ["animated", "slideOutUp"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const alertWarning = (messageToAlert) => {
  store.addNotification({
    message: messageToAlert,
    type: "warning",
    container: "top-center",
    animationIn: ["animated", "slideInDown"],
    animationOut: ["animated", "slideOutUp"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const alertFlag = (messageToAlert, flag) => {
  if (flag) alertSuccess(messageToAlert);
  else alertError(messageToAlert);
};

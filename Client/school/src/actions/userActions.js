// Action creators that get data and return actions

import { logOut, tryLogIn } from "../api/loginApi";
import { LOG_IN, LOG_OUT } from "./types";

export const logInUser = (id, password) => (dispatch) => {
  tryLogIn(id, password).then((res) => {
    dispatch({
      type: LOG_IN,
      payload: { ...res, id },
    });
  });
};

export const logOutUser = () => (dispatch) => {
  logOut().then((res) => {
    dispatch({
      type: LOG_OUT,
    });
  });
};

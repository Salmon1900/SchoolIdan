import { serverIP } from "./apiConfig";
import { get, post } from "./restFunctions";

export const tryLogIn = (userId, userPassword, attempt = true) => {
  let userData = {
    id: userId,
    password: userPassword,
    attempt,
  };
  return post(`${serverIP}/login`, userData);
};

export const logOut = () => {
  return get(`${serverIP}/logout`);
};

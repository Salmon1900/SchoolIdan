import { serverIP } from './apiConfig';
import { get, post } from './restFunctions';

export const tryLogIn = (userId, userPassword) => {
    let userData = {
        id: userId,
        password: userPassword
    };
    return post(`${serverIP}/login`, userData)
}

export const logOut = () => {
    return get(`${serverIP}/logout`)
}

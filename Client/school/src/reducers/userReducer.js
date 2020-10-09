import { LOG_IN, LOG_OUT } from '../actions/types';
import { initialState } from '../store';

export const userReducer = (state = {}, action) => {
    switch(action.type){
        case LOG_IN:
            // If login returned false dont log in user
            if(!action.payload){
                return state;
            } else {
                return {
                    ...state,
                    loggedIn: true,
                    role: action.payload.role
                }
            }
        case LOG_OUT:
            return {
                ...state,
                loggedIn: false,
                role: 0
            }
        default:
            return state;
    }
}
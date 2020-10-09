import { userReducer } from "./userReducer";

const { combineReducers } = require("redux");

export default combineReducers({
    user: userReducer
})
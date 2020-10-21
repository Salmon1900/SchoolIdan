import { userReducer } from "./userReducer";
import { managementReducer } from "./managementReducer";

const { combineReducers } = require("redux");

export default combineReducers({
  user: userReducer,
  management: managementReducer,
});

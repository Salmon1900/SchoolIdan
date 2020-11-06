import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export const initialState = {
  user: {
    loggedIn: false,
    role: 0,
    id: "",
  },
  management: {
    schoolYear: String(new Date().getFullYear()),
    selectedSchoolYear: String(new Date().getFullYear())
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

export default store;

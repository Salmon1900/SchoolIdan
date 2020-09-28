import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];

const store = createStore(() => {}, initialState, applyMiddleware(...middleware))
// const store = {}

export default store;
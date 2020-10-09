import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

export const initialState = {
    user: {
        loggedIn: false,
        role: 0
    }
};

// const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
// const store = {}
console.log(store.getState())

export default store;
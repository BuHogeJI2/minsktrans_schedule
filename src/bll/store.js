import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import serverData from "./reducers/serverData";


let reducers = combineReducers({serverData})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;
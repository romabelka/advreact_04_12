import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import history from "../history";

const store = createStore(
    reducer,
    applyMiddleware(thunk, routerMiddleware(history), logger),
);

//dev only
window.store = store;

export default store;

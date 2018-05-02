import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore, applyMiddleware } from "redux";
import {reducer as routerParams} from 'router-redux-params';
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import { Router, hashHistory, browserHistory } from "react-router";
import routes from "routers";
import Reducer from "reducers";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";

import favicon from './../favicon.ico';


//BEGIN Store constructing
const reducer = combineReducers({
	routerParams,
	Reducer,
	routing: routerReducer
});

// const loggerMiddleware = createLogger();

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);
//END Store constructing

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}></Router>
  </Provider>,
  document.getElementById("root")
);

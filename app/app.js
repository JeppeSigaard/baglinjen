import React from "react";
import ReactDOM from "react-dom";

import "../style/style.scss";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import thunk from "redux-thunk";

import createBrowserHistory from "history/createBrowserHistory";
import { Router, Route } from "react-router-dom";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";

/* ----------------------------------------- */
import Lazyload from "./modules/lazyload";
const lazyload = new Lazyload();

const history = createBrowserHistory();

history.listen((state, action) => {
  if (action !== "PUSH") return;
  setTimeout(() => {
    window.scrollTo(0, 0);

    lazyload.scrollEvent();

    if (typeof ga === "function") {
      ga("send", "pageview");
    }
  }, 20);
});

const router = routerMiddleware(history);
const store = createStore(rootReducer, applyMiddleware(router, thunk));

/* ----------------------------------------- */
// components
import Main from "./components/main";

/* ----------------------------------------- */
// App
const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

/* ----------------------------------------- */
// render to page
ReactDOM.render(<App />, document.getElementById("wrapper"));

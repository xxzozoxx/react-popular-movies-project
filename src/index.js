import {disableReactDevTools} from "./utils";
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Main from "./components/Main";
import { Provider } from "react-redux";
import configStore, { history } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { APP_NAME } from "./constants";
import { fetchConfigurations, fetchGenresList } from "./actions";

if(process.env.NODE_ENV === "produvtion"){
  disableReactDevTools();
}

const store = configStore(/* provide initial or preloaded state if any*/);
store.dispatch(fetchConfigurations());
store.dispatch(fetchGenresList());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main appName={APP_NAME} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

export function disableReactDevTools(){
  function isFunction(obj){
    return typeof obj == "function" || false;
  }
  function isArray(obj) {
    return typeof obj.forEach == "function";
  }

  function isObject(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  }
  if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    return;
  }
  
  const NO_OP = () => {};
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
    )
      ? NO_OP
      : isArray(window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop])
      ? []
      : null;
  }
}
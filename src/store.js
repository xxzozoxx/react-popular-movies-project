<<<<<<< HEAD
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export function configStore(initState) {
  return createStore(
    createRootReducer(history),
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
}
||||||| merged common ancestors
=======
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import {localStorageMiddleware} from "./middleware"

export const history = createBrowserHistory();

const myRouterMiddleware = routerMiddleware(history);

const middleware = [thunk, myRouterMiddleware,localStorageMiddleware];

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(...middleware);
  } else {
    return applyMiddleware(...middleware, createLogger());
  }
};
export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(getMiddleware())
  );

  return store;
}
>>>>>>> practice-branch

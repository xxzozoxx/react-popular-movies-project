import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createRootReducer from "./reducer";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const myRouterMiddleware = routerMiddleware(history);

const middleware = [thunk, myRouterMiddleware];

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

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {Switch,Route} from "react-router-dom";
import { configStore, history } from "./store";

const store = configStore(); 
ReactDOM.render(
<Provider store={store}>
<ConnectedRouter history={history}>
    <Switch>
    <Route exact path="/" component={Main}/>
    <Route path="/movies" render={() => <h1>Movie Page</h1>}/>
    </Switch>
</ConnectedRouter>
</Provider> ,
 document.getElementById("root"));

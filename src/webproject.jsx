import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from "react-router";

import "./static/css/webproject.css";

import App from "./components/App";
import NoMatch from "./components/NoMatch";
import Home from "./components/Home";

import Example from "./components/Example";
import ExampleList from "./components/ExampleList";

const AppRoutes = (
    <Router history={hashHistory}>
        <Route name="Home" path="/" component={App}>

            <IndexRoute component={Home}></IndexRoute>
            <Route name="Example" path='/example' component={Example}>
                <Route name="Example" path='/example/list' component={ExampleList}></Route>
            </Route>

            <Route name="404: No Match for route" path="*" component={NoMatch} />
        </Route>
    </Router>
);

ReactDOM.render(AppRoutes, document.getElementById("app"));

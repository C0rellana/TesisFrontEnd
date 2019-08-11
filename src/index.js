import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/miscss.css";

import Index from "views/Index";
import Buscador from "views/Buscador.jsx";
import Upload from "views/Upload.jsx";
import Denuncias from "views/Denuncias.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route path="/Buscador" exact render={props => <Buscador {...props} />} />
      <Route path="/Upload" exact render={props => <Upload {...props} />} />
      <Route path="/Denuncias" exact render={props => <Denuncias {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/miscss.css";
import {PrivateRoute} from "components/Auth/PrivateRoute";

import Home from "views/Home";
import Auth from "views/Auth";
import Search from "views/Search";
import Upload from "views/Upload.jsx";
import Report from "views/Report";


ReactDOM.render(
  <BrowserRouter>
    <Switch>

    {/* Rutas sin autentificacion */}
    <Route path="/Auth" exact render={props => <Auth {...props} />} />

     {/* Rutas con autentificacion  ROL : ["USER","ADMIN","CGA"]*/}
    <PrivateRoute exact path="/" roles={["USER","ADMIN","CGA"]} component={Home} />   


     {/* Rutas con autentificacion  ROL : USER */}
    <PrivateRoute  path="/buscador" roles={["USER","ADMIN","CGA"]} component={Search} />
    <PrivateRoute  path="/Upload" roles={["USER","ADMIN","CGA"]} component={Upload} />
  

    {/* Rutas con autentificacion  ROL : MOD */}
    <PrivateRoute path="/denuncias" roles={["CGA"]} component={Report} />


    {/* Cualquier otra ruta Redirect to / */}
    <Redirect to="/" />
    
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

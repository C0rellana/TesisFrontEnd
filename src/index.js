import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/miscss.css";
import {PrivateRoute} from "components/auth/PrivateRoute";

import Home from "views/Home";
import Auth from "views/Auth";
import Buscador from "views/Buscador.jsx";
import Upload from "views/Upload.jsx";
import Denuncias from "views/Denuncias.jsx";


ReactDOM.render(
  <BrowserRouter>
    <Switch>

    {/* Rutas sin autentificacion */}
    <Route path="/Auth" exact render={props => <Auth {...props} />} />

     {/* Rutas con autentificacion  ROL : USER Y MOD*/}
    <PrivateRoute exact path="/" roles={["User","Mod"]} component={Home} />   


     {/* Rutas con autentificacion  ROL : USER */}
    <PrivateRoute  path="/buscador" roles={["User"]} component={Buscador} />
    <PrivateRoute  path="/Upload" roles={["User"]} component={Upload} />
  

    {/* Rutas con autentificacion  ROL : MOD */}
    <PrivateRoute path="/denuncias" roles={["Mod"]} component={Denuncias} />


    {/* Cualquier otra ruta Redirect to / */}
    <Redirect to="/" />
    
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

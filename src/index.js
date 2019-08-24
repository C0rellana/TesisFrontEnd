import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/miscss.css";
import 'react-toastify/dist/ReactToastify.css';
import Home from "views/Home";
import Auth from "views/Auth";
import Search from "views/Search";
import Upload from "views/Upload.jsx";
import Report from "views/Report";
//Middelware
import RequireAuth from "components/Auth/RequireAuth";

var Nivel1=["USER","CGA","ADMIN"];
var Nivel2=["CGA"];
//var Nivel3=["ADMIN"];

ReactDOM.render(
  <BrowserRouter>
    <Switch>

    {/* Rutas sin autentificacion */}
    <Route path="/Auth" exact render={props => <Auth {...props} />} />

     {/* Rutas con autentificacion  ROL : ["USER","ADMIN","CGA"]*/}
     <Route exact path='/' component={RequireAuth(Home,Nivel1)} />

     {/* Rutas con autentificacion  ROL : USER */}
      <Route exact path='/buscador' component={RequireAuth(Search,Nivel1)} />
      <Route exact path='/Upload' component={RequireAuth(Upload,Nivel1)} />

    {/* Rutas con autentificacion  ROL : MOD */}
    <Route exact path='/denuncias' component={RequireAuth(Report,Nivel2)} />

    {/* Cualquier otra ruta Redirect to / */}
    <Redirect to="/" />
    
    </Switch>
  </BrowserRouter>,
  document.getElementById("root" )
 
);

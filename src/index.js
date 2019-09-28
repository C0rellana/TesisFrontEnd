import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch,Redirect} from "react-router-dom";
//recursos
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/css/miscss.css";
import 'react-toastify/dist/ReactToastify.css';
//Vistas
import Home from "views/Home";
import Auth from "views/Auth";
import Search from "views/Search";
import Upload from "views/Upload.jsx";
import Report from "views/Denuncias";
import Notas from "views/Notas";
import Categorias from "views/Categorias";
import Carrera from "views/Carrera";
import Config from "views/Config";
import Archivos from "views/Archivos"
import Dashboard from "views/Dashboard"
//Middelware
import RequireAuth from "components/Auth/RequireAuth";

var Nivel1=["USER","CGA","ADMIN","DIRECTOR"];
var Nivel2=["CGA","ADMIN","DIRECTOR"];
//var Nivel3=["ADMIN"];

ReactDOM.render(
  <BrowserRouter>
    <Switch>

    {/* Rutas sin autentificacion */}
    <Route path="/Auth" exact render={props => <Auth {...props} />} />

    <Route path="/reset"  render={props =>  <Auth {...props}  reset={true}/>}/>

     {/* Rutas con autentificacion  ROL : ["USER","ADMIN","CGA","DIRECTOR"]*/}
     <Route exact path='/' component={RequireAuth(Home,Nivel1)} />

     {/* Rutas con autentificacion  ROL : ["USER","ADMIN","CGA","DIRECTOR"]**/}
      <Route exact path='/buscador' component={RequireAuth(Search,Nivel1)} />
      <Route exact path='/Upload' component={RequireAuth(Upload,Nivel1)} />
      <Route exact path='/Notas' component={RequireAuth(Notas,Nivel1)} />
      <Route exact path='/Archivos' component={RequireAuth(Archivos,Nivel1)} />

    {/* Rutas con autentificacion  ROL :["ADMIN","CGA","DIRECTOR"]*/}
    <Route exact path='/denuncias' component={RequireAuth(Report,Nivel2)} />
    <Route exact path='/categorias' component={RequireAuth(Categorias,Nivel2)} />
    <Route exact path='/carrera' component={RequireAuth(Carrera,Nivel2)} />
    <Route exact path='/config' component={RequireAuth(Config,Nivel2)} />
    <Route exact path='/dashboard' component={RequireAuth(Dashboard,Nivel2)} />
    {/* Cualquier otra ruta Redirect to / */}
    <Redirect to="/" />
    
    </Switch>
  </BrowserRouter>,
  document.getElementById("root" )
 
);

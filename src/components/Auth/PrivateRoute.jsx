import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { auth } from 'services/authenticacion';


export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route 
        {...rest} 
        render={props => {
      
        var user= auth.currentUserValue;           
                   
        if (!user) {
            // si no esta logeado se redirecciona  a /Auth
            console.log("No estas logueado: redirect to /Auth")
            return <Redirect to={{ pathname: '/Auth', state: { from: props.location } }} /> ;
        }
    
        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
            // role not authorised so redirect to home page
            console.log("No estas autorizado: redirect to / ")
             return <Redirect to={{ pathname: '/'}} /> ;
        }

        // authorised so return component
        console.log("Tiene permisos para continuar")
        return <Component {...props}/>                  

          
          
        }} 
    />
)
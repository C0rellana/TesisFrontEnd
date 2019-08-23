import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { auth } from 'services/authenticacion';

class PrivateRoute2 extends React.Component {
    state = {
        data:'',
        user:'',
        status:false,
    }
  
    componentDidMount () {
       auth.GetData().then((data)=>{
            this.setState({data:data,status:true})
       })
    }
   
    render () {
 
        const salida=(

            <Route 
            {...this.props.rest} 
            render={props => {
                var data= this.state.data;

                if (!data) {
                    // si no esta logeado se redirecciona  a /Auth
                    //console.log("No estas logueado: redirect to /Auth")
                    return <Redirect to={{ pathname: '/Auth', state: { from: props.location } }} /> ;
                }
            
                // check if route is restricted by role
                if (this.props.roles && this.props.roles.indexOf(data.role) === -1) {
                    // role not authorised so redirect to home page
                    //console.log("No estas autorizado: redirect to / ")
                    return <Redirect to={{ pathname: '/'}} /> ;
                }
        
                // authorised so return component
                //console.log("Tiene permisos para continuar")
                return <this.props.component {...props}/>                  
                
          
              
            }} 
        />
        )
     
       return (
          <>
          {this.state.status?salida:''}
          </>
       )
    }


  }



export default PrivateRoute2;
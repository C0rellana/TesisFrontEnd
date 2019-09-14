import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from 'services/authenticacion';
import MiNavbar from 'components/Navbars/MiNavbar';
import {InvertirColor} from 'services/Constantes'
import { ToastContainer,Slide } from 'react-toastify';
export default function withAuth(ComponentToProtect,roles) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        user:'',
        servidor:false,
      };
    }

    componentDidMount() {
        
        auth.GetData()
        .then(res => {  
            this.setState({ loading: false,user: res });
        }).catch(error=>{
            
          if(error.message==="Network Error"){
            this.setState({ servidor: true });
          }
          if(error.response.status===401){
            this.setState({ loading: false, redirect: true });
          }
          
        });
    }

    render() {  
      const { loading, redirect,user,servidor } = this.state;
      if(servidor){
        return <Redirect to="/Auth" />;
      }
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/Auth" />;
      }
      if (roles && roles.indexOf(user.role) === -1)  {
        return <Redirect to={{ pathname: '/'}} /> ;
      }
      var textColor=InvertirColor(user.color?user.color:"#8965E0");
            
      return (
        <React.Fragment>
           <ToastContainer 
            transition={Slide}
            position= "top-right"
            autoClose={2000}
          />
          <MiNavbar user={user} textColor={textColor} ></MiNavbar>
          <br></br>
          <ComponentToProtect  user={user} textColor={textColor}  {...this.props} />
         
        </React.Fragment>
      );
    }
  }
}
import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from 'services/authenticacion';
import MiNavbar from 'components/Navbars/MiNavbar';
 
export default function withAuth(ComponentToProtect,roles) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        role: null,
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
      return (
        <React.Fragment>
          <MiNavbar user={user} ></MiNavbar>
          <ComponentToProtect user={user} {...this.props} />
          <br></br> <br></br>
        </React.Fragment>
      );
    }
  }
}
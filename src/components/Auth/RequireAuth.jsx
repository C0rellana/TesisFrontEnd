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
      };
    }

    componentDidMount() {
        
        auth.GetData()
        .then(res => {
          if (res.id!=null) {
            this.setState({ loading: false,user: res });
          } else {
            this.setState({ loading: false, redirect: true });
          }
        });
    }

    render() {  
      const { loading, redirect,user } = this.state;
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
        </React.Fragment>
      );
    }
  }
}
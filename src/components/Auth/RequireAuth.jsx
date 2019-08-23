import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from 'services/authenticacion';

export default function withAuth(ComponentToProtect,roles) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        role: null,
      };
    }

    componentDidMount() {
        
        auth.GetData()
        .then(res => {
          if (res.id!=null) {
            this.setState({ loading: false,role: res.role });
          } else {
            this.setState({ loading: false, redirect: true });
          }
        });
    }

    render() {  
      const { loading, redirect,role } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/Auth" />;
      }
      if (roles && roles.indexOf(role) === -1)  {
        return <Redirect to={{ pathname: '/'}} /> ;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
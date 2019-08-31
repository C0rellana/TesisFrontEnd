import React from "react";
import  { withRouter } from 'react-router-dom'

import SidebarAdmin from "./SidebarAdmin";
import SidebarConfig from "./SidebarConfig";
import Navbar from "./Navbar";

class MiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarAdminOpen: false,
      color:false,
      nombre:'',
    };
    
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.onSetSidebarAdminOpen = this.onSetSidebarAdminOpen.bind(this);
   
  }

  componentDidMount(){
    this.setState({
      color:this.props.user.color,
      nombre: this.props.user.nombre,
      role:this.props.user.role,
    })
  }


  render() {
    var {color,nombre,role}=this.state;
    return (
      <>
      
      {/* CONFIG SIDEBAR */}
       <SidebarConfig color={color} nombre={nombre} isOpen={this.state.sidebarOpen} Change= {this.onSetSidebarOpen}/>

      {/* ADMIN SIDEBAR */}
      <SidebarAdmin color={color} isOpen={this.state.sidebarAdminOpen} Change= {this.onSetSidebarAdminOpen}/>
     
      {/* NACBAR */}
      <Navbar color={color} role={role} ChangeAdmin= {this.onSetSidebarAdminOpen} ChangeConfig= {this.onSetSidebarOpen}></Navbar>
      </>
    );
  }



  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }
  onSetSidebarAdminOpen(e) {
    if(typeof e=='object'){
      e.preventDefault();
    }
    this.setState({ sidebarAdminOpen: !this.state.sidebarAdminOpen });
  }


}



export default withRouter(MiNavbar)

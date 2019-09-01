import React from "react";
import  { withRouter } from 'react-router-dom'
import SidebarConfig from "./SidebarConfig";
import Navbar from "./Navbar";

class MiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      color:false,
      nombre:'',
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

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
       <SidebarConfig color={color} role={role}  nombre={nombre} isOpen={this.state.sidebarOpen} Change= {this.onSetSidebarOpen}/>
      {/* NACBAR */}
      <Navbar color={color}  ChangeConfig= {this.onSetSidebarOpen}></Navbar>
      </>
    );
  }



  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }


}



export default withRouter(MiNavbar)

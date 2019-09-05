import React from "react";
import  { withRouter } from 'react-router-dom'
import SidebarConfig from "./SidebarConfig";
import Navbar from "./Navbar";

class MiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  }

  render() {
    return (
      <>
      
      {/* CONFIG SIDEBAR */}
       <SidebarConfig  {...this.props}  isOpen={this.state.sidebarOpen} Change= {this.onSetSidebarOpen}/>
      {/* NAVBAR */}
      <Navbar {...this.props}  ChangeConfig= {this.onSetSidebarOpen}></Navbar>
      </>
    );
  }



  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }


}



export default withRouter(MiNavbar)

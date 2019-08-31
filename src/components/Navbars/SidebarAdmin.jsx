import React from "react";
import { Link } from "react-router-dom";
import  { withRouter } from 'react-router-dom'
import Sidebar from "react-sidebar";

// reactstrap components
import {  Container} from "reactstrap";

class SidebarAdmin extends React.Component {

  render() {
    var color=this.props.color;
    var isOpen= this.props.isOpen
    var Change= this.props.Change
    return (
      <>
    {/* ADMIN SIDEBAR */}
      <Sidebar
        sidebar={
          <Container>
            <br/> <br/> <br/> <br/> <br/>
            <div align="center">
              <h6 style={{color:"#fff"}} ><b>PANEL DE ADMINISTRACIÓN</b></h6>
              <hr></hr>         
              <Link to="/categorias">
              <button className="btn btn-block btn-secondary">CATEGORIAS</button>
              </Link>
              <br></br>
              <Link to="/denuncias">
              <button className="btn btn-block btn-secondary" >DENUNCIAS</button>
              </Link>
             
            </div>
           
          </Container>  
      }
        open={isOpen}
        onSetOpen={Change}
        styles={{ sidebar: { background: color?color:"#8965E0",color:"#fff", height:"auto", position: "fixed" } }}
        pullRight={false}
      >
       <></>
       </Sidebar>  
      </>
    );
  }


}

export default withRouter(SidebarAdmin)

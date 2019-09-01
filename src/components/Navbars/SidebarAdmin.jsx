import React from "react";
import { Link } from "react-router-dom";
import  { withRouter } from 'react-router-dom'

class SidebarAdmin extends React.Component {

  render() {
    var color=this.props.color;
    return (
      <>
         
              <hr></hr>  
              <h4><small><b>PANEL DE ADMINISTRACIÓN</b></small></h4>
            
                    
              <Link to="/categorias">
              <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:"white"}} ><small><b>CATEGORIAS</b></small></button>
              </Link>
              <br></br>
              <Link to="/denuncias">
              <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:"white"}} ><small><b>DENUNCIAS</b></small></button>
              </Link>
              <br></br>
              <Link to="/carrera">
                <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:"white"}} ><small><b>CARRERA</b></small></button>
              </Link>
              <br></br>
              <Link to="/carrera">
                <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:"white"}} ><small><b>DASHBOARD</b></small></button>
              </Link>
              <br></br>

        

      </>
    );
  }


}

export default withRouter(SidebarAdmin)

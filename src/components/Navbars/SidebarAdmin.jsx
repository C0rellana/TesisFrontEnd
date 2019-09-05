import React from "react";
import { Link } from "react-router-dom";
import  { withRouter } from 'react-router-dom'

class SidebarAdmin extends React.Component {

  render() {
    var {color,role}=this.props.user;
    var {textColor}= this.props;
    return (
      <>
         
              <hr></hr>  
              <h4><small><b>PANEL DE ADMINISTRACIÓN</b></small></h4>
              {(role==="DIRECTOR" || role ==="CGA") &&
              <>
                {/* DIRECTOR Y CGA */}
                <Link to="/categorias">
                <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:textColor}} ><small><b>CATEGORIAS</b></small></button>
                </Link>
                <br></br>
                  {/* DIRECTOR Y CGA */}
                <Link to="/denuncias">
                <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:textColor}} ><small><b>DENUNCIAS</b></small></button>
                </Link>
                <br></br>
                  {/* DIRECTOR Y CGA */}
                <Link to="/carrera">
                  <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:textColor}} ><small><b>MI CARRERA</b></small></button>
                </Link>
              </>
              }
              {(role==="DIRECTOR") &&
                <>
                <br></br>
                {/* SOLO DIRECTOR */}
                <Link to="/carrera">
                  <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:textColor}} ><small><b>DASHBOARD</b></small></button>
                </Link>
                </>
              }
              {(role==="DIRECTOR" || role ==="ADMIN")&&
                <>
                <br></br>
                {/* ADMIN O DIRECTOR */}
                <Link to="/config">
                  <button className="btn btn-block" style={{backgroundColor:color?color:"#8965e0", color:textColor}} ><small><b>CONFIGURACION</b></small></button>
                </Link>
                <br></br>
                </>
              }

        

      </>
    );
  }


}

export default withRouter(SidebarAdmin)

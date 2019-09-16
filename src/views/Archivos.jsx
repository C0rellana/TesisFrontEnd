import React from 'react';
import {Container} from "reactstrap";
import Tabla from "components/Archivos/TablaMisArchivos"
import Breadcrumbs from "components/Navbars/Breadcrumbs"

  class Archivos extends React.Component {
   

  render() {

    return (
    <>
      <Container>
      <Breadcrumbs page="MIS ARCHIVOS"  {...this.props} />
        <p align="justify"> <b>
          En esta sección te muestra los archivos que has compartido con los demás estudiantes,
          tienes la posibilidad de modificarlos o eliminarlos del sistema.</b> 
        </p>
    
        <Tabla {...this.props}></Tabla>
      
      </Container>
      <br/><br/>
    </>
    );
  }

};

export default Archivos;


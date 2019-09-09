import React from 'react';
import {Container} from "reactstrap";
import Tabla from "components/Archivos/TablaMisArchivos"
import Breadcrumbs from "components/Navbars/Breadcrumbs"

  class Archivos extends React.Component {
   

  render() {

    return (
    <>
      <Container>

        <p align="justify"> <b>
          En esta sección te muestra los archivos que has compartido con los demás estudiantes,
          tienes la posibilidad de modificarlos o eliminarlos lógicamente del sistema.</b> 
        </p>
     
        <Breadcrumbs page="MIS ARCHIVOS"  {...this.props} />
        <Tabla {...this.props}></Tabla>
      
      </Container>
    </>
    );
  }

};

export default Archivos;


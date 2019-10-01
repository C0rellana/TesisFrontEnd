import React from "react";
import {
  Container
} from "reactstrap";
 import Token from "components/Config/Token"
import Cga from "components/Config/Cga"
import Director from "components/Config/Director"
import Logo from "components/Config/Logo"
import Mensaje from "components/Config/Mensaje"
class Config extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }


  render() {
    var role=this.props.user.role;
    return (
      <>

          <Container>
              {role==="DIRECTOR" &&
              <>
                  <p align="justify"> 
                    En esta sección puedes realizar algunas configuraciones de tu carrera.
                  </p>
                  <p style={{textIndent:""}}> 
                    <b>Asignar rol "CGA" </b>=>  esto cambia el rol de un estudiante del tipo "USER" a "CGA"
                      ortorgando los siguientes privilegios.
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>1.</b> Revisar la seccion de "Denuncias".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>2.</b>  Revisar la seccion de "Mi Carrera".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>3.</b>  Revisar la seccion de "Categorias".
                  </p>
                  
                  <p style={{textIndent:""}}> 
                  <b>Modificar Token de Almacenamiento  </b> 
                  => Esta opción modifica donde se guardan los archivos
                  de tu carrera. Al modificar este valor los archivos almacenados se perderan por completo.
                  </p>
               
                  
                 
                <br/><hr></hr>
                <Cga></Cga>
                <br/><hr></hr>
                <Token></Token> 
                </>
              }
              {role==="ADMIN" &&
               <>
                 <p align="justify"> 
                    En esta sección puedes realizar algunas configuraciones de la plataforma.
                  </p>
                  <p style={{textIndent:""}}> 
                    <b>Asignar rol "DIRECTOR" </b>=>  esto cambia el rol de un usuario del tipo a "DIRECTOR"
                      ortorgando los siguientes privilegios.
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>1.</b> Revisar la seccion de "Denuncias".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>2.</b>  Revisar la seccion de "Mi Carrera".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>3.</b>  Revisar la seccion de "Categorias".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>4.</b>  Asigar roles de "CGA".
                  </p>
                  <p style={{textIndent:"40px"}}> 
                      <b>5.</b>  Modificar Token de almacenamiento.
                  </p>
                  <p style={{textIndent:""}}> 
                    <b>Modificar logo del sistema" </b>=>  esto cambia automaticamente el logo de esta plataforma.
                  </p>
                <br/><hr></hr>
                <Mensaje></Mensaje>
                <br/><hr></hr>
                <Director></Director>
                <br/><hr></hr>
                <Logo></Logo> 
                </>
              }
          
              
              
          </Container>
           <br/><br/>
      </>
    );
  }
}

export default Config;

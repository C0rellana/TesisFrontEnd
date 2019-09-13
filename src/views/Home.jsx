import React from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
class Home extends React.Component {

  render() {
    var {color,nombre} = this.props.user;
    var textColor= this.props.textColor;
    return (
      <>         

       <section className="section section-lg section-shaped" >
          <div className="shape shape-style-1" style={{backgroundColor:color?color:"#8965e0"}}>
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>

          <Container style={{color:textColor}}>
    
  
          <h3 className="display-3" style={{color:textColor}}>
                  Bienvenido  @{nombre}
                </h3>
            <Row className="row-grid justify-content-between">
              <Col lg="6">
                <p className="lead" align="justify">
                  <small>
                    <b>¿Que es COMPARTE UCM?</b>
                    <br/>
                    Es una plataforma que tiene como objetivo apoyar la interaccion entre alumnos para 
                    poder compartir material,
                    en COMPARTE UCM ayudas, te ayudan!
                    <br/><br/>
                    <b>¿Como lograr esto?</b>
                    <br/>
                    Cada vez que cursas una asignatura quedas con una gran cantidad de conocimiento en tus manos, 
                    estos pueden ser de gran ayuda a tus compañeros.
                    Mediante esta plataforma podrás compartir todos aquellos conocimientos, 
                    así como acceder a los que alumnos de otras generaciones entregaron
                    
                  </small> 
                </p>
              </Col>
              <Col lg="6">
                <p className="lead" align="justify">
                  <small>
                    <b>¿Necesitas ayuda?</b>
                    <br/>
                    Si tienes dudas con respecto a las funcionalidades de la plataforma puedes presionar el icono
                    de ( {<HelpIcon/>} ) ubicado en la parte superior derecha.
                    <br/>  <br/>
                    <b>¿Deseas otro color?</b>
                    <br/>
                    Puedes modificarlo a tu gusto, solo tienes que presionar el icono de
                    ( {<SettingsIcon/>} ) ubicado en la parte superior derecha y elegir tu color favorito.
                    Tambien puedes modificar tu foto de perfil presionando sobre ella y seleccionado la que mas te guste.
                    
                  </small> 
                </p>
              </Col>
            </Row>
          </Container>
          </section>
      </>
    );
  }
}

export default Home;

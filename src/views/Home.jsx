import React from "react";
import {
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
import CardsFooter from "components/Home/SimpleFooter";
import Info from "components/Home/Info";


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
          <Alert color="primary">
            <strong>Compañeros. </strong>
            Por motivos de la conexión con google,
             se tuvo que deshabilitar los archivos compartidos hasta el momento 
             <strong> 1/10/2019 13:20. </strong>
            Disculpen las molestias. Sistema nuevamente <strong>ACTIVO</strong> 
          </Alert>
  
          <h3 className="display-3" style={{color:textColor}}>
                  Bienvenido  @{nombre}
                </h3>
            <Row className="row-grid justify-content-between">
              <Col lg="6">
                <p className="lead" align="justify">
                  <small>
                    <b>¿Que es "COMPARTE UCM" ?</b>
                    <br/>
                    Es una plataforma que tiene como objetivo apoyar la interacción entre alumnos 
                    de nuestra universidad para fortalecernos mutuamente compartiendo material relevante 
                    que nos ayude a cursar nuestros ramos.
                    
                  </small> 
                </p>
              </Col>
              <Col lg="6">
                <p className="lead" align="justify">
                  <small>
                  <b>¿Como lograr esto?</b>
                    <br/>
                    Cada vez que cursas una asignatura, quedas con una gran cantidad de conocimiento en tus manos, 
                    estos pueden ser de gran ayuda a tus compañeros.<br></br>
                    Mediante esta plataforma podrás compartir todos aquellos conocimientos, 
                    así como acceder a los que alumnos de otras generaciones entregaron.

                    {/* <b>¿Necesitas ayuda?</b>
                    <br/>
                    Si tienes dudas con respecto a las funcionalidades de la plataforma puedes presionar el icono
                    de ( {<HelpIcon/>} ) ubicado en la parte superior derecha.
                    <br/>  <br/>
                    <b>¿Deseas otro color?</b>
                    <br/>
                    Puedes modificarlo a tu gusto, solo tienes que presionar el icono de
                    ( {<SettingsIcon/>} ) ubicado en la parte superior derecha y elegir tu color favorito.
                    Tambien puedes modificar tu foto de perfil presionando sobre ella y seleccionado la que mas te guste.
                     */}
                  </small> 
                </p>
              </Col>
            </Row>
          </Container>
          <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
            </div>
          </section>
        <Info></Info>
     
        <CardsFooter />
        
      </>
    );
  }
}

export default Home;

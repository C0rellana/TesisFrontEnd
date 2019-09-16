import React from "react";
// reactstrap components
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import {Container, Row, Col, Card, CardBody, Button,} from "reactstrap";
import { Dialog} from "@material-ui/core";

class Info extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
        }
    this.toggleModal= this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
          open: !this.state.open
        });
    }

  
  render() {
    return (
      <> 
        <Dialog
            open={this.state.open}
            onClose={this.toggleModal}
            PaperProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
            }}
        >

        <iframe  title="encuesta"  src="https://docs.google.com/forms/d/e/1FAIpQLScowlfZ4KXq72AE-NKLEi7jq10ayJKE_ciMw-3B5cCmfn2VEw/viewform?embedded=true" width="640"height="695" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
        </Dialog>

       <section className="section pb-0 bg-white">
      <Container>
        <Row className="row-grid align-items-center">
          <Col className="order-lg-2 ml-lg-auto" md="6">
            <div className="position-relative pl-md-5">
              <img
                alt="..."
                className="img-center img-fluid"
                src={require("assets/img/ill/ill-2.svg")}
              />
            </div>
            <Card className="shadow shadow-lg--hover mt-5">
              <CardBody>
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                    {<HelpIcon/>}
                    </div>
                  </div>
                  <div className="pl-4">
                    <h5 className="title text-info">
                      ¿NECESITAS AYUDA?
                    </h5>
                    <p align="justify">
                    Si tienes dudas con respecto a las funcionalidades de la plataforma 
                    puedes presionar el icono ( {<HelpIcon/>} ) ubicado en la parte superior derecha.
                    Además si deseas puedes escribir a tu administrador con el siguiente enlace.
                    </p>
                    <a
                      className="text-info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      SOPORTE
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="shadow shadow-lg--hover mt-5">
              <CardBody>
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    {<SettingsIcon/>}
                    </div>
                  </div>
                  <div className="pl-4">
                    <h5 className="title text-warning" >
                      CONFIGURAR LA PLATAFORMA
                    </h5>
                    <p align="justify">
                      Puedes modificar el color a tu gusto, solo tienes que presionar el icono ( {<SettingsIcon/>} ) ubicado en la parte superior derecha y elegir 
                      tu tema favorito.
                      Además puedes modificar tu foto de perfil presionando sobre ella seleccionando la que mas te guste.
                      
                    </p>

                  </div>
                </div>
              </CardBody>
            </Card>
           
          </Col>
          
          <Col className="order-lg-1" lg="6">
            <div className="d-flex px-3">
              <div>
                <div className="icon icon-md icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  {<AccessibilityIcon/>}
                </div>
              </div>
              <div className="pl-4">
                <h6 className="display-3 text">AQUÍ PODRAS</h6>
              </div>
            </div>
            <Card className="shadow shadow-lg--hover mt-5">
              <CardBody>
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    {<SearchIcon/>}
                    </div>
                  </div>
                  <div className="pl-4">
                    <h5 className="title text-success">
                      BUSCAR CONTENIDO
                    </h5>
                    <p align="justify">
                      Tienes la opción de buscar el contenido que necesites en cualquiera de las
                      carreras.

                    </p>
                    <a
                      className="text-success"
                      href="/buscar"
                    >
                      BUSCAR AHORA
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>                
            <Card className="shadow shadow-lg--hover mt-5">
              <CardBody>
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    {<ShareIcon/>}
                    </div>
                  </div>
                  <div className="pl-4">
                    <h5 className="title text-success">
                      COMPARTIR INFORMACION
                    </h5>
                    <p align="justify">
                      Puedes compartir todo el material que dispongas para ayudar a tus compañeros 
                      y futuras generaciones de estudiantes
                    </p>
                    <a
                      className="text-success"
                      href="/upload"
                    >
                      COMPARTIR AHORA
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="shadow shadow-lg--hover mt-5">
              <CardBody>
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    {<SpellcheckIcon/>}
                    </div>
                  </div>
                  <div className="pl-4">
                    <h5 className="title text-success">
                      CALCULAR TUS NOTAS
                    </h5>
                    <p align="justify">
                      Agregamos esta sección para ayudarte a calcular tus calificaciones faltantes
                      para cumplir con tu promedio deseado, solo debes ingresar las notas que tienes 
                      y los respectivos porcentajes.
                    </p>
                    <a
                      className="text-success"
                      href="/notas"
                    >
                      CALCULAR AHORA
                    </a>
                  </div>
                </div>
              </CardBody>
            </Card>  
          </Col>
        </Row>
      </Container>
      {/* SVG separator */}
      <div className="separator separator-bottom separator-skew zindex-100">
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
      <br/><br/><br/><br/>
      <section className="section section-lg pt-0">
            <Container>
              <Card className="bg-gradient-warning shadow-lg border-0">
                <div className="p-5">
                  <Row className="align-items-center">
                    <Col lg="8">
                      <h3 className="text-white">
                        AYUDANOS A MEJORAR
                      </h3>
                      <p className="lead text-white mt-3" align="justify">
                       Te dejamos una pequeña encuesta de google para que nos cuentes tu experiencia con esta plataforma.
                      </p>
                    </Col>
                    <Col className="ml-lg-auto" lg="3">
                      <Button
                        block
                        className="btn-white"
                        color="default"
                        onClick={this.toggleModal}
                        size="lg"
                      >
                        RESPONDER ENCUESTA
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </section>
      
    </section>

       </>
    );
  }
}

export default Info;

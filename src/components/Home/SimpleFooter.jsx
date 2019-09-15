
import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer" style={{backgroundColor:"#001740"}}>
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="5">
                <h3 className="text-white mb-2">
                  Gracias por compartir.
                </h3>
                <h6 className="text-white text-justify">
                  Puedes colocarte en contacto con nosotros a través de las siguientes plataformas
                </h6>
              </Col>
              <Col lg="3">
                <>
                  <img alt="UCM" src="../imagenes/logo-footer_nuevo.png"></img>
                </>
              
              </Col>
             
              <Col className=" text-lg-center btn-wrapper" lg="3">
                <>
                  <Button
                    className=" btn-neutral btn-icon-only btn-round ml-1"
                    color="white"
                    href="https://www.facebook.com/"
                    id="tooltip383967593"
                    size="lg"
                    target="_blank"
                  >
                    <i className=" fa fa-facebook" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip383967593">
                    Visitanos en Facebook
                  </UncontrolledTooltip>
                  <Button
                    className=" btn-neutral btn-icon-only btn-round ml-1"
                    color="white"
                    href="https://instagram.com/"
                    id="tooltip568564532"
                    size="lg"
                    target="_blank"
                  >
                    <i className=" fa fa-instagram" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip568564532">
                    Visitanos en instagram
                  </UncontrolledTooltip>
                  <Button
                    className=" btn-neutral btn-icon-only btn-round ml-1"
                    color="white"
                    href="https://github.com/"
                    id="tooltip626177562"
                    size="lg"
                    target="_blank"
                  >
                    <i className=" fa fa-github" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip626177562">
                    Revisa el codigo en GitHub
                  </UncontrolledTooltip>
                </>
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className="copyright text-white ">
                  <p>© {new Date().getFullYear()}{" "}COMPARTE UCM</p>
               </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;

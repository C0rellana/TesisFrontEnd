
import React from "react";
// reactstrap components
import {

  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,

} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
        
            <hr />
            <Row className=" align-items-center justify-content-md-between">
        
              <Col md="12">
                <Nav className=" nav-footer">
                  <NavItem>
                    <NavLink
                      href="#"
                      target="_blank"
                    >
                      Estudeo
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      target="_blank"
                    >
                      Sobnre Nosotros
                    </NavLink>
                  </NavItem>


                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;

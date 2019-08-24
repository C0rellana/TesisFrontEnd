import React from "react";
import { Link } from "react-router-dom";
import { auth } from 'services/authenticacion';
import  { withRouter } from 'react-router-dom'
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class MiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this); 
  }

  logout() {
    auth.logout()
    this.props.history.push("/Auth");
  }


  render() {
    return (
      <>


      <Navbar
      className="navbar-transparent bg-purple"
      expand="lg"
      >
      <Container>
      <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <img
              alt="..."
              src={require("assets/img/brand/argon-react-white.png")}
            />
          </NavbarBrand>
        <button
          aria-controls="navbar-danger"
          aria-expanded={false}
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-target="#navbar-danger"
          data-toggle="collapse"
          id="navbar-danger"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <UncontrolledCollapse navbar toggler="#navbar-danger">
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  <img
                    alt="..."
                    src={require("assets/img/brand/argon-react-black.png")}
                  />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  aria-controls="navbar-danger"
                  aria-expanded={false}
                  aria-label="Toggle navigation"
                  className="navbar-toggler"
                  data-target="#navbar-danger"
                  data-toggle="collapse"
                  id="navbar-danger"
                  type="button"
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="align-items-lg-center ml-lg-auto" navbar>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="/buscador"
                >
                    <small>Buscador</small>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="/upload"
                >
                    <small>Compartir</small>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="#"
                  onClick={this.logout}
                >
                    <small>Cerrar Sesión</small>
                </NavLink>
              </NavItem>
            <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="#"
                  id="tooltip333589074"
                  target="_blank"
                >
                  <i className="fa fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none ml-2">
                   <small>Facebook</small> 
                  </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip333589074">
                  Facebook
                </UncontrolledTooltip>
              </NavItem>
            </Nav>

        </UncontrolledCollapse>
      </Container>
    </Navbar>

      </>
    );
  }
}

export default withRouter(MiNavbar)

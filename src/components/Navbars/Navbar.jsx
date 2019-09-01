import React from "react";
import  { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import { auth } from 'services/authenticacion';
import Ayuda from "./Ayuda";
import {
    UncontrolledCollapse,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Navbar,
    Container,
    Row,
    Col,
  
  } from "reactstrap";
  
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Ayuda:false,
        };
    this.logout = this.logout.bind(this); 
    this.OpenAyuda = this.OpenAyuda.bind(this); 
}
  render() {
    return (
      <>
        <Ayuda isOpen={this.state.Ayuda} OpenAyuda={this.OpenAyuda}/>
        <Navbar
            className="navbar-transparent"
            style={{backgroundColor:this.props.color?this.props.color:"#8965e0"}}
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
                        <small><b>BUSCADOR</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="/upload"
                    >
                        <small><b>COMPARTIR</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="/notas"
                    >
                        <small><b>CALCULAR NOTA</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="#"
                    onClick={this.logout}
                    >
                        <small><b>SALIR</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link-icon"
                    
                        onClick={() => this.OpenAyuda()}
                        id="tooltip333589074"
                        target="_blank"
                    >
                        <i className="fa fa-question"></i>
                        <span className="nav-link-inner--text d-lg-none ml-2">
                        <small><b>AYUDA</b></small> 
                        </span>
                    </NavLink>
                    </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        onClick={() => this.props.ChangeConfig(true)}
                        id="tooltip333589074"
                        target="_blank"
                    >
                        <i className="fa fa-cogs"></i>
                        <span className="nav-link-inner--text d-lg-none ml-2">
                        <small><b>CONFIGURACIÓN</b></small> 
                        </span>
                    </NavLink>
                    </NavItem>
                </Nav>

            </UncontrolledCollapse>
        </Container>
        </Navbar>

     </>
    );
  }

  logout() {
    auth.logout()
    this.props.history.push("/Auth");
  }
  OpenAyuda(){
    this.setState({ Ayuda: !this.state.Ayuda });
  }

}

export default withRouter(NavBar)

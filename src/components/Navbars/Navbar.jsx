import React from "react";
import  { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import Ayuda from "./Ayuda";
import { admin} from 'services/admin';

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
            imagen:''
        };
    this.OpenAyuda = this.OpenAyuda.bind(this); 
}
componentDidMount(){

    admin.GetLogo().then(data=>{
        var imagen='';
        if(data.success){
          imagen = "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, data.data.data));
        }
        this.setState({
          imagen: imagen
        })
        
      })
}
  render() {
      var color=this.props.user.color;
      var textColor=this.props.textColor;
    return (
      <>
        <Ayuda isOpen={this.state.Ayuda} OpenAyuda={this.OpenAyuda}/>
        <Navbar
            className="navbar-transparent"
            style={{backgroundColor:color?color:"#8965e0"}}
            expand="lg"
        >
        <Container >
        <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                alt="..."
                src={this.state.imagen}
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
                        src={this.state.imagen}
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
                    style={{color:textColor}}
                    >
                        <small><b>BUSCADOR</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="/upload"
                    style={{color:textColor}}
                    >
                        <small><b>COMPARTIR</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="/archivos"
                    style={{color:textColor}}
                    >
                        <small><b>MIS ARCHIVOS</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className="nav-link-icon"
                    href="/notas"
                    style={{color:textColor}}
                    >
                        <small><b>CALCULAR NOTA</b></small>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className="nav-link-icon"
                        style={{color:textColor}}
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
                        style={{color:textColor}}
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

  OpenAyuda(){
    this.setState({ Ayuda: !this.state.Ayuda });
  }

}

export default withRouter(NavBar)

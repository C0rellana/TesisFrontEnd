import React from "react";
import { Link } from "react-router-dom";
import { auth } from 'services/authenticacion';
import  { withRouter } from 'react-router-dom'
import Sidebar from "react-sidebar";
import { CirclePicker } from 'react-color';
import Ayuda from "./Ayuda";
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
} from "reactstrap";

class MiNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      color:false,
      nombre:'',
      imagen:'',
      Ayuda:false,
    };
    this.logout = this.logout.bind(this); 
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.OpenAyuda = this.OpenAyuda.bind(this);
    
    
  }
   componentDidMount(){

    auth.GetAvatar().then(data=>{
      var imagen ="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg";
      if(data.success){
        imagen = "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, data.data.data));
      }
      this.setState({
        imagen: imagen
      })
      
    })

    this.setState({
      color:this.props.user.color,
      nombre: this.props.user.nombre,
    })
  
  }


  logout() {
    auth.logout()
    this.props.history.push("/Auth");
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }
  changeColor(color, event){
    auth.FChangeColor(color.hex).then(()=>{
      window.location.reload();
    })
   
  }

  OpenAyuda(){
    this.setState({ Ayuda: !this.state.Ayuda });
  }

  changeImg(event){
    const formData = new FormData();
    var file=event.target.files[0];
    formData.append('file', file);
    auth.ChangeAvatar(formData)
    this.setState({
      imagen: URL.createObjectURL(file)
    })
  }

  render() {
    return (
      <>
      <Ayuda isOpen={this.state.Ayuda} OpenAyuda={this.OpenAyuda}/>

      <Sidebar
        sidebar={
          <Container>
            <br/> <br/> <br/> <br/> <br/>
            <div align="center">
              <h4><b>@{this.state.nombre} </b></h4>
               <div className="container2">
                <img src={this.state.imagen} alt="" className="image" style={{"width":"150px"}}/>
                 <div className="middle">
                  <label htmlFor="file-input">
                      <i className="fa fa-camera fa-2x"></i>
                  </label>
                  <input id="file-input" type="file" accept="image/*" onChange={this.changeImg}/>
                </div> 
              </div> 
              <hr></hr>  
              <h4><b>Elige tu color preferido</b></h4>
              <br/>   
              <CirclePicker
                triangle="hide"
                width="350px" 
                circleSize= {28}
                circleSpacing={10}
                onChange={ this.changeColor }
              />
              <hr></hr>
            </div>
           
          </Container>  
      }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", height:"auto", position: "fixed" } }}
        pullRight={true}
      >
       <></>
       </Sidebar>  


      <Navbar
      className="navbar-transparent"
      style={{backgroundColor:this.state.color?this.state.color:"#8965e0"}}
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
            {/* <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="/Acerca"
                >
                    <small><b>NOSOTROS</b></small>
                </NavLink>
            </NavItem> */}
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
                  
                    onClick={() => this.onSetSidebarOpen(true)}
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
}

export default withRouter(MiNavbar)

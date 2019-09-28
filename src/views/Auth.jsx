import React from "react";
import { auth } from 'services/authenticacion';
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Login from "components/Auth/Login";
import Registro from "components/Auth/Registro";
import Contrasena from "components/Auth/Contraseña";
import { ToastContainer, toast,Flip } from 'react-toastify';
import Reset from "components/Auth/Reset";

class Auth extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      opcion : "login",
      reset: true,
    }
     //Si esta logeado ->redirect
    auth.GetData().then(()=>{
      this.props.history.push("/");
     }).catch(err=>{
     })

   this.handleClick = this.handleClick.bind(this);
  
  }
  handleClick(val,estado,msg) {
    if(estado==="res"){
      toast.success(msg);
    }
    if(estado===true){
      toast.success('Se ha registrado correctamente');
    }
    this.setState({
      opcion: val,
      reset: false,
    });
  
    
  }
 

  render() {
    var reset= this.props.reset && this.state.reset;
    return (
      
      <> 
        <ToastContainer transition={Flip}
                position= "top-right"
                autoClose= {3000}
                hideProgressBar= {false}
                closeOnClick= {true}
                pauseOnHover= {true}
                draggable= {true}
        />
   
        <section className="section section-lg section-shaped" >
          <div className="shape shape-style-1 bg-orange">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
     
          <Container className=""  >
            <Row className="row-grid justify-content-between align-items-center" >
              <Col>
              </Col>
              <Col md="5">
                {reset
                ?<Reset handleClick = {this.handleClick}></Reset>
                :this.state.opcion==="password"
                  ?<Contrasena  handleClick = {this.handleClick}/>
                  :this.state.opcion==="login" 
                    ?<Login boolean={this.state.boolean} handleClick = {this.handleClick} ></Login>  
                    :<Registro boolean={this.state.boolean} handleClick = {this.handleClick}> </Registro> 
                   
              }
              </Col>
              <Col>
              </Col>
              </Row>
          </Container>
         
        </section>
 
  
        
      </>
    );
  }
}

export default Auth;

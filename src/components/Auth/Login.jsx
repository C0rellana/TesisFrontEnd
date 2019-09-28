import React from "react";
import { auth } from 'services/authenticacion';
import  { withRouter} from 'react-router-dom'

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardHeader,
  UncontrolledAlert
} from "reactstrap";



class Login extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      correo:'',
      password:'',
      alert: false,
      message:'',
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDismiss = this.onDismiss.bind(this); 
  }

  //Cada vez que hay un cambio en el formulario(inputs)
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({
      [name]: value
    });
  }

  //boton de login
   handleSubmit(event) {
    event.preventDefault();//cancelar eventos de redireccion
    auth.login(this.state.correo, this.state.password)
    .then(data=>{
      if(data.success){
        this.props.history.push("/")
      }
      else{
        this.setState({
          alert:true,
          message:data.message,
        })
      }
    }); 
  }
  onDismiss() {
    this.setState({alert: false})
  }




  render() {
    const {handleClick} = this.props;

    return (
      <>
                <Card className="shadow border-1">
                    <CardHeader className="bg-white pb-4">
                        <div className="text text-center">
                            <strong><big>COMPARTE UCM 2019 </big></strong>
                            <br/>
                            <strong><small>INICIAR SESION</small></strong>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                    <UncontrolledAlert color="danger" fade={true} isOpen={this.state.alert} toggle={this.onDismiss}>
                      <small >
                        {this.state.message}
                      </small>
                    </UncontrolledAlert>

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="">
                        <InputGroup className="input-group">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input  required placeholder="Correo" name="correo" type="email" onChange={this.handleInputChange}/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup>
                        <InputGroup className="">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              required
                              placeholder="Contraseña"
                              type="password"
                              autoComplete="off"
                              name="password"
                              onChange={this.handleInputChange}
                            />
                        </InputGroup>
                        </FormGroup>
                        <div className="text-right">
                        <a className="text-light text-center miboton" href="#/"  onClick={e=>handleClick("password")}  >
                        <small>¿Olvidó la contraseña?</small>
                        </a>

                        </div>
            
                        <div className="text-center"> 
                        <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                        >
                            Entrar
                        </Button>
                
                        </div>
                        <div className="text-center">
                        <hr></hr>
                       
                        <button className="text-light text-center miboton" onClick={e=>handleClick("register")} >
                            <small>¿No tienes una cuenta? <strong>Crear cuenta</strong></small>            
                        </button>
                      
                        </div>
                    </Form>
                    </CardBody>
                </Card>
     
     
      </>
    );
  }
}

export default withRouter(Login)

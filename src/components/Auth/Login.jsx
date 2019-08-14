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
  CardHeader
} from "reactstrap";



class Login extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      correo:'',
      password:'',
      alert: false,
    };
    

     //Si esta logeado ->redirect
    if (auth.currentUserValue) { 
      console.log("Ya esta logeado: ->Redirect to / ")
      this.props.history.push("/");
        
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 

  }


  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    auth.login(this.state.correo, this.state.password)
        .then(
            response => {
              if(response.success){
                console.log("logueado con exito: Redirect to /")
                this.props.history.push("/");
              }
            },
        );
  }



  render() {
    const {handleClick} = this.props;
    
    return (
      <>
          <section>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-4">
                        <div className="text text-center">
                                <strong><big>Iniciar Sesión </big></strong>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-email-83" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" name="correo" type="email" onChange={this.handleInputChange}/>
                        </InputGroup>
                        </FormGroup>
                        <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            name="password"
                            onChange={this.handleInputChange}
                            />
                        </InputGroup>
                        </FormGroup>
                        <div className="text-right">
                        <a className="text-light" href="#pablo" onClick={e => e.preventDefault()} >
                        <small>¿Olvido la contraseña?</small>
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
                       
                        <button className="text-light text-center miboton" onClick={handleClick} >
                            <small>¿No tienes una cuenta? <strong>Crear cuenta</strong></small>            
                        </button>
                  
                        </div>
                    </Form>
                    </CardBody>
                </Card>
          </section>
     
      </>
    );
  }
}

export default withRouter(Login)

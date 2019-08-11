import React from "react";
import axios from 'axios';

// reactstrap components

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


class Loginv1 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      
      email:'',
      password:'',
      alert: false,
    };
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
    console.log(this.state)

    axios.post('http://localhost:8000/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(response => { 
      sessionStorage.setItem('email', this.state.email)
      sessionStorage.setItem('nombre', response.data.nombre)
      sessionStorage.setItem('key', response.data.api_key)
    
      //console.log(response.data)
      this.props.history.push('/')
    })
    .catch(error => {
      console.log(error.response.data)
      this.setState({alert: true})
      this.setState({mensaje: error.response.data.message})
  
    });
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
                            <Input placeholder="Email" name="email" type="email" onChange={this.handleInputChange}/>
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
                       
                        <a className="text-light text-center" onClick={handleClick} href="/#">
                            <small>¿No tienes una cuenta? <strong>Crear cuenta</strong></small>            
                        </a>
                  
                        </div>
                    </Form>
                    </CardBody>
                </Card>
          </section>
     
      </>
    );
  }
}

export default Loginv1;

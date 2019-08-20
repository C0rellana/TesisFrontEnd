import React from "react";
import { IoIosThumbsDown } from "react-icons/io";
import  { withRouter} from 'react-router-dom'
import { auth } from 'services/authenticacion';
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
  UncontrolledAlert,
  CardHeader
} from "reactstrap";


class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      rut: '',
      email:'',
      password:'',
      c_password:'',
      alert: false,
      mensaje:''
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onDismiss() {
    this.setState({alert: false})
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
    var object={
      nombre: this.state.nombre,
      rut: this.state.rut,
      correo: this.state.email,
      password: this.state.password,
    }
  
    auth.register(object)
    .then(
        response => {
         alert(response.message)
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
                        <strong><big>Registro </big></strong>
                    </div>
                </CardHeader>
                <CardBody className=" px-lg-5 py-lg-5">
                    <UncontrolledAlert color="danger" fade={false} isOpen={this.state.alert} toggle={this.onDismiss}>
                      
                        <IoIosThumbsDown /> 
                        {" "}
                        <span className="alert-inner--text">
                            <strong>Error!</strong> {this.state.mensaje}
                        </span>
                    </UncontrolledAlert>


                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-hat-3" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Nombre & Apellido" name="nombre" type="text" onChange={this.handleInputChange} required/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-hat-3" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input  name="rut" type="text" pattern="[0-9]{7,8}-[0-9Kk]{1}"  placeholder="Rut: 12345678-5" onChange={this.handleInputChange} required/>
                            </InputGroup>
                        </FormGroup>
                    
                        <FormGroup >
                            <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-email-83" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Correo" type="email" name="email"  onChange={this.handleInputChange}required/>
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
                                placeholder="Contraseña"
                                type="password"
                                autoComplete="off"
                                name="password"
                                onChange={this.handleInputChange}
                                required
                                minlength="6" 
                            />
                            </InputGroup>
                        </FormGroup>
            
                        <div className="text-center"> 
                            <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            >
                            Crear Cuenta
                            </Button>
                        </div>
                        <div className="text-center">
                        <hr></hr>

                        <button className="text-light text-center miboton" onClick={handleClick} >
                            <small>Ya tengo una cuenta.  <strong>Iniciar Sesión</strong></small>       
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

export default withRouter(Register)


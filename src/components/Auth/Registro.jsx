import React from "react";
import  { withRouter} from 'react-router-dom'
import { auth } from 'services/authenticacion';
import BaseSelect from "react-select";
import * as Constants from 'services/Constantes'
import { carrera } from 'services/carrera';
import FixRequiredSelect from "services/FixRequiredSelect";
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
      mensaje:'',
      carreras:[],
      carrera_value:""
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeCarrera = this.changeCarrera.bind(this);
    
  }

  componentDidMount(){
    carrera.getAllCarreras().then(carreras=>{
      carreras.map(function callback(value, index, array) {
        value.label=value.nombre;
        value.value=value.id;
        return value
    });
      this.setState({carreras:carreras})
    })
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

  checkRut(rut) {
    
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    var cuerpo = valor.slice(0,-1);
    var dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    var suma = 0;
    var multiplo = 2;
    var index;
    var dvEsperado;
    // Para cada dígito del Cuerpo
    for(var i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
     // Calcular Dígito Verificador en base al Módulo 11
     dvEsperado = 11 - (suma % 11);    
     // Casos Especiales (0 y K)
     dv = (dv === 'K')?10:dv;
     dv = (dv === 0)?11:dv; 
     // Validar que el Cuerpo coincide con su Dígito Verificador
     if(dvEsperado !== parseInt(dv)) { rut.setCustomValidity("RUT Inválido"); return false; }
     
     // Si todo sale bien, eliminar errores (decretar que es válido)
     rut.setCustomValidity('');
}

  async handleSubmit(event) {
    event.preventDefault();
    var object={
      nombre: this.state.nombre,
      rut: this.state.rut,
      correo: this.state.email,
      password: this.state.password,
      cod_carrera:this.state.carrera_value.id,
    }
  
    var data= await auth.register(object)
    if(data.success){
      this.props.handleClick("login",true);
    }
    else{
      this.setState({
        alert:true,
        message:data.message,
      })
    }
  }

  changeCarrera(carrera){
    this.setState({carrera_value:carrera})
  }

  render() {
    const Select = props => (
      <FixRequiredSelect
        {...props}
        SelectComponent={BaseSelect}
      />
    );

    const {handleClick} = this.props;

    return (
      <>            
            <Card className="shadow border-0">
              <CardHeader className="bg-white pb-4">
                  <div className="text text-center">
                      <strong><big>COMPARTE UCM 2019 </big></strong>
                      <br/>
                      <strong><small>REGISTRO</small></strong>
                  </div>
                </CardHeader>
                <CardBody className=" px-lg-5 py-lg-5">
                <UncontrolledAlert color="danger" fade={true} isOpen={this.state.alert} toggle={this.onDismiss}>
                      <small >
                        {this.state.message}
                      </small>
                 </UncontrolledAlert>


                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <InputGroup className=" mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-hat-3" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Nombre completo" name="nombre" type="text" onChange={this.handleInputChange} required/>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-hat-3" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input  name="rut" type="text"  
                            onInput={e=>this.checkRut(e.target)}
                            placeholder="Ingrese rut sin puntos"
                             onChange={this.handleInputChange} required/>
                            </InputGroup>
                        </FormGroup>    
                                       
                    
                        <FormGroup >
                            <InputGroup className=" mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-email-83" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Correo" type="email" name="email"  onChange={this.handleInputChange}required/>
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
                                placeholder="Contraseña"
                                type="password"
                                autoComplete="off"
                                name="password"
                                minLength="6"
                                onChange={this.handleInputChange}
                                required
                                
                            />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Select
                                closeMenuOnSelect={true}
                                components={Constants.animatedComponents}
                                placeholder="Selecciona tu carrera"                    
                                clearable={true}
                                required
                                value={this.state.carrera_value}
                                options={this.state.carreras}
                                styles={Constants.colourStyles}
                                onChange={this.changeCarrera}
                              /> 
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

                        <button className="text-light text-center miboton" onClick={e=>handleClick("login")} >
                            <small>Ya tengo una cuenta.  <strong>Iniciar Sesión</strong></small>       
                        </button>
          
                        </div>
                    </Form>
                </CardBody>
            </Card>  
        
      </>
    );
  }
}

export default withRouter(Register)


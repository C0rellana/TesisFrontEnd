import React from "react";
import {
    Row,
    Col,
    Input,
    Button,
    Form
  } from "reactstrap";
import { role} from 'services/roles';
import { toast} from 'react-toastify';

class Cga extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        enable:'',
        rut:'',
        data:[]
      };
      this.DeleteCga = this.DeleteCga.bind(this);
      this.NewCga = this.NewCga.bind(this);
  }
  componentDidMount(){
    role.getRoleCga().then(r=>{
      this.setState({
        data:r
      }) 
    })
  }


  DeleteCga(rut){
      var obj={
        rut:rut,
        role:"USER",
      }
      role.EditRol(obj).then(r=>{
        if(r.status){
          role.getRoleCga().then(r=>{
            this.setState({
              data:r
            }) 
          })
          toast.success('CGA eliminado');
        }
      });

  }
  NewCga(e){
      e.preventDefault();
      var obj={
        rut:this.state.rut,
        role:"CGA",
      }
      role.EditRol(obj).then(r=>{
        if(r.status){
          role.getRoleCga().then(r=>{
            this.setState({
              data:r
            }) 
          })
          toast.success('Nuevo CGA añadido');
        }
        else{
          toast.error(r.message);
        }
       
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
     dv = (parseInt(dv) === 0)?11:parseInt(dv); 
     // Validar que el Cuerpo coincide con su Dígito Verificador
     if(dvEsperado !== parseInt(dv)) { rut.setCustomValidity("RUT Inválido"); return false; }
     
     // Si todo sale bien, eliminar errores (decretar que es válido)
     rut.setCustomValidity('');
}

  render() {
   
    var data= this.state.data;

    return (
      <>
       <p><small>Asignar rol de <b>CGA</b> a un usuario.</small></p>
      <Row>
        <Col>
    
        {
          data.map((user, index) => 
          <Row key={index}>
              <Col  md="6" >
                <Input value={user.nombre.toUpperCase()}  disabled={true}/> 
                <br/>
              </Col>
              <Col md="3">
                <Input value={user.rut} disabled={true}/><br/>
                </Col>
              <Col  md="3">
                <Button onClick={e=>this.DeleteCga(user.rut)}> <i className="fa fa-trash"></i></Button>
                <br/><br/>
              </Col>
              </Row>
          )
          }
          <Form onSubmit={this.NewCga} >
           <Row>
              <Col md="6">   
                  <br/>
                </Col>
                <Col md="3">
                  <Input placeholder="Rut"  onInput={e=>this.checkRut(e.target)} onChange={e=>this.setState({rut:e.target.value})}  required/><br/>
                  </Col>
                <Col md="3">
                  <Button type="submit"> <i className="fa fa-save"></i></Button>
                  <br/> <br/>
                </Col>
              </Row>
              </Form>
          </Col>
        </Row>
     
        </>
    );
  }
}

export default Cga;

import React from "react";
import * as Constants from 'services/Constantes'
import {
    Row,
    Col,
    Input,
    Button,
    Form
  } from "reactstrap";
import BaseSelect from "react-select";
import FixRequiredSelect from "services/FixRequiredSelect";
import { role} from 'services/roles';
import { carrera} from 'services/carrera';
import { toast} from 'react-toastify';


class Director extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        enable:'',
        data:[],
        carreras:[],
        rut:'',
        carrera:null,
        new_carrera:{},
        ListFilter:[],
      };
      this.edit = this.edit.bind(this);
      this.update = this.update.bind(this);
      this.DeleteDirector = this.DeleteDirector.bind(this);
      this.NewDirector = this.NewDirector.bind(this);
      this.search = this.search.bind(this);
  }
  componentDidMount(){
    role.getRoleDirector().then(r=>{
      this.setState({
        data:r
      }) 
    })
    carrera.getAllCarreras().then(r=>{
      r=r.map((value) => {
        value.label =value.nombre;
        value.value =value.id;
        return value;
      });
      this.setState({
        carreras:r
      }) 
    })

  }

  search(e){
    var List = this.state.data;
    var q= e.toLowerCase();

    List = List.filter(data => {

      if(data.nombre.toLowerCase().indexOf(q) !== -1 || data.rut.indexOf(q) !== -1 ){
        return data;
      }
      return null
    });
    if(List.length>0){
      this.setState({
        ListFilter: List
     })
    }
    
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
    const Select = props => (
      <FixRequiredSelect
        {...props}
        SelectComponent={BaseSelect}
      />
    );
  

    var data = this.state.ListFilter.length>0
    ?this.state.ListFilter
    :this.state.data;


    var carreras=this.state.carreras;

    return (
      <>
        <p><small>Asignar rol de <b>DIRECTOR</b> a un usuario.</small></p>
        <Row>
          <Col>    
            <Row>
              <Col md="9">
                <Input type="search" onChange={e=>this.search(e.target.value)} placeholder="Filtrar directores"/>
              </Col>
            </Row>
            
          <br/>
           {/* EDITAR DIRECTOR */}
          {
            data.map((user, index) => 
            <Row key={index}>
                <Col md="3" >
                  <Input value={user.nombre.toUpperCase()} style={{height:"37px"}} disabled={true}/> 
                  <br/>
                </Col>
                <Col md="3">
                  <Input value={user.rut} disabled={true} style={{height:"37px"}}/><br/>
                </Col>
                <Col md="3">
                  <Select
                      isDisabled={this.state.enable!==index}
                      closeMenuOnSelect={true}
                      components={Constants.animatedComponents}
                      clearable={true}
                      value={
                        this.state.enable===index
                          ?this.state.carrera
                            ?this.state.carrera
                            :user.Carrera
                          :user.Carrera
                    }
                      options={carreras} 
                      styles={Constants.colourStyles}
                      onChange={e=>this.setState({carrera:e})}    
                    />
                </Col>
                <Col  md="3">
                
                  {this.state.enable!==index
                      ? <Button  onClick={e=>this.edit(index)}> <i className="fa fa-pencil"></i></Button>
                  
                      : <Button onClick={e=>this.update(user.rut)}> <i className="fa fa-check"></i></Button>
                  } 
                  <Button onClick={e=>this.DeleteDirector(user.rut)}> <i className="fa fa-trash"></i></Button>
                  <br/>
                </Col>
                
                </Row>
            )
            }

            {/* NUEVO DIRECTOR */}
          <Form onSubmit={this.NewDirector} >
              <Row>
                  <Col md="3">
                      {/* <Input placeholder="Nombre"/>  */}
                      <br/>
                    </Col>
                    <Col md="3">
                      <Input style={{height:"37px"}} required onInput={e=>this.checkRut(e.target)} onChange={e=>this.setState({rut:e.target.value})} placeholder="Rut"/><br/>
                    </Col>
                    <Col md="3">
                      <Select
                        required 
                        closeMenuOnSelect={true}
                        components={Constants.animatedComponents}
                        placeholder="Seleccionar carrera"
                        clearable={true}
                        value={this.state.new_carrera}
                        options={carreras} 
                        styles={Constants.colourStyles}
                        onChange={e=>this.setState({new_carrera:e})}
                      />
                      <br/>
                    </Col>
                    <Col md="3">
                      <Button > <i className="fa fa-save"></i></Button>
                      <br/>
                    </Col>
                  </Row>
                </Form>
            </Col>
          </Row>
      
        </>
    );
  }


  edit(e){
    this.setState({
      enable:e,
    })
  }
  update(rut){
    var obj={
      rut:rut,
      role:"DIRECTOR",
      carrera:this.state.carrera?this.state.carrera.value:null,
    }
    role.EditRol(obj).then(r=>{
      if(r.status){
        role.getRoleDirector().then(r=>{
          this.setState({
            data:r,
            enable:'',
            carrera:null,
          }) 
        })
        toast.success('Director Editado');
      }
      else{
        toast.error(r.message);
      }
    
    });
  }

  DeleteDirector(rut){
    var obj={
      rut:rut,
      role:"USER",
    }
    role.EditRol(obj).then(r=>{
      if(r.status){
        role.getRoleDirector().then(r=>{
          this.setState({
            data:r
          }) 
        })
        toast.success('Director eliminado');
      }
      else{
        toast.error(r.message);
      }
     
    });

  }
  NewDirector(e){
    e.preventDefault();
    var obj={
      rut:this.state.rut,
      role:"DIRECTOR",
      carrera:this.state.new_carrera.value,
    }
    role.EditRol(obj).then(r=>{
      if(r.status){
        role.getRoleDirector().then(r=>{
          this.setState({
            data:r
          }) 
        })
        toast.success('Nuevo DIRECTOR añadido');
      }
      else{
        toast.error(r.message);
      }
     
    });

  }
}

export default Director;

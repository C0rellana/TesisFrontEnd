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
                  <br></br>
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
                      <Input style={{height:"37px"}} required onChange={e=>this.setState({rut:e.target.value})} placeholder="Rut"/><br/>
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

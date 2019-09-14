import React from 'react';
import {
  Row,
  Col,
  Input,
  FormGroup,
} from "reactstrap";

import { categoria } from 'services/categoria';
import { ramo } from 'services/ramos';
import BaseSelect from "react-select";
import * as Constants from 'services/Constantes'
import FixRequiredSelect from "services/FixRequiredSelect";
class Enlaces extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        categorias:[], ramos: [],contenidos:[],
        cat_value:[],ramo_value:[],cont_value:[],
      }
      this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        this.setState({
          ramos: await ramo.getRamosbyCarrera(),
          categorias: await categoria.getAllCategoriasbyCarrera()
        })
        
    }
    onChange(e,name1,name){
        this.setState({ 
          [name1]:e,
          [name]:e.value 
        });
        this.props.form(name,e.value);
      };
    render() {
        const Select = props => (
            <FixRequiredSelect
              {...props}
              SelectComponent={BaseSelect}
            />
          );
    
      return (
        <Row>
            <Col md="6">
            <FormGroup>
                <Select 
                placeholder="Categorias"
                styles={Constants.colourStyles}    
                options={this.state.categorias} 
                isSearchable 
                value={this.state.cat_value}
                onChange={(e) => this.onChange(e,'cat_value','categoria')}   
                required 
                />
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
            <Select 
                placeholder="Ramo (COD-1111)"
                styles={Constants.colourStyles}    
                options={this.state.ramos}
                isSearchable 
                value={this.state.ramo_value}
                onChange={(e) => this.onChange(e,'ramo_value')}   
                required 
                />
            </FormGroup> 
            </Col>
            <Col md="6">     
            <FormGroup>
                <Select
                placeholder="Contenido"
                options={this.state.ramo_value.Contenidos}
                value={this.state.cont_value}
                styles={Constants.colourStyles}
                onChange={(e) => this.onChange(e,'cont_value','contenido')}  
                required  
            
                />
            </FormGroup> 
            </Col>

            <Col md="6">     
            <FormGroup>
                <Input
                name="descripcion"
                placeholder="Describa los archivos para ayudar a la busqueda de estos."
                rows="1"
                required
                type="textarea"
                maxLength="100"
                onChange={(e) => this.props.form('descripcion',e.target.value)}  

                />
            </FormGroup>
            </Col>
        </Row>
    
      )
  }
}

export default Enlaces;

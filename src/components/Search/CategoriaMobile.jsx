import React from "react";
import { categoria } from 'services/categoria';
import Select from 'react-select';
import * as Constants from 'services/Constantes'

class Categoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Categorias:[],
      CategoriaValues:[],
    };
    this.changeCategoria= this.changeCategoria.bind(this)
  };

  async componentDidMount() {
    this.setState({
      Categorias:await categoria.getAllCategoriasbyCarrera()
    });
  };
   

  changeCategoria(obj){
    
    this.setState({CategoriaValues:obj})
    var ids= []
    if(obj){
        obj.forEach(element => {
        return ids.push(element.value)
        });
    }
    this.props.changeCategoria(ids)  
  }
   
  

  render() {  

   return (
    <Select
        closeMenuOnSelect={true}
        components={Constants.animatedComponents}
        placeholder="Todas las Categorias"
        isMulti
        clearable={true}
        value={this.state.CategoriaValues}
        options={this.state.Categorias}
        styles={Constants.colourStyles}
        onChange={this.changeCategoria}
    />      
    );
  }
}

export default Categoria;


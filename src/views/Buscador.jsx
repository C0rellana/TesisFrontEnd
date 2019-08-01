
import React from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Search from "./IndexSections/Search.jsx";
import {
  Container,

} from "reactstrap";

import { FaSearch } from "react-icons/fa";
const animatedComponents = makeAnimated();

const carreras=[
  { value: '1', label: 'Informatica' },
  { value: '2', label: 'Construccion' },
  { value: '3', label: 'Enfermeria' }
]
const ramos=[
  { value: '1', label: 'Calculo 1' },
  { value: '2', label: 'Algebra 2' },
  { value: '3', label: 'Intro a la comp.' }
]


class Inicio extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      boolean : true
    }
   this.handleClick = this.handleClick.bind(this);
  
  }
  handleClick() {
    this.setState(state => ({
      boolean: !state.boolean
    }));
  }
 


  render() {
    return (
      <>
        <section className="section section-lg section-shaped">
        <style>{'body { background-color: orange; }'}</style>
        <Container>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <Search></Search>
            </div>
          </div>
          <div className="col-md-6">
            <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            placeholder="Todas las carreras"
            isMulti
            options={carreras}
            />
          </div>
          <div className="col-md-6">
            <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            placeholder="Todos los ramos"
            isMulti
            options={ramos}
      
            />
        </div>
 
    
        </div>
        </Container>
  
        </section>
      </>
    );
  }
}

export default Inicio;

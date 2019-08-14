
import React from "react";
import Select from 'react-select';
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import * as Constants from './IndexSections/misconstantes'
import Tabs from "./IndexSections/Tabs";

import {
  Container,

} from "reactstrap";


class Buscador extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      boolean : true,
      ramos : [],
      
    }
   this.handleClick = this.handleClick.bind(this);
   this.selectvalue = this.selectvalue.bind(this);
  
  }
  handleClick() {
    this.setState(state => ({
      boolean: !state.boolean
    }));
  }
  
  selectvalue(e) {
    var salida =[]
    if(e !=null){
      for (let i = 0; i < e.length; i++) {
        salida =salida.concat(e[i].ramos);
      }
    }
  
    this.ramos = salida
    this.setState((state, props) => {
      return {ramos: salida};
    });
    
    
  }

  render() {
  
    return (
      <>
       <MiNavbar></MiNavbar>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todas las carreras"
              isMulti
              options={Constants.carreras}
              styles={Constants.colourStyles}
              onChange={this.selectvalue}

              />
            </div>
            <div className="col-md-6">
              <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todos los ramos"
              isMulti
              options={this.ramos}
              styles={Constants.colourStyles}
        
              />
            </div>
          </div>
          <Tabs></Tabs>
        </Container>
      </>
    );
  }
}

export default Buscador;

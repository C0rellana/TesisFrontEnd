
import React from "react";
import Select from 'react-select';
import * as Constants from 'services/Constantes'
import { ramo } from 'services/ramos';

class SelectRamos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ramos: [],
    };
  }

   componentDidMount() {
    ramo.getRamosbyCarrera().then(data=>{
      this.setState({
        ramos: data 
      })
    })
    
  };

  render() {
    return (

        <Select
          closeMenuOnSelect={true}
          components={Constants.animatedComponents}
          placeholder="Seleccionar Ramo"
          isClearable
          options={this.state.ramos}
          styles={Constants.colourStyles}
          onChange={e=>this.props.changeRamo(e)}
        />
  );

  }
}

export default SelectRamos;


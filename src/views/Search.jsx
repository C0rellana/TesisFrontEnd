import React from "react";
import Select from 'react-select';
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import * as Constants from 'services/Constantes'
import Tabs from "components/Search/Tabs";
import { carrera } from 'services/carrera';
import { Container} from "reactstrap";

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      boolean : true,
      ramos : [],
      CarreraRamos: []
    }
   this.handleClick = this.handleClick.bind(this);
   this.changeCarrera = this.changeCarrera.bind(this);
  
  }
  componentDidMount() {
    //obtener las carreras de la API
    carrera.getAllCarrerasRamos()
        .then(res => {
            this.setState({
                CarreraRamos: res
            })
        })
   }
  handleClick() {
    this.setState(state => ({
      boolean: !state.boolean
    }));
  }
  //VALORES PARA RAMOS SEGUN CARRERA
  changeCarrera(e) {
    var salida =[]
    if(e !=null){
      for (let i = 0; i < e.length; i++) {
        salida =salida.concat(e[i].Ramos);
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
              options={this.state.CarreraRamos}
              styles={Constants.colourStyles}

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

export default Search;

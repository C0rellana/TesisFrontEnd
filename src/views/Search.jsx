import React from "react";
import Select from 'react-select';
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import * as Constants from 'services/Constantes'
import Tabla from "components/Search/Tabla";
import { carrera } from 'services/carrera';
import { archivo } from 'services/archivos';
import { Container} from "reactstrap";
class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      boolean : true,
      ramos : [],
      CarreraRamos: [],
      contenidos:[],
      MiCarrera:  {value:111 , label:"Mi Carrera"},
      DATAFILTER:[],
      ramos_id:[],
      carreras_id:[],
      contenidos_id:[]
    
    }
   this.handleClick = this.handleClick.bind(this);
   this.changeCarrera = this.changeCarrera.bind(this);
   this.changeRamo = this.changeRamo.bind(this);
   this.changeContenido = this.changeContenido.bind(this);
  }
  async componentDidMount() {

    this.setState({
        CarreraRamos:  await carrera.getAllCarrerasRamos(),
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
      var carreras_id= []
      if(e !=null){
        for (let i = 0; i < e.length; i++) {
          salida =salida.concat(e[i].Ramos);
          carreras_id=carreras_id.concat(e[i].value)
        }
      }
      this.ramos=salida;
      this.setState({ramos: salida, carreras_id: carreras_id });

      //filtrar archivos por carrera
      archivo.FilterArchivo(carreras_id,[],[]).then(data => {
        this.setState({
          DATAFILTER:data
        })
      })
    
    }
    //VALORES PARA CONTENIDOS SEGUN RAMOS
    changeRamo(e) {
      var salida =[]
      var ramos_id =[]
      if(e !=null){
        for (let i = 0; i < e.length; i++) {
          salida =salida.concat(e[i].Contenidos);
          ramos_id=ramos_id.concat(e[i].value)
        }
      }
      this.contenidos = salida
      this.setState((state, props) => {
        return {contenidos: salida, ramos_id: ramos_id};
      });

    //filtrar archivos por ramo
     archivo.FilterArchivo(this.state.carreras_id,ramos_id,[]).then(data => {
      this.setState({
        DATAFILTER:data
      })
    })
    }

    //FILTRAR DATA POR CONTENIDO
    changeContenido(e) {
      var contenidos_id =[]
      if(e !=null){
        for (let i = 0; i < e.length; i++) {
          contenidos_id=contenidos_id.concat(e[i].value)
        }
      }
      this.setState((state, props) => {
        return {contenidos_id: contenidos_id};
      });

     archivo.FilterArchivo(this.state.carreras_id,this.state.ramos_id,contenidos_id).then(data => {
      this.setState({
        DATAFILTER:data
      })
    })
    }

  render() {
    //console.log(this.state.DATAFILTER)
    return (
      <>
       <MiNavbar></MiNavbar>
        <Container>
          <div className="row">
            <div className="col-md-4">
              <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todas las carreras"
              //defaultValue={this.state.MiCarrera}
              isMulti
              options={this.state.CarreraRamos}
              styles={Constants.colourStyles}
              onChange={this.changeCarrera}

              />
            </div>
            <div className="col-md-4">
              <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todos los ramos"
              isMulti
              onChange={this.changeRamo}
              options={this.ramos}
              styles={Constants.colourStyles}
        
              />
            </div>
            <div className="col-md-4">
              <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todos los contenidos"
              isMulti
              onChange={this.changeContenido}
              options={this.contenidos}
              styles={Constants.colourStyles}
        
              />
            </div>
          </div>
          <Tabla DATAFILTER = {this.state.DATAFILTER} ></Tabla>
        </Container>
      </>
    );
  }
}

export default Search;

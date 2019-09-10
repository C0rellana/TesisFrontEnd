import React from "react";
import Select from 'react-select';
import * as Constants from 'services/Constantes'
import { carrera } from 'services/carrera';
import { archivo } from 'services/archivos';
import { Col,Row,Input} from "reactstrap";
class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      Ramos : [],
      CarreraRamos: [],
      Contenidos:[],
      DataFilter:[],
      Ramos_Ids:[],
      Carreras_Ids:[],
      Contenidos_Ids:[],
      Categorias_Ids:[],
      Busqueda:'',
      valueCarrera:''
    }
    this.getData = this.getData.bind(this);
    this.changeCarrera = this.changeCarrera.bind(this);
    this.changeRamo = this.changeRamo.bind(this);
    this.changeContenido = this.changeContenido.bind(this);
    this.changeBusqueda = this.changeBusqueda.bind(this);
    this.PressEnter = this.PressEnter.bind(this);
    
   
  }
  async componentDidMount() {
    var MiCarrera= await carrera.GetCarrera();
    this.setState({
        CarreraRamos:  await carrera.getAllCarrerasRamos(), 
        valueCarrera:  MiCarrera,
        Carreras_Ids:[MiCarrera.id]
    })
    var value=this.state.CarreraRamos.filter(option => option.value === MiCarrera.value)
    this.changeCarrera(value)
  }
  
   //FILTRAR POR CARRERA
    async changeCarrera(c) {
        var Ramos =[]; 
        var Carreras_Ids= [];
        if(c){
            for (var i = 0; i < c.length; i++) {
                Ramos =Ramos.concat(c[i].Ramos);
                Carreras_Ids=Carreras_Ids.concat(c[i].value)
            }   
        } 
        this.setState({Ramos: Ramos, Carreras_Ids:Carreras_Ids,valueCarrera:c}, () => {
            this.getData();    
        });
    }
        
    //FILTRAR POR RAMOS
    async changeRamo(r) {
        var Contenidos =[]; 
        var Ramos_Ids= [];

        if(r){
            for (var i = 0; i < r.length; i++) {
                Contenidos =Contenidos.concat(r[i].Contenidos);
                Ramos_Ids=Ramos_Ids.concat(r[i].value)
            }  
        }   
        this.setState({Contenidos: Contenidos,Ramos_Ids:Ramos_Ids}, () => {
            this.getData();    
        }); 
    }

    //FILTRAR POR CONTENIDO
    async changeContenido(c) {
        var Contenidos_Ids =[];            
        if(c){
            for (var i = 0; i < c.length; i++) {
                Contenidos_Ids=Contenidos_Ids.concat(c[i].value)
            }  
        }  
        this.setState({Contenidos_Ids:Contenidos_Ids}, () => {
            this.getData();    
        });
    }
    changeBusqueda(b) {       
        this.setState({Busqueda:b}); 
          
    }
    PressEnter(event){
      if(event.key==='Enter' || event==="click"){
        this.getData();  
      }
    }
    

    async getData(){
      var Data= await archivo.FilterArchivo(
            this.state.Carreras_Ids,
            this.state.Ramos_Ids,
            this.state.Contenidos_Ids,
            this.state.Busqueda,
            )   
      this.props.changeData(Data);
    }
    

  render() {
      return (
      <>    
          <Row>
            <Col md="12">
            <div className="input-group input-group-alternative mb-4" style={{"zIndex": "0","boxShadow": "rgba(196, 89, 22, 0.48) 0px 1px 3px, rgba(0, 0, 0, 0.02) 0px 1px 0px"}}>
                <Input className="form-control" placeholder="Buscador de contenidos" onChange={(e)=> this.changeBusqueda(e.target.value)} onKeyDown={this.PressEnter} type="text"/>
                <div className="input-group-prepend">
                  <button className="btn btn-warning" onClick={e=>this.PressEnter("click")} type="button">
                  <i className="fa fa-search" ></i>
              </button>
                </div>
            </div>
            </Col>
            <Col md="4">
              <Select
                closeMenuOnSelect={true}
                components={Constants.animatedComponents}
                placeholder="Todas las carreras"
                isMulti
                clearable={true}
                value={this.state.valueCarrera}
                options={this.state.CarreraRamos}
                styles={Constants.colourStyles}
                onChange={this.changeCarrera}
              />
              <br/>
            </Col>
            
            <Col md="4">
              <Select
                closeMenuOnSelect={true}
                components={Constants.animatedComponents}
                placeholder="Todos los ramos"
                isMulti
                onChange={this.changeRamo}
                options={this.state.Ramos}
                styles={Constants.colourStyles}
              />
               <br/>
               </Col>
            <Col md="4">
              <Select
                closeMenuOnSelect={true}
                components={Constants.animatedComponents}
                placeholder="Todos los contenidos"
                isMulti
                onChange={this.changeContenido}
                options={this.state.Contenidos}
                styles={Constants.colourStyles}
              />
               <br/>
            </Col>
        </Row>     
 
      </>
    );
  }
}

export default Search;

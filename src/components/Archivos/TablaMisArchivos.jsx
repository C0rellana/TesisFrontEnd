import React from 'react';
import {Container} from "reactstrap";
import MaterialTable , { MTableEditRow } from 'material-table';
import {AddBox} from "@material-ui/icons";
import {archivo} from "services/archivos";
import {categoria} from "services/categoria";
import {ramo} from "services/ramos";
import {localization,tableIcons} from 'services/Constantes';
import Select from 'react-select';
import { Input } from '@material-ui/core';

  class Tabla extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
           Data:[],
           Categorias:{},
           Ramos:{},
           Contenidos:null,
           ramo_seleccionado: null,
           categoria_seleccionada: null,
           contenido_seleccionado:null,
           nombre:null,
           descripcion:null,
      };
      this.changeRamo = this.changeRamo.bind(this);
      this.changeCategoria = this.changeCategoria.bind(this);
      this.changeContenido = this.changeContenido.bind(this);
      this.changeNombre = this.changeNombre.bind(this);
      this.changeDescripcion = this.changeDescripcion.bind(this);
  }

  async componentDidMount(){
    var data= await archivo.GetMisArchivos();
    var categorias= await categoria.GetCategorias();
    var ramos= await ramo.getRamos();

    ramos.map(function callback(value) {
      value.label=value.nombre;
      value.value=value.id;
      value.Contenidos=value.Contenidos.map(function callback(c) {
        c.label=c.nombre;
        c.value=c.id;
        return c;
      });
      return value;
    });

    this.setState({
        Ramos:ramos,  
        Categorias:categorias,
        Data:data
    })
  }
 
 
  render() {
      var Data= this.state.Data;
      var columns= [
        { title: 'NOMBRE', field: 'nombre',  cellStyle: {width: 50},
        editComponent: (props)=>{
          return(
          <Input
          defaultValue={this.state.nombre?this.state.nombre:props.rowData.nombre}
            onChange={e=>this.changeNombre(e)}
          />
          )
          }
        },
        { title: 'DESCRIPCION', field: 'descripcion',
          editComponent: (props)=>{
            return(
            <Input
              defaultValue={this.state.descripcion?this.state.descripcion:props.rowData.descripcion}
              onChange={e=>this.changeDescripcion(e)}
            />
            )
          } 
        },
        { title: 'RAMO', field: 'Contenido.Ramo.label', cellStyle: {width: 250,},
        editComponent: (props)=>{
         
          return( 
              <Select
                defaultValue={this.state.ramo_seleccionado?this.state.ramo_seleccionado:props.rowData.Contenido.Ramo}
                options={this.state.Ramos}       
                onChange={e=> this.changeRamo(e)}
              /> 
          )    
        }     
      },    
        { title: 'CONTENIDO', field: 'Contenido.label', cellStyle: {width: 250,},
          editComponent: (props)=>{
        
            
            var s= this.state.Ramos.find(function(value, index, arr){
              if(value.id===props.rowData.Contenido.Ramo.value){
                return value;
              }
              return null;
            })
            return(  
              <Select
                defaultValue={this.state.contenido_seleccionado?this.state.contenido_seleccionado:props.rowData.Contenido}
                options={this.state.Contenidos?this.state.Contenidos:s.Contenidos}       
                onChange={e => this.changeContenido(e)}
              /> 
            )
            }  
        }, 
        { title: 'CATEGORIA', field: 'Categorium.label',  cellStyle: { width: 200,},
        editComponent: (props)=>{
          return(  
            <Select     
              defaultValue={this.state.categoria_seleccionada?this.state.categoria_seleccionada:props.rowData.Categorium}
              options={this.state.Categorias}       
              onChange={e => this.changeCategoria(e)}
            /> 
          )
        } 
     },       
   
      ]  

    return (
    <>
      <Container>
        <MaterialTable
          icons={tableIcons}
          title={"ARCHIVOS COMPARTIDOS"}
          columns={columns}
          data={Data}
          actions={[
              {
                icon: () => <AddBox />,
                tooltip: 'Nuevo Archivo',
                isFreeAction: true,
                onClick: () => this.props.history.push('/upload')
              },
            ]}
        
          options={{
            search:true,
            actionsColumnIndex: -1,
            headerStyle:{zIndex:'0'},
          }}
          localization={localization}
          editable={{
              onRowUpdate: (newData) =>
              new Promise(resolve => {
                  setTimeout(() => {    
                    
                    var obj={
                      archivo_id:newData.id,
                      descripcion:this.state.descripcion,
                      nombre:this.state.nombre,
                      cod_contenido:this.state.contenido_seleccionado?this.state.contenido_seleccionado.value:'',
                      cod_categoria:this.state.categoria_seleccionada?this.state.categoria_seleccionada.value:'',
                    }
                    
                    archivo.EditArchivo(obj).then((data)=>{
                      if(data.status){
                        archivo.GetMisArchivos().then(data=>{
                          this.setState({
                            Data:data,
                            Contenidos:null,
                            ramo_seleccionado: null,
                            categoria_seleccionada: null,
                            contenido_seleccionado:null,
                            descripcion:null,
                            nombre:null,
                            
                          })
                        });
                      }
                    })

                  resolve();
                  }, 600);
              }),
              onRowDelete: oldData =>
              new Promise(resolve => {
                  setTimeout(() => {
                    var obj={
                      archivo_id:oldData.id,
                    }
                    archivo.DeleteArchivo(obj).then(data=>{
                    
                      if(data.status){
                        Data.splice(Data.indexOf(oldData), 1);
                        this.setState({
                          Data:Data,
                        })
                      }
                    })
                  resolve();
                  }, 600);
              }),
          }}
          components={{
            EditRow: props => {
              return (
                <MTableEditRow
                {...props}
                // acceder al metodo "CANCEL" para resetar el estado.
                onEditingCanceled={(mode, rowData) => {
                  this.setState({
                    Contenidos:null,
                    ramo_seleccionado: null,
                    categoria_seleccionada: null,
                    contenido_seleccionado:null,
                    descripcion:null,
                    nombre:null,
                  })
                  props.onEditingCanceled(mode);
                }}
              />
              );
              
            }
          }}
        />
      </Container>
    </>
    );
  }

  changeDescripcion(e){
    if(this._timeout){ //if there is already a timeout in process cancel it
        clearTimeout(this._timeout);
    }
      const val = e.target.value;
      this._timeout = setTimeout(()=>{
        this._timeout = null;
        this.setState({
            descripcion:val
        });
    },1000); 
  }
  changeNombre(e){
    if(this._timeout){ //if there is already a timeout in process cancel it
        clearTimeout(this._timeout);
    }
      const val = e.target.value;
      this._timeout = setTimeout(()=>{
        this._timeout = null;
        this.setState({
            nombre:val
        });
    },1000); 
  }

  changeCategoria(e){
    this.setState({
      categoria_seleccionada:{value:e.value,label:e.label}
    })
  }
  changeRamo(e){
    var contenido_seleccionado={
      value:e.Contenidos[0]?e.Contenidos[0].value:null,
      label:e.Contenidos[0]?e.Contenidos[0].label:null
    }

     this.setState({
      ramo_seleccionado:{value: e.value,label:e.label,Contenidos:e.Contenidos},
      contenido_seleccionado:contenido_seleccionado,
      Contenidos:e.Contenidos
    });

  }
  changeContenido(e){
    this.setState({
      contenido_seleccionado:{value:e.value,label:e.label}
    })
  }

};

export default Tabla;


import React from "react";
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider } from '@material-ui/core/styles';
import StarRatings from "react-star-ratings";
import { archivo } from 'services/archivos';
import * as Constants from 'services/Constantes'
import Categoria from "./Categoria";
import Modal from "./Modal";
import { ToastContainer, toast,Flip } from 'react-toastify';

class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, //para modal
      idArchivo:'',
      Categorias_Ids:[], //para filtro por categoria.
      Data: []
    };
    this.changeRating = this.changeRating.bind(this); 
    this.changeCategoria = this.changeCategoria.bind(this); 
    this.togleDenuncia = this.togleDenuncia.bind(this); 
    this.downloadfile = this.downloadfile.bind(this); 
    
  };

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (JSON.stringify(this.props.DATAFILTER )!== JSON.stringify(prevProps.DATAFILTER )) {
        this.setState({Data: this.props.DATAFILTER});
    }
  }


  render() {  
    var Data= this.state.Data;
    const columns = [
      {
        name: "nombre",
        label:"Nombre",    
        options: {
          filter: true,
          customBodyRender: (value,tableMeta) => (
            <small>
             { Data.length>0
                ?<i 
                  className="fa fa-circle mr-2" 
                  style={{color:Data[tableMeta.rowIndex].Categorium.color}}>
                </i> 
                :<i></i>
              }
              {value.length<10? value: value.slice(0, 10)+'...' }
            </small>
           ) 
        }
      },

      {
        name: "descripcion",
        label:"Descripción",
        options: {
          width: 10,
          filter: true,
          customBodyRender: (value) => (    
            <small>  
              {value.length<80? value: value.slice(0, 80)+'...' }
            </small> 
           ) 
        }
      },

    
      {
        name: "Contenido",
        label:"Ramo",
        options: {
          display:true,
          filter: true,
          customBodyRender: (value) => (
            <small>{value.Ramo.label} ({value.Ramo.codigo})</small>
           ) 
        }
      },
      {
        name: "Usuario",
        label:"Usuario",
        options: {
          display:false,
          filter: true,
          customBodyRender: (value) => (
            <small>{value.nombre}</small>
           ) 
        }
      },
      {
        name: "valoracion",
        label:"Valoración",
        options: {
          filter: false,
          customBodyRender: (value,tableMeta) => (
            <StarRatings
              rating={value}
              name={Data.length>0?Data[tableMeta.rowIndex].id.toString():''}
              starRatedColor="#172b4d"
              starHoverColor="#f97a03"
              changeRating={this.changeRating}
              numberOfStars={5}
              starDimension='12px'
              starSpacing = '0'
          /> 
           ) 
        }
      },
      {
        name: "cod_categoria",
        label:"Categoria",
        options: {
          filter: true,
          filterList: this.state.Categorias_Ids, //para filtrar por categoria
          display: "false",
           customBodyRender: (value,tableMeta) => (
             <small>{
              Data.length>0
              ?Data[tableMeta.rowIndex].Categorium.nombre
              :''
            }</small>
           ) 
        }
      },
      {
        name: "año",
        label:"Año",
        options: {
          display: "false",
          filter: false,
          customBodyRender: (value) => (
            <small>{value}</small>
           ) 
        }
      },
      {
        name: "formato",
        label:"Formato",
        options: {
          filter: false,
          customBodyRender: (value) => (
            <small>{value}</small>
           
           ) 
        }
      },
      {
        name: "enlace",
        label:"Descargar",
        position:"center",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value,tableMeta) => (  
            <div align="center">
            {Data.length>0
              ?Data[tableMeta.rowIndex].isEnlace?
                <a
                  className="miboton"
                  type="button"
                  rel="noopener noreferrer"
                  href={value}
                  target="_blank"
                >
                  <i  className="fa fa-link" ></i>
                </a>   
                :
                <button
                  className="miboton"
                  type="button"
                  onClick={() => this.downloadfile(value)}    
                >
                  <i  className="ni ni-cloud-download-95" ></i>
                </button> 
              :''  
            }
           </div>
          ) 
        },
      },
      {
        name: "Denunciar",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value,tableMeta) => ( 
            <div align="center">
            <button
              className="miboton"
              type="button"
              onClick={() => this.togleDenuncia(value,tableMeta)}    
            >
             <i  className="fa fa-exclamation-circle" style={{color:'red'}}></i>
           </button> 
           </div>
          ) 
        },
      },
    ];

    
    return (
      <>      
     
      <ToastContainer transition={Flip}
                    position= "top-right"
                    autoClose= {3000}
                    hideProgressBar= {false}
                    closeOnClick= {true}
                    pauseOnHover= {true}
                    draggable= {true}
        />

        <Modal isOpen={this.state.isOpen} idArchivo={this.state.idArchivo}/>

          <div className="nav-wrapper">
            <Categoria changeCategoria={this.changeCategoria}/>
          </div>
          <div  style= {{  position: "sticky"}}> 
          <MuiThemeProvider theme={Constants.getMuiTheme()}>
              <MUIDataTable 
                data={Data}
                columns={columns}
                options={Constants.options}  
              />  
            </MuiThemeProvider>
          </div>
      </>
    );
  }

  async changeRating(newRating, name) {
    var  Data= await archivo.NuevaValoracion(name,newRating)
    alert(Data.message)
  };

  async changeCategoria(Categorias_Ids){
    this.setState({
      Categorias_Ids:Categorias_Ids
    })
  };

  togleDenuncia(value,tableMeta){
    var id= this.state.Data[tableMeta.rowIndex].id;
    this.setState({
      isOpen:true,
      idArchivo:id
    })

  }
    
  async downloadfile(value){
    var response=await archivo.DownloadArchivo(value)
    if(response.success){
      window.location.assign(response.url);
    }
    else{
      toast.error('Ooops.. ' + response.message);
    }

   };
 

}

export default Tabla;


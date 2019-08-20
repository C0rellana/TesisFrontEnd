import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// nodejs library that concatenates classes
import classnames from "classnames";
import StarRatings from 'react-star-ratings';

import { categoria } from 'services/categoria';
import { archivo } from 'services/archivos';
import { auth } from 'services/authenticacion';
import * as Constants from 'services/Constantes'

import {
  NavItem,
  NavLink,
  Nav,
  Row,
  Col,
  Modal,
  Button,
  Input
} from "reactstrap";


class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icontTabs2: [],
      rating: 0,
      modal:false,
      categorias:[],
      data:[],
    };
    this.changeRating = this.changeRating.bind(this); 
  }
  async componentDidUpdate(prevProps){
    if(this.props.DATAFILTER !== prevProps.DATAFILTER){
      this.setState({ data: this.props.DATAFILTER })
    } 
  }
  async componentDidMount() {
    var usuario = await auth.currentUserValue;
    this.state.data=await archivo.GetAll()
    this.state.categorias= await categoria.getAllCategoriasbyCarrera(usuario.carrera)
    this.setState({});
   }
   
  async downloadfile(value){
   var url= await archivo.DownloadArchivo(value);
   window.location.assign(url);
  }

  toggleModal = state => {
    this.setState({ modal: !this.state.modal });
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      defaultModal:true,
    });
    if(this.state.icontTabs2.includes(index)){
      var z = this.state.icontTabs2.indexOf(index);
      this.state.icontTabs2.splice(z,1);
    }
    else{
      this.state.icontTabs2.push(index)
    }
 
  };

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableFilterList: {
        chip: {
          display: 'none'
        }
      },
      MUIDataTableHeadCell: {
          sortAction:{
            textAlign: 'center',
            display: 'block'
          
        },
    },

    }
  })


  async changeRating(newRating, name) {
  var  data= await archivo.NuevaValoracion(name,newRating)
  alert(data.message)
  }

  render() {  
    
    let nav_item =[]   
    for (let i = 0; i < this.state.categorias.length; i++) {   
      nav_item.push(      
        <NavItem key={this.state.categorias[i].value} >
          <NavLink key={this.state.categorias[i].value} 
            aria-selected="true"
            className={classnames("mb-sm-3 mb-md-1 ", {
              active: this.state.icontTabs2.includes(this.state.categorias[i].value),            
            })}
          
            onClick={e => this.toggleNavs(e, "iconTabs", this.state.categorias[i].value)}
            href="#"
            role="tab"       
          >
          
            <small>
            {this.state.categorias[i].label}
            </small>
            
          </NavLink>
        </NavItem>
        )
    }
    const columns = [
      {
        name: "nombre",
        label:"Nombre",    
        options: {
          filter: true,
          customBodyRender: (value,tableMeta) => (
            
            <small>
             { this.state.data.length>0? <i 
                className="fa fa-circle mr-2" 
                style={{color:this.state.data[tableMeta.rowIndex].Categorium.color}}>
              </i> :
              <i></i>
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
              
              name={this.state.data.length>0?this.state.data[tableMeta.rowIndex].id.toString():''}
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
          filterList: this.state.icontTabs2, //para filtrar por categoria
          display: "false",
           customBodyRender: (value,tableMeta) => (
             <small>{
              this.state.data.length>0
              ?this.state.data[tableMeta.rowIndex].Categorium.nombre
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
            {this.state.data.length>0
              ?this.state.data[tableMeta.rowIndex].isEnlace?
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
          customBodyRender: (value) => ( 
            <div align="center">
            <button
              className="miboton"
              type="button"
              onClick={() => this.toggleModal()}    
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
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={this.state.modal}
          toggle={() => this.toggleModal()}
        >  
          <div className="modal-body">
            <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal()}
                  >
                    <span aria-hidden={true}>×</span>
              </button>
            <div align="center">
              <i className="fa fa-exclamation-triangle fa-4x" ></i>
              <br/><br/>
              <small>
                Tu denuncia será enviada para revisión junto con tus datos.
              </small>
              <hr></hr>
              <Input
                type="textArea"
                maxLength="100"
                placeholder="Ingrese una descripcion para la denuncia"
                onChange={this.handleDenunciaChange}
              />
            </div>
          </div>
          <div className="modal-footer">            
            <Button
              className="btn-white"
              color="default"
              type="button"
              align="center"
            >
              Enviar
            </Button>
          </div>
        </Modal>
      
        <Row className="justify-content-center">
          <Col lg="12">
            <div className="nav-wrapper">
              <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist" >
                 {nav_item}         
              </Nav>
            </div>
         
         <div  style= {{  position: "sticky"}}> 
         <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable 
              data={this.state.data}
              columns={columns}
              options={Constants.options}
            />  
             </MuiThemeProvider>
             </div>
          
          </Col>
        </Row>
       

      </>
    );
  }
}

export default Tabla;


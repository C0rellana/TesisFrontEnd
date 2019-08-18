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



class TabsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icontTabs2: [],
      rating: 0,
      modal:false,
      categorias:[],
      data:[]
    };
    this.changeRating = this.changeRating.bind(this); 
  }
 
  componentDidMount() {
    //obtener las carreras de la API
    var usuario = auth.currentUserValue;
    categoria.getAllCategoriasbyCarrera(usuario.carrera)
        .then(res => {
            this.setState({
              categorias: res
            })
        })

     archivo.GetAll()
      .then(res => {
        this.setState({
          data: res
        })
    })
      
   }

  toggleModal = state => {
    this.setState({
      modal: !this.state.modal
    });
  }

  downloadfile(value){
    archivo.DownloadArchivo(value).then(data=>{
      window.location.assign(data);
     
    })
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
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableFilterList: {
        chip: {
          display: 'none'
        }
      }
    }
  })

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
            <i className={this.state.categorias[i].icon} />
            {this.state.categorias[i].label}
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
          customBodyRender: (value) => (
            <small>{value}</small>
           ) 
        }
      },
      {
        name: "Ramo",
        label:"Ramo",
        options: {
          filter: true,
          customBodyRender: (value) => (
            <small>{value.nombre}</small>
           ) 
        }
      },
      {
        name: "Usuario",
        label:"Usuario",
        options: {
          filter: true,
          customBodyRender: (value) => (
            <small>{value.nombre}</small>
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
        name: "valoracion",
        label:"Valoración",
        options: {
          filter: false,
          customBodyRender: (value) => (

            <StarRatings
              rating={value}
              starRatedColor="#172b4d"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension='15px'
              starSpacing = '5'
          />
           ) 
        }
      },
      {
        name: "cod_categoria",
        labe:"categoria",
        options: {
          filter: true,
          filterList: this.state.icontTabs2, //para filtrar por categoria
          display: "false"
        }
      },
      {
        name: "año",
        label:"Año",
        options: {
          filter: false,
          customBodyRender: (value) => (
            <small>{value}</small>
           ) 
        }
      },
      {
        name: "enlace",
        label:"Enlace",
        options: {
          filter: false,
          sort: false,
          //PENDIENTE
          customBodyRender: (value) => (
            <center>
              <button
              className="miboton"
              type="button"
              onClick={() => this.downloadfile(value)}    
            >
             <i  className="ni ni-cloud-download-95" ></i>
           </button>
           </center>
          ) 
        },
      },
      {
        name: "Denunciar",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value) => (
            <center>
            <button
              className="miboton"
              type="button"
              onClick={() => this.toggleModal()}    
            >
             <i  className="fa fa-exclamation-circle" style={{color:'red'}}></i>
           </button>
           </center>
      
            
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

export default TabsSection;


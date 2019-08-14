
import React from "react";
import Select from 'react-select';
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import * as Constants from 'services/Constantes'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {
  Container,
  Modal,
  Button

} from "reactstrap";


class Report extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      informacion:false,
      aceptar:false,
      eliminar:false,
    }

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

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    const columns = [
        {
          label: "Nombre del Archivo",
          name:"nombre",
          options: {
            filter: true,
          }
        },
        {
          label: "Autor",
          name:"autor",
          options: {
            filter: true,
          }
        },
        {
          label: "Nº de denuncias",
          name:"cantidad",
          options: {
            filter: true,
          }
        },
        {
            label: "Opciones",
            name: "Opciones",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => (
                  <small>
                    <button
                        className="miboton"
                        type="button"
                        onClick={() => this.toggleModal("informacion")}
                      
                    >
                    <i  className=" fa fa-info-circle fa-2x" style={{color:'#11cdef'}}></i>
                    </button>
                    <button
                        className="miboton"
                        type="button"
                        onClick={() => this.toggleModal("acpetar")}
                       
                     
                    >
                    <i  className="fa fa-check-circle fa-2x" style={{color:'#2dce89'}}></i>
                    </button>
                    <button
                        className="miboton"
                        type="button"
                        onClick={() => this.toggleModal("eliminar")}
                    
                    >
                    <i  className="fa fa-times-circle fa-2x " style={{color:'#f5365c'}}></i>
                    </button>
                 </small>
            
                  
                ) 
              },
          },       
      
      ];
  
    return (
      <>
      <Modal
              className="modal-dialog-centered modal-info"
              contentClassName="bg-gradient-info"
              isOpen={this.state.informacion}
              toggle={() => this.toggleModal("informacion")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Descripcion de las denuncias
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("informacion")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
              <div style={{'height': '100px', 'overflowY': 'scroll'}}>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p>
                <p><small><strong>(27/05/2019) - JUAN PEREZ:</strong> Este archivo es muy ofensivo, deberian eliminarlo</small></p> 
             </div>  
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button">
                  Aceptar
                </Button>

              </div>
            </Modal>

       <MiNavbar></MiNavbar>
        <Container>
            <Select
              closeMenuOnSelect={true}
              components={Constants.animatedComponents}
              placeholder="Todos los ramos"
              isMulti
              options={Constants.ramos}
              styles={Constants.colourStyles}
            />
           <br/>
            <div  style= {{  position: "sticky"}}> 
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable 
                    data={Constants.denuncias}
                    columns={columns}
                    options={Constants.options2}
                    />  
                </MuiThemeProvider>
            </div>
        </Container>
      </>
    );
  }
}

export default Report;

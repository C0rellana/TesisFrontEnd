
import React from "react";
import Select from 'react-select';
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider } from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import * as Constants from 'services/Constantes'
import { ramo } from 'services/ramos';
import { denuncias } from 'services/denuncias';
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';
import {
  Container,
  Button,

} from "reactstrap";


class Report extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      ramos: [],
      Ramoid:[]
    };
 
    this.Aceptar = this.Aceptar.bind(this); 
    this.Ignorar = this.Ignorar.bind(this); 
  }

   componentDidMount() {
    ramo.getRamosbyCarrera().then(data=>{
      this.setState({
        ramos: data 
      })
    })
    
    denuncias.GetDenuncias().then((data)=>{
      this.setState({
        data :  data
      })
    })
    
  }
  changeRamo(Ramo){
    this.setState({
      Ramoid:[Ramo.value]
    })

  };

  async Aceptar(id){
    denuncias.Aceptar(id.value).then(resp=>{
      if(resp.status){
        toast.success("Acción completada con éxito",{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });
      }else{
        toast.error("No se pudo realizar la acción solicitada",{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });
      }
    })
  }

  async Ignorar(id){
    denuncias.Ignorar(id.value).then(resp=>{
      if(resp.status){
        toast.success("Acción completada con éxito",{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });
      }else{
        toast.error("No se pudo realizar la acción solicitada",{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });
      }
    })

  }

  render() {

    var Data =this.state.data;
  
    const columns = [
      {
        name: "nombre",
        label:"Nombre",
        options: {
          filter: true,
        }
      },
      {
        name: "descripcion",
        label:"Descripción",
        options: {
          filter: true,
        }
      },
      {
        name: "Usuario.nombre",
        label:"Usuario",
        options: {
          filter: true,
        }
      },

      {
        name: "",
        label:"Nº Denuncias",
        options: {
          sort: false,
          filter: false,
          customBodyRender: (value,tableMeta) => (  
            <center>
              {Data[tableMeta.rowIndex].Denuncia.length}
              </center>
           ) 
        },
        
      },
      {
        name: "Contenido.Ramo.id",
        label:"Ramo",
        options: {
          filter: true,
          filterList: this.state.Ramoid,
          display: false,
        },
        
      },
      {
        name: "id",
        label:"Aceptar",
        options: {
          sort: false,
          filter: false,
          display: true,
          customBodyRender: (value,tableMeta) => ( 
            <>
             <center>
             <Button color="success" value={value} onClick={(e)=>this.Aceptar(e.target)}> <i className="fa fa-trash"></i></Button>
             </center>
           </>
           ) 
        },
        
      },
      {
        name: "id",
        label:"Ignorar",
        options: {
          sort: false,
          filter: false,
          display: true,
          customBodyRender: (value,tableMeta) => ( 
            <>
            <center>
           <Button color="warning" value={value}  onClick={(e)=>this.Ignorar(e.target)}> <i className="fa fa-eye-slash"></i></Button>
           </center>
           </>
           ) 
        },
        
      },

    ];

    const options = {
      filter: false,
      print: false,
      download:false,
      rowsPerPageOptions: [10,15,20],
      rowsPerPage: 10,
      selectableRows:"none",
      filterType: 'dropdown',
      responsive: 'scroll',
      viewColumns: false,
      search:true,
      expandableRows: true,
      expandableRowsOnClick: false,
      rowsExpanded: [],
      textLabels: {
        viewColumns: {
          title: "Mostrar Columnas",
          titleAria: "Mostrar/Ocultar columnas",
        },
        body: {
          noMatch: "No se han encontrado denuncias.",
          toolTip: "Ordenar",
        },
        pagination: {
          next: "Siguiente",
          previous: "Anterior",
          rowsPerPage: "Resultados por pagina:",
          displayRows: "of",
        },
        toolbar: {
          viewColumns: "Ver columnas",
          search: "Buscar",
        },
      },
      renderExpandableRow: (rowData, rowMeta) => {
        var index = rowMeta.rowIndex;
        var data2 =Data[index]
       
        var detalles = data2.Denuncia.map(function callback(currentValue, index, array) {
           return  (
            
              <TableRow key={index} bgcolor="#EDEDED" >
                <TableCell  colSpan={2}  >
                  <i> {data2.Usuario.nombre.toUpperCase()}</i>
                </TableCell>
                <TableCell colSpan={1} >
                  <i>  {currentValue.Tipodenuncium.nombre}</i>
                </TableCell>
                <TableCell  colSpan={4}>
                  <i>{currentValue.descripcion}</i>
                </TableCell>
              </TableRow>
           )
            
          });
        return (
          <>
              <TableRow key={index} bgcolor="#EDEDED" >
                <TableCell colSpan={2}  >
                  <b>Nombre Usuario</b> 
                </TableCell>
                <TableCell colSpan={1} >
                  <b>Tipo de denuncia</b> 
                </TableCell>
                <TableCell  colSpan={4}>
                  <b>Descripción</b> 
                </TableCell>
              </TableRow>
          {detalles}  
        
          </>
        );
      }
    };

    return (


      <Container>
                 
         <ToastContainer transition={Flip}
                position= "top-right"
                autoClose= {3000}
                hideProgressBar= {false}
                closeOnClick= {true}
                pauseOnHover= {true}
                draggable= {true}
              />
          <p align="justify"> <b>
              Esta sección contiene las denuncias realizadas por alumnos de la carrera a distintos archivos,
              puede ignorar estas denuncias o eliminar lógicamente el archivo.
              Para facilitar la tarea usted tiene la opción filtrar las denuncias por ramo.
              </b>  </p>
              <hr/>
              <p>
              <b>
              <b>ACEPTAR: </b> Esta opción eliminará lógicamente el archivo, dejándolo oculto para los estudiantes.
              <br/>
              <b>IGNORAR: </b> Esta opción ignorará y ocultara las denuncias realizadas.         
              </b> 
            </p>
            <br/>
        <Select
          closeMenuOnSelect={true}
          components={Constants.animatedComponents}
          placeholder="Seleccionar Ramo"
          options={this.state.ramos}
          styles={Constants.colourStyles}
          onChange={e=>this.changeRamo(e)}

        />
        <br></br>
        <div  style= {{  position: "sticky"}}> 
          <MuiThemeProvider theme={Constants.getMuiTheme()}>
            <MUIDataTable
              data={Data} 
              columns={columns} 
              options={options}
            />
          </MuiThemeProvider>
        </div>
   
      </Container>
  );

  }
}

export default Report;



import React from "react";
import MUIDataTable from "mui-datatables";
import {MuiThemeProvider } from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import * as Constants from 'services/Constantes'
import { denuncias } from 'services/denuncias';

import {
  Button,
} from "reactstrap";


class Tabla extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Data:[],
            Ramoid:[]
        }
    
        this.Aceptar = this.Aceptar.bind(this); 
        this.Ignorar = this.Ignorar.bind(this); 
    }



    render() {
        var Data= this.props.Data
        var Ramoid=this.props.Ramoid;
        var estado = this.props.estado;
        

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
            filterList: Ramoid,
            display: false,
            }  
        },


      
        {
            name: "id",
            label:"Rechazar",
            options: {
            sort: false,
            filter: false,
            display: estado==="activa" || estado==="aceptada"?true:false,
            customBodyRender: (value,tableMeta) => ( 
                <>
                <center>
                <Button color="warning" type="button"  onClick={(e)=>this.Ignorar(value)}> 
                <i className="fa fa-ban"></i>
                 </Button>
            </center>
            </>
            ) 
            },
            
        },    
      
        {
            name: "id",
            label:"Aceptar",
            options: {
            sort: false,
            filter: false,
            display: estado==="activa" || estado==="rechazada"?true:false,
            customBodyRender: (value,tableMeta) => ( 
                <>
                <center>
                
                <Button 
                color="success" 
                type="button"  
                onClick={(e)=>this.Aceptar(value)}
                > 
                
                  <i className="fa fa-check"></i>
                 
           
                </Button>
                </center>
            </>
            ) 
            }
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
                    <i> {currentValue.Usuario.nombre.toUpperCase()}</i>
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
            <>          
            
                <div  style= {{  position: "sticky"}}> 
                    <MuiThemeProvider theme={Constants.getMuiTheme()}>
                        <MUIDataTable
                            data={Data} 
                            columns={columns} 
                            options={options}
                        />
                    </MuiThemeProvider>
                </div>
        
            </>
    );

  }

  
  async Aceptar(id){
    denuncias.Aceptar(id).then(resp=>{
        this.props.showToast(resp);
    })
  }

  async Ignorar(id){
    denuncias.Ignorar(id).then(resp=>{
        this.props.showToast(resp);
    })

  }
}

export default Tabla;


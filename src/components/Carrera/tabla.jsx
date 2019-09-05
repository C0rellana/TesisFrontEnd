import React from 'react';
import {contenido} from "services/contenido"
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { AddBox, ArrowUpward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,
    FilterList,FirstPage,LastPage,Remove,SaveAlt,Search,ViewColumn
  } from "@material-ui/icons";
  
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  class TablaCarrera extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
           Data:[],
      };
  }
  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      contenido.getContenidos(this.props.ramo).then(r=>{
        this.setState({
          Data:r
        })
      })
    }
  }
  componentDidMount(){
    contenido.getContenidos(this.props.ramo).then(r=>{
      this.setState({
        Data:r
      })
    })

  }


  render() {
     var Data= this.state.Data;
     var ID = this.props.ramo

      var columns= [
        { title: 'NOMBRE DEL CONTENIDO', field: 'nombre' },
        { title: 'UNIDAD', field: 'unidad', lookup: { 1: "Unidad 1", 2: "Unidad 2",3: "Unidad 3",4: "Unidad 4",5: "Unidad 5" }, },    
      ]  

    return (<>
            <MaterialTable
            icons={tableIcons}
            title={""}
            columns={columns}
            data={Data}
            options={{
                search:false,
                actionsColumnIndex: -1,
                headerStyle:{zIndex:'0'},

            }}
            localization={{
              body: {
                emptyDataSourceMessage: 'Este ramo no tiene contenidos',
                editTooltip:"Editar",
                deleteTooltip:"Eliminar",
                addTooltip:"Nuevo contenido",
                editRow:{  saveTooltip:"Guardar",
                          cancelTooltip:"Cancelar"
                }
              },
              header:{
                actions:'OPCIONES'
              },
              pagination:{
                labelDisplayedRows:"{from}-{to} de {count}",
                labelRowsSelect:"filas",
                labelRowsPerPage:"filas",
                nextTooltip:"siguiente",
                lastTooltip:"ultima",
                previousTooltip:"anterior",
                firstTooltip:"primera",
              }
            }}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    var obj={
                      nombre: newData.nombre,
                      unidad: parseInt(newData.unidad),
                      ramoid: ID,
                    }
                    contenido.NewContenido(obj).then((r)=>{
                      if(r.status){
                        this.setState({
                          Data:Data.concat(r.data)
                        })
                      }
                    })
                    resolve();
                  }, 600);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    contenido.EditContenido(newData).then((r)=>{
                      if(r.status){
                        Data[Data.indexOf(oldData)] = newData;
                        this.setState({
                          Data:Data,
                        })
                      }
                    })
                    resolve();
                    }, 600);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                      contenido.DeleteContenido(oldData.id).then((r)=>{
                        if(r.status){
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
            />
    </>);
  }
};

export default TablaCarrera;


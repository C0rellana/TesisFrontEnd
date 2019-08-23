import makeAnimated from 'react-select/animated';
import { createMuiTheme} from '@material-ui/core/styles';

  

//Opciones para datatable
export const options = {
  filterType: "dropdown",
  responsive: "scroll",

  download: false,
  rowsPerPageOptions: [10,15,20],
  rowsPerPage: 10,
  print: false,
  viewColumns: true,
  search:false,
  filter:false,
  selectableRows:"none",
  textLabels: {
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar columnas",
    },
    body: {
      noMatch: "Modifique los filtros para mostrar resultados",
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
  }

};

export const animatedComponents = makeAnimated();

//define stilos para los select multiples
export const colourStyles = {
  control: base => ({
    ...base,
    fontSize:"70%"
  }),
  menu: base => ({
    ...base,
    fontSize:"70%"
  }),
  multiValue: (styles,) => {
    return {
      ...styles,
      backgroundColor: "white"
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#172b4d"
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#172b4d",
    ":hover": {
      backgroundColor: "#172b4d",
      color: "#fff"
    }
  })
};




//Denuncias groupBY archivo id
//cantidad = count *
//detalle =todas las descripciones
export const denuncias=[
 
    { nombre: "libro de estadistica 1 para la prueba", autor: "Juan", cantidad: "2", 
      detalle: [
          {usuario:"Juan Perez",Descripcion:"este archivo es ofensivo"},
          {usuario:"Roberto",Descripcion:"este archivo es muy ofensivo"},
      ] 
    },
    { nombre: "libro de CALCULO 1 para la prueba", autor: "roberto", cantidad: "2", 
    detalle: [
        {usuario:"Juan Perez",Descripcion:"este archivo es ofensivo"},
        {usuario:"Roberto",Descripcion:"este archivo es muy ofensivo"},
    ] 
  },

]



//Opciones para datatable de denuncias
export const options2 = {
  filterType: "dropdown",
  responsive: "scroll",
  download: false,
  print: false,
  viewColumns: false,
  filter:false,
  selectableRows:"none",
  
  textLabels: {
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar columnas",
    },
    body: {
      noMatch: "No se han encontrado resultados",
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
  }

};


//diseño datatable
export const getMuiTheme = () => createMuiTheme({
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

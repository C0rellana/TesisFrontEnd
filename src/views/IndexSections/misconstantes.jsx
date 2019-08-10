import makeAnimated from 'react-select/animated';

//categorias de las carreras
export const categorias=[
    { value: '0', label: 'Libros',icon: 'fa fa-book mr-2', },
    { value: '1', label: 'Guias',icon: 'fa fa-chain-broken mr-2',}, 
    { value: '2', label: 'Pruebas', icon: 'fa fa-file-pdf-o mr-2',},
    { value: '3', label: 'Videos', icon: 'fa fa-youtube-play mr-2',},
    { value: '4', label: 'Pautas', icon: 'fa fa-file-word-o mr-2',},
    { value: '5', label: 'Trabajos', icon: 'fa fa-file-archive-o mr-2',},
  ]
  

//data segun carrera y ramo
export const data = [
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,0, 2019, "www.google.cl"],
  ["Guia Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Prueba Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 4,2, 2019, "enlace 1"],
  ["Video Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 3,3, 2019, "enlace 1"],
  ["Pauta Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 2,4, 2019, "enlace 1"],
  ["Trabajo Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 1,5, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],
  ["Libro Calculo Derivadas 1","RAMO 1","JUAN PEREZ","PDF (ICON)", 5,1, 2019, "enlace 1"],


];

//Opciones para datatable
export const options = {
  filterType: "dropdown",
  responsive: "scroll",
  download: false,
  print: false,
  viewColumns: false,
  filter:false,
  selectableRows:"none",
  textLabels: {
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
      search: "Buscar",
    },
  }

};


export const animatedComponents = makeAnimated();

//define stilos para los select multiples
export const colourStyles = {
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

//constantes para input selet
export const carreras=[
  { value: '1', label: 'Informatica',ramos:[
    {value:'1.1', label:'ramo1',otro:'otro1'},
    {value:'1.2', label:'ramo2',otro:'otro2'},
    {value:'1.3', label:'ramo3',otro:'otro3'},

  ] },
  { value: '2', label: 'Medicina',ramos:[
    {value:'2.1', label:'ramo1',otro:'otro1'},
    {value:'2.2', label:'ramo2',otro:'otro2'},
    {value:'2.3', label:'ramo3',otro:'otro3'},

  ] },
  { value: '3', label: 'Contruccion',ramos:[
    {value:'3.1', label:'ramo1',otro:'otro1'},
    {value:'3.2', label:'ramo2',otro:'otro2'},
    {value:'3.3', label:'ramo3',otro:'otro3'},

  ] },
  ]

export const ramos=[
  {value:'1', label:'Sistemas Distribuidos - ICI-611'},
  {value:'2', label:'Inteligencia Artificial - ICI-612'},
  {value:'3', label:'Computacion Grafica - ICI-613'},
]

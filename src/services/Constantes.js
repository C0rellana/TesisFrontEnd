import makeAnimated from 'react-select/animated';
import { createMuiTheme} from '@material-ui/core/styles';

  
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
  MUIDataTable: {
    responsiveScroll: {
      minHeight: '400px',
      maxHeight: '400px',
    },
  }
  }
})


export var unidades=[
  {value:1,label:"UNIDAD 1"},
  {value:2,label:"UNIDAD 2"},
  {value:3,label:"UNIDAD 3"},
  {value:4,label:"UNIDAD 4"},
  {value:5,label:"UNIDAD 5"},
  {value:6,label:"UNIDAD 6"},
  {value:7,label:"UNIDAD 7"},
]


//funcion para invertir el color del texto

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function InvertirColor(hex, bw="true") {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

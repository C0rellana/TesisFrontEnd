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

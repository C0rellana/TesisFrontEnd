import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// nodejs library that concatenates classes
import classnames from "classnames";
import StarRatings from 'react-star-ratings';

import * as Constants from './misconstantes'

import {
  NavItem,
  NavLink,
  Nav,
  Row,
  Col
} from "reactstrap";




class TabsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icontTabs2: [],
      rating: 0
    };
    this.changeRating = this.changeRating.bind(this); 
  }
 

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
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
    console.log(this.state.rating)
   
    for (let i = 0; i < Constants.categorias.length; i++) {   
      nav_item.push(      
        <NavItem key={i} >
          <NavLink key={i} 
            aria-selected="true"
            className={classnames("mb-sm-3 mb-md-1 ", {
              active: this.state.icontTabs2.includes(i),            
            })}
          
            onClick={e => this.toggleNavs(e, "iconTabs", i)}
            href="#"
            role="tab"       
          >
            <i className={Constants.categorias[i].icon} />
            {Constants.categorias[i].label}
          </NavLink>
        </NavItem>
        )
    }
    const columns = [
      {
        name: "Nombre",
        options: {
          filter: true
        }
      },
      {
        name: "Ramo",
        options: {
          filter: true
        }
      },
      {
        name: "Usuario",
        options: {
          filter: true
        }
      },
      {
        name: "Formato",
        options: {
          filter: false
        }
      },
      {
        name: "Valoracion",
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
        name: "categoria",
        options: {
          filter: true,
          filterList: this.state.icontTabs2, //para filtrar por categoria
          display: "false"
        }
      },
      {
        name: "Año",
        options: {
          filter: false,
        }
      },
      {
        name: "Enlace",
        options: {
          filter: false,
          customBodyRender: (value) => (
           <a href="/#"><i className="ni ni-cloud-download-95 ni-2x"></i>

           </a>
          ) 
        },
      },
    ];

    return (
      <>
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
              data={Constants.data}
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


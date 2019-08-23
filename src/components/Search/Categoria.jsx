import React from "react";
import classnames from "classnames";
import { categoria } from 'services/categoria';
import {NavItem,NavLink,Nav}from "reactstrap";


class Categoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveTabs: [],
      Categorias:[],
    };
  };

  async componentDidMount() {
    this.setState({
      Categorias:await categoria.getAllCategoriasbyCarrera()
    });
  };
   

  toggleNavs(e, state, index){
    e.preventDefault();
    
    var ActiveTabs =this.state.ActiveTabs;
    if(ActiveTabs.includes(index)){
      var pos = ActiveTabs.indexOf(index);
      ActiveTabs.splice(pos,1);
    }
    else{
      ActiveTabs.push(index)
    }
    this.setState({
      ActiveTabs: ActiveTabs
    });
    this.props.changeCategoria(ActiveTabs)
    
  };

  render() {  


    let nav_item =[]   
    for (let i = 0; i < this.state.Categorias.length; i++) {   
      nav_item.push(      
        <NavItem key={this.state.Categorias[i].value} >
          <NavLink key={this.state.Categorias[i].value} 
            aria-selected="true"
            className={classnames("mb-sm-3 mb-md-1 ", {
              active: this.state.ActiveTabs.includes(this.state.Categorias[i].value),            
            })}
            onClick={e => this.toggleNavs(e, "iconTabs", this.state.Categorias[i].value)}
            href="#"
            role="tab"       
          > 
            <small>{this.state.Categorias[i].label}</small>     
          </NavLink>
        </NavItem>
        )
    }

   return (
        <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist" >
            {nav_item}         
        </Nav>        
    );
  }
}

export default Categoria;


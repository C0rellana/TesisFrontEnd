import React from "react";

// reactstrap components

// core components
import MiNavbar from "components/Navbars/MiNavbar.jsx";

import Inicio from "./Inicio";
import Buscador from "./Buscador";
import Menucarrera from "./Menucarrera";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
      <MiNavbar></MiNavbar>
      
       <Inicio></Inicio>
        
        <main ref="main">
          <div></div>
        </main>
      </>
    );
  }
}

export default Index;

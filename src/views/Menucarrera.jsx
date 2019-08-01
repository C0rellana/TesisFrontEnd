
import React from "react";
import {
  Container,
} from "reactstrap";

import Tabs from "./IndexSections/Tabs.jsx";
import Search from "./IndexSections/Search.jsx";



class Menucarrera extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      boolean : true
    }
   this.handleClick = this.handleClick.bind(this);
  
  }
  handleClick() {
    this.setState(state => ({
      boolean: !state.boolean
    }));
  }
 

  render() {
    return (
      <>
        <section className="section section-lg section-shaped">
        <div className="shape shape-style-1 bg-gradient-orange ">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
         
            <Container>
              <div className="row">
                <div className="col-md-12">
                <Tabs />
                </div>
              </div>
            </Container>
  
        </section>
      </>
    );
  }
}

export default Menucarrera;

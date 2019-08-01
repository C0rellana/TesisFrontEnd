
import React from "react";
import {
  Container,
} from "reactstrap";

import Tabs from "./IndexSections/Tabs.jsx";


class Menucarrera extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <>
        <section className="section section section-shaped ">
          <div className="shape shape-style-1 bg-gradient-purple ">
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
                  <br></br> <br></br>
                <Tabs />
                </div>
              </div>
            </Container>

         {/* SVG separator */}
         <div className="separator separator-bottom separator-skew">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0"y="0">
              <polygon className="fill-white" points="2560 0 2560 110 0 100" />
            </svg>
          </div>
   
        </section>
      </>
    );
  }
}

export default Menucarrera;

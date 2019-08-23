import React from "react";

import {
  Container,
  Row,
  Col
} from "reactstrap";
import Login from "components/Auth/Login";
import Registro from "components/Auth/Registro";


class Auth extends React.Component {

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
      <main >
        <section className="section section-lg section-shaped" >
          <div className="shape shape-style-1 bg-purple">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
     
          <Container className=""  >
            <Row className="row-grid justify-content-between align-items-center" >
              <Col lg="5">
                {this.state.boolean ? <Login boolean={this.state.boolean} handleClick = {this.handleClick} ></Login>   :  <Registro boolean={this.state.boolean} handleClick = {this.handleClick}> </Registro> }    
                </Col>
                <Col lg="6">
                  <h3 className="display-3 text-white">
                    Estudeo UCM 2019
                  </h3>
                  <p  className="lead text-white">
                    descripcion descripcion descripcion descripcion
                    descripcion descripcion descripcion descripcion descripcion descripcion
                    descripcion descripcion descripcion descripcion descripcion descripcion
                    descripcion descripcion descripcion descripcion descripcion descripcion 
                  </p>
                </Col>
              </Row>
          </Container>
         
        </section>
 
      </main>
        
      </>
    );
  }
}

export default Auth;

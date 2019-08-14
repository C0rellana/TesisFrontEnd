import React from "react";

import {
  Container,
  Row,
  Col
} from "reactstrap";
import Login from "components/auth/Login";
import Registro from "components/auth/Registro";



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
        <section className="section section-lg section-shaped">
          <div className="shape shape-style-1 bg-gradient-info ">
          </div>
          <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
              <Col lg="6">
                <h3 className="display-3 text-white">
                  Estudeo UCM 2019{" "}
                  <span className="text-white">eslogan eslogan eslogan</span>
                </h3>
                <p className="lead text-white">
                descripcion descripcion descripcion descripcion
                descripcion descripcion descripcion descripcion descripcion descripcion
                descripcion descripcion descripcion descripcion descripcion descripcion
                descripcion descripcion descripcion descripcion descripcion descripcion 
                </p>

              </Col>

              <Col className="mb-lg-auto" lg="5">
              {this.state.boolean ? <Login boolean={this.state.boolean} handleClick = {this.handleClick} ></Login>   :  <Registro boolean={this.state.boolean} handleClick = {this.handleClick}> </Registro> }    
              </Col>

            </Row>
          </Container>

      
        </section>
      </>
    );
  }
}

export default Auth;

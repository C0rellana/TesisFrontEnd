import React from "react";
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import {
  Container,
  Row,
  Col
} from "reactstrap";

class Home extends React.Component {

  render() {
    return (
      <>
       <MiNavbar></MiNavbar>
      
        <section className="section section-lg section-shaped">
          <div className="shape shape-style-1 bg-gradient-white ">
           
          </div>
          <Container className="py-md">
            <Row className="row-grid justify-content-between align-items-center">
              <Col lg="6">
                <h3 className="display-3 text">
                  Estudeo UCM 2019{" "}
                
                </h3>
                <p className="lead text">
                  ESTOY LOGEADO 
                </p>

              </Col>

            </Row>
          </Container>

      
        </section>
      </>
    );
  }
}

export default Home;

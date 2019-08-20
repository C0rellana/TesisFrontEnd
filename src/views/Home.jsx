import React from "react";
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import { auth } from 'services/authenticacion';
import {
  Container,
  Row,
  Col
} from "reactstrap";



class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nombre: ""
    };
  }
  async componentDidMount(){
    var user=await auth.GetData()
    this.setState({nombre:user.nombre.toUpperCase() }) 

  }


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
                  Bienvenido  @{this.state.nombre}
                </h3>
                <p className="lead text">
                  <small>
                    <b>¿Que es Estudeo UCM?</b>
                    <br/>
                    Es una plataforma creada con la intención de 
                    ayudarnos entre nosotros a cursar nuestra carrera universitaria.
                    <br/>
                    <b>¿Como lograr esto?</b>
                    <br/>
                    Cada estudiante al cursar sus ramos obtiene una gran cantidad de material
                    para..
                    
                  </small> 
                </p>
              </Col>
              <Col lg="6">

               
              </Col>

            </Row>
          </Container>

      
        </section>
      </>
    );
  }
}

export default Home;

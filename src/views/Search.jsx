import React from "react";
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import Tabla from "components/Search/Tabla";
import Filtros from "components/Search/Filtros";
import { Container, Row,Col} from "reactstrap";

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      Data:[],
    }
    this.changeData = this.changeData.bind(this); //Envia la data a la tabla segun el componente Filtro
  }
  
  changeData(Data){
    this.setState({
      Data: Data
    })
  }

  render() {
      return (
      <>
       <MiNavbar></MiNavbar>     
        <Container>
          <Filtros changeData={this.changeData}></Filtros>
          
          <Row className="justify-content-center">
              <Col lg="12">
                <Tabla DATAFILTER = {this.state.Data}  ></Tabla>
              </Col>
          </Row>
          
          <br></br>
        </Container>
      </>
    );
  }
}

export default Search;

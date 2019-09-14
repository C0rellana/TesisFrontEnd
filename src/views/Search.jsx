import React from "react";
import Tabla from "components/Search/Tabla";
import Filtros from "components/Search/Filtros";
import { Container, Row,Col} from "reactstrap";
import Breadcrumbs from "components/Navbars/Breadcrumbs"

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
      Data: Data,
    })
  }

  render() {
      return (
      <> 
        <Breadcrumbs page="BUSCADOR" {...this.props}/>
        <Container> 
          <p align="justify"> <b>
              Esta sección te permite buscar una gran cantidad de contenido para tus estudios, puedes personalizar 
              la búsqueda a tu gusto modificando los siguientes filtros.</b> 
            </p>
            <br/>
          <Filtros changeData={this.changeData}></Filtros>
          
          <Row className="justify-content-center">
              <Col lg="12">
                <Tabla DATAFILTER = {this.state.Data} user={this.props.user} ></Tabla>
              </Col>
          </Row>
          
          <br></br>
        </Container>
      </>
    );
  }
}

export default Search;

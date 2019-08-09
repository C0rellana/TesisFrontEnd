import React from "react";
import UploadFile from "./IndexSections/UploadFile";
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import Select from 'react-select';
import * as Constants from './IndexSections/misconstantes'
// reactstrap components

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  CardHeader,
  Container,
  Col,
  Row
} from "reactstrap";


class FormUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre:'',
      categoria:'',
      carrera: '',
      ramo: '',
      descripcion: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 

  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value

    this.setState({
      [name]: value
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
  }



  render() {
     return (
      <>
          <MiNavbar></MiNavbar>
              <Container>
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-4">
                        <div className="text text-center">
                            <strong><big>Compartir Archivos </big></strong>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form onSubmit={this.handleSubmit}>
                      
                          <FormGroup>
                            <Input
                              name="descripcion"
                              placeholder="Describa los archivos para ayudar a la busqueda de estos."
                              rows="1"
                              type="textarea"
                              maxLength="200"
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                          <Row>
                              <Col md="6">
                                <FormGroup>
                                  <Input
                                    name="nombre"
                                    placeholder="Ingrese un nombre para el/los archivos"
                                    type="text"
                                    onChange={this.handleInputChange}
                                    
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                              <FormGroup>
                                <Select
                                    name="categoria"
                                    closeMenuOnSelect={true}
                                    components={Constants.animatedComponents}
                                    placeholder="Seleccione una categoria"
                                    options={Constants.categorias}
                                    styles={Constants.colourStyles}
                                
                                    
                                    />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                              <FormGroup>
                                <Select
                                  name="carrera"
                                  closeMenuOnSelect={true}
                                  components={Constants.animatedComponents}
                                  placeholder="Mi Carrera"
                                  isDisabled
                                  options={Constants.carreras}
                                  styles={Constants.colourStyles}
                                  
                                  
                                  />
                              </FormGroup>
                              </Col>
                              <Col md="6">
                              <FormGroup>
                                <Select
                                name="ramo"
                                closeMenuOnSelect={true}
                                components={Constants.animatedComponents}
                                placeholder="Ramo X (COD-1202)"
                                isMulti
                                options={this.ramos}
                                styles={Constants.colourStyles}
                               
                                />
                              </FormGroup> 
                              </Col>
                            </Row>
                          <UploadFile></UploadFile>
        
                          <div className="text-center"> 
                              <Button className="my-4" color="primary" type="submit"> Compartir</Button>
                          </div>
                        </Form>
                    </CardBody>
                </Card>
              </Container>
         
      </>
    );
  }
}

export default FormUpload;

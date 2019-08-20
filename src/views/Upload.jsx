import React from "react";
import UploadFile from "components/Upload/UploadFile";
import Enlaces from "components/Upload/Enlaces";
import MiNavbar from "components/Navbars/MiNavbar.jsx";
import Select from 'react-select';
import * as Constants from 'services/Constantes'
import { archivo } from 'services/archivos';
import { categoria } from 'services/categoria';
import { ramo } from 'services/ramos';

// reactstrap components

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  CardHeader,
  Container,
  Col,
  Row,
  Form
} from "reactstrap";


class FormUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria:'', contenido: '', descripcion: '', files:[],enlaces:[],
      categorias:[], ramos: [],contenidos:[], enlace:false,
    };
    this.dataFromDropZone = this.dataFromDropZone.bind(this);
    this.dataEnlaces = this.dataEnlaces.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.togglechange = this.togglechange.bind(this); 

  }
  async componentDidMount() {
      this.setState({
        ramos: await ramo.getRamosbyCarrera(),
        categorias: await categoria.getAllCategoriasbyCarrera()
      })
      
  }
  togglechange() {
    this.setState({
      enlace:this.state.enlace?false:true
    })
  }
 
  //Enviar archivos
  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    this.state.files.map((file,index)=>{
        return formData.append(`file${index}`, file);
      })
  
    formData.append('enlaces', JSON.stringify(this.state.enlaces))
    formData.append('cod_categoria', this.state.categoria);
    formData.append('cod_contenido', this.state.contenido);
    formData.append('descripcion', this.state.descripcion);
    formData.append('enlace',this.state.enlace)
    await archivo.Upload(formData)

  }

  //Obtener archivos desde el componente hijo 
  dataFromDropZone = (fileData) => {
    this.setState({
      files: fileData
    });
  };
  //Obtener enlaces desde el componente hijo 
  dataEnlaces = (enlaces) => {
    this.setState({
      enlaces: enlaces
    });
  };

  render() {
   // console.log(this.state.ramos)
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
                        <div align="right">
                          <label className="switch">
                            <input type="checkbox" id="togBtn" onClick={this.togglechange}/>
                            <div className="slider round">
                            <span className="on"><small>Enlace</small></span><span className="off"><small>Archivos</small></span>
                            </div>
                          </label>
                        </div>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                              <Col md="6">
                              <FormGroup>
                                  <Select
                                    closeMenuOnSelect={true}
                                    placeholder="Seleccione una categoria"
                                    options={this.state.categorias}
                                    styles={Constants.colourStyles}        
                                    onChange={(e) => this.setState({ categoria: e.value })}              
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Select
                                    closeMenuOnSelect={true}
                                    placeholder="Ramo   COD-1111"
                                    options={this.state.ramos}
                                    onChange={(e) => this.setState({contenidos: e.Contenidos})}      
                                    styles={Constants.colourStyles}    
                                  />
                                </FormGroup> 
                              </Col>
                              <Col md="6">     
                                <FormGroup>
                                  <Select
                                  closeMenuOnSelect={true}
                                  placeholder="Contenido"
                                  options={this.state.contenidos}
                                  styles={Constants.colourStyles}
                                  onChange={(e) => this.setState({ contenido: e.value })}     
                                  />
                                </FormGroup> 
                                </Col>

                              <Col md="6">     
                                <FormGroup>
                                  <Input
                                    name="descripcion"
                                    placeholder="Describa los archivos para ayudar a la busqueda de estos."
                                    rows="1"
                                    required
                                    type="textarea"
                                    maxLength="200"
                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })} 
                                  />
                                </FormGroup>
                                </Col>
                            </Row>
                            {this.state.enlace
                              ?<Enlaces dataEnlaces = {this.dataEnlaces}/>
                              :<UploadFile dataFromDropZone = {this.dataFromDropZone}/>
                            }          
                          <div className="text-center"> 
                              <Button className="my-4" type="submit" color="primary" > Compartir</Button>
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

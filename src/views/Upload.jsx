import React from "react";
import UploadFile from "components/Upload/UploadFile";
import Enlaces from "components/Upload/Enlaces";
import BaseSelect from "react-select";
import * as Constants from 'services/Constantes'
import { archivo } from 'services/archivos';
import { categoria } from 'services/categoria';
import { ramo } from 'services/ramos';
import FixRequiredSelect from "services/FixRequiredSelect";
import PacmanLoader from 'react-spinners/PacmanLoader';
// reactstrap components
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';
import Breadcrumbs from "components/Navbars/Breadcrumbs"

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
  Form,
} from "reactstrap"; 


class FormUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria:'', contenido: '', descripcion: '', 
      isUploading:false,success:false,enlace:false,
      files:[],enlaces:[], categorias:[], ramos: [],contenidos:[],
      cat_value:[],ramo_value:[],cont_value:[],
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
   

    if(this.state.files.length<=0 && this.state.enlaces.length<=0){
      toast.error('Oops... Debes ingresar al menos un archivo!',{
        className: css({
          background: '#FB6340',
          borderRadius:'10px',
          top:'10em'
        }),
      });

    }else{
      this.setState({isUploading:true})
      const formData = new FormData();
      this.state.files.map((file,index)=>{
          return formData.append(`file${index}`, file);
        })
    
      formData.append('enlaces', JSON.stringify(this.state.enlaces))
      formData.append('cod_categoria', this.state.categoria);
      formData.append('cod_contenido', this.state.contenido);
      formData.append('descripcion', this.state.descripcion);
      formData.append('enlace',this.state.enlace)
      archivo.Upload(formData).then(data=>{
        this.setState({isUploading:false})
        toast.success('Muchas gracias por compartir!',{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });

      })
    }  

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
  //Custom onChange para Customs Selects
  onChange(e,name1,name){
    this.setState({ 
      [name1]:e,
      [name]:e.value 
    });
  };



  render() {

    var color=this.props.user.color;
    var textColor= this.props.textColor;

    const Select = props => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
    />
  );
     return (
      <>  
          <Breadcrumbs page="COMPARTIR" {...this.props} color={color}/>
          <ToastContainer transition={Flip}
                  position= "top-right"
                  autoClose= {3000}
                  hideProgressBar= {false}
                  closeOnClick= {true}
                  pauseOnHover= {true}
                  draggable= {true}
                  />
               {this.state.isUploading?
               <div className="overlay">
                    <div className="divcenter">
                  
                      <PacmanLoader
                        size={60}
                        color={'#ffe800'}
                        loading={this.state.isUploading}
                      />   
                    </div>
                </div> 
                 :''
                 } 
                <Container>
                <p align="justify"> <b>
                    En esta sección puedes compartir distintos tipos de material para estudiar y así ayudar a tus compañeros
                    de las siguientes generaciones.
                     Puedes subir archivos o enlaces completando el siguiente formulario el cual facilita la búsqueda de los mismos. </b> 
                  </p>
                  <br/>
                  <Card className=" shadow border-0">
                      <CardHeader className="bg-white pb-4">
                          <div className="text text-center">
                              <strong><big>Compartir Archivos </big></strong>
                          </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                          <div align="right">
                            <label className="switch">
                              <input type="checkbox" id="togBtn" onClick={this.togglechange}/>
                              <div className="slider round" style={{backgroundColor: color?color:"#8965E0", color:textColor}} >
                              <span style={{color:textColor}} className="on"><small>Enlace</small></span><span style={{color:textColor}} className="off"><small>Archivos</small></span>
                              </div>
                            </label>
                          </div>
                          
                          <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md="6">
                                <FormGroup>
                                    <Select 
                                      placeholder="Categorias"
                                      styles={Constants.colourStyles}    
                                      options={this.state.categorias} 
                                      isSearchable 
                                      value={this.state.cat_value}
                                      onChange={(e) => this.onChange(e,'cat_value','categoria')}   
                                      required 
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="6">
                                  <FormGroup>
                                  <Select 
                                      placeholder="Ramo (COD-1111)"
                                      styles={Constants.colourStyles}    
                                      options={this.state.ramos}
                                      isSearchable 
                                      value={this.state.ramo_value}
                                      onChange={(e) => this.onChange(e,'ramo_value')}   
                                      required 
                                    />
                                  </FormGroup> 
                                </Col>
                                <Col md="6">     
                                  <FormGroup>
                                    <Select
                                    placeholder="Contenido"
                                    options={this.state.ramo_value.Contenidos}
                                    value={this.state.cont_value}
                                    styles={Constants.colourStyles}
                                    onChange={(e) => this.onChange(e,'cont_value','contenido')}  
                                    required  
                                  
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
                                      maxLength="100"
                                      onChange={(e) => this.setState({ [e.target.name]: e.target.value })} 
                                    />
                                  </FormGroup>
                                  </Col>
                              </Row>

                              {this.state.enlace
                                ?<Enlaces dataEnlaces = {this.dataEnlaces} {...this.props}/>
                                :<UploadFile dataFromDropZone = {this.dataFromDropZone} {...this.props}/>
                              }   
                                    
                            <div className="text-center"> 
                            
                                <Button className="my-4" type="submit" style={{backgroundColor:color?color:"#8965e0", color:textColor }}> Subir</Button>
                            </div>
                            </Form>
                      </CardBody>
                  </Card>
                  <br></br>
                </Container>     
      </>
    );
  }
}

export default FormUpload;

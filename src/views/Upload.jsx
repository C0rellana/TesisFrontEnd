import React from "react"
import Enlaces from "components/Upload/Enlaces";
import Breadcrumbs from "components/Navbars/Breadcrumbs"
import {toast } from 'react-toastify';
import {archivo} from "services/archivos"
import HashLoader from 'react-spinners/HashLoader';
import {Card,CardBody,CardHeader,Container,Form,} from "reactstrap"; 
//archivos
import {ApiArchivos,} from "services/api";
import Dropzone from  "components/Upload/dropzone/Dropzone";
import "components/Upload/upload/Upload.css";
import Progress from "components/Upload/progress/Progress";
import Formulario from "components/Upload/Form"
import { auth } from 'services/authenticacion';
import Hidden from '@material-ui/core/Hidden';

class FormUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success:false, 
      isEnlace:false,
      files:[],
      enlaces:[],
      descripcion:null,
      categoria:null,
      contenido:null,
      uploading: false, uploadProgress: {}, successfullUploaded: false
    };
    this.dataEnlaces = this.dataEnlaces.bind(this);
    this.togglechange = this.togglechange.bind(this); 
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.form = this.form.bind(this);
    this.uploadEnlaces = this.uploadEnlaces.bind(this);
    
  }



  render() {
    var color=this.props.user.color;
    var textColor= this.props.textColor;

  
     return (
      <>  
          <Breadcrumbs page="COMPARTIR" {...this.props} color={color}/>

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
                      
                      <Form onSubmit={this.state.isEnlace?this.uploadEnlaces:this.uploadFiles}>
                          <Formulario form={this.form}></Formulario>

                          {this.state.isEnlace
                            ?<Enlaces dataEnlaces = {this.dataEnlaces} {...this.props}/>

                            : 
                            <>
                             <Hidden smDown>
                              <div className="Upload">
                                  <div className="Content">
                                
                                    <div>
                                      <Dropzone
                                        {...this.props}
                                        onFilesAdded={this.onFilesAdded}
                                        disabled={this.state.uploading || this.state.successfullUploaded}
                                      />
                                    </div>
                                    <div className="Files">
                                      {this.state.files.map(file => {
                                        return (
                                        
                                          <div key={file.name} className="Row">
                                            <span className="Filename"><small>{file.name}</small></span>
                                            {this.renderProgress(file)}
                                          </div>
                                        );
                                      })}
                                    </div>   
                                  </div>
                                </div>
                            </Hidden>
                              <Hidden mdUp>
                                <div className="">
                                  <div className="">
                                    <center>
                                   
                                      <Dropzone
                                        {...this.props}
                                        onFilesAdded={this.onFilesAdded}
                                        disabled={this.state.uploading || this.state.successfullUploaded}
                                      />
                                 
                                    </center>
                                  </div>
                                
                                  <hr></hr>
                                  <div style={{  height: "100px", "overflowY": "scroll"}}>
                                      {this.state.files.map(file => {
                                        return (
                                        
                                          <div key={file.name} className="Row">
                                            <span className="Filename"><small>{file.name}</small></span>
                                            {this.renderProgress(file)}
                                          </div>
                                        );
                                      })}
                                    </div>
                                </div>
                              </Hidden>
                            </>
                          
                          }   
                               
                        <div className="text-center"> 
                          <div className="Actions">{this.renderActions()}</div> 
                        </div>
                        </Form>
                  </CardBody>
              </Card>
              <br></br>
            </Container>     
      </>
    );
  }


  //Obtener enlaces desde el componente hijo 
  dataEnlaces = (enlaces) => {
    this.setState({
      enlaces: enlaces
    });
  };
  
  //cambiar entre enlace o archivo
  togglechange() {
    this.setState({
      isEnlace:!this.state.isEnlace
    })
  }
 
  async uploadFiles(e) {
    e.preventDefault();

    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
  
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
      this.setState({ successfullUploaded: false,files: [], uploading: false });
      toast.success("Archivos subidos correctamente")
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: false });
    }
    

  }

  //añadir archivos
  onFilesAdded(files) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
  }

  sendRequest(file) {
    return new Promise( (resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append('cod_categoria', this.state.categoria);
      formData.append('cod_contenido', this.state.contenido);
      formData.append('descripcion', this.state.descripcion);
      formData.append('isEnlace',this.state.isEnlace)
      formData.append("file", file, file.name);
      auth.ConfigHeader().then(r=>{
        req.open("POST", ApiArchivos);
        req.setRequestHeader("Authorization",r.headers.Authorization)
        req.send(formData);
      })
   
    });
  }

  uploadEnlaces(e){
    e.preventDefault();
    var enlaces=this.state.enlaces;
    for (let i = 0; i < enlaces.length; i++) {
      const formData = new FormData();
      formData.append('enlace', JSON.stringify(enlaces[i]));
      formData.append('cod_categoria', this.state.categoria);
      formData.append('cod_contenido', this.state.contenido);
      formData.append('descripcion', this.state.descripcion);
      formData.append('isEnlace',this.state.isEnlace)
      archivo.Upload(formData).then(res=>{
        toast.success("Enlace nº "+(i+1)+" subido")
      })
      
    }

    
 

  }
  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          {uploadProgress && uploadProgress.state === "done" 
            ?<i className="fa fa-check" style={{paddingLeft:"2px"}}/>
            :<i className="fa fa-ellipsis-h" style={{paddingLeft:"2px"}}/>
          }
         

          
        </div>
      );
    }
  }

  renderActions() {

      return (
        <button
          className="btn"
          style={{color:this.props.textColor, backgroundColor:this.props.user.color}}
          type="submit"
          disabled={(!this.state.isEnlace && this.state.files.length <= 0) || this.state.uploading}
        >
          {this.state.uploading
          ? <center>
              <HashLoader
                size={20}
                color={this.props.textColor}
                loading={this.state.isUploading}
              />  
            </center>

            :"SUBIR"}
          
        </button>
      );
    }
 

  form(name,value){
    this.setState({
      [name]:value
    })
  }


}

export default FormUpload;

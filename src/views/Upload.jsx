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
import { carrera } from "services/carrera";

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
      isEnabled:true,
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
  componentDidMount(){
    carrera.isEnabled().then(data=>{
      this.setState({isEnabled:data})
    })
  }
  remove(file){
    var files= this.state.files;
    for( var i = 0; i < files.length; i++){ 
      if ( files[i] === file) {
        files.splice(i, 1); 
      }
   }
   this.setState({files: files})

  }



  render() {
    var color=this.props.user.color;
    var textColor= this.props.textColor;

  
     return (
      <>  
          <Breadcrumbs page="COMPARTIR" {...this.props} color={color}/>
          {this.state.isEnabled?
             <Container>
            <p align="justify"> <b>
                En esta sección puedes compartir distintos tipos de material para estudiar y así ayudar a tus compañeros
                de las siguientes generaciones.
                  Puedes subir archivos o enlaces completando el siguiente formulario; el cual facilita la búsqueda de los mismos. </b> 
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
                                        cant = {this.state.files.length}
                                        {...this.props}
                                        onFilesAdded={this.onFilesAdded}
                                        disabled={this.state.uploading || this.state.successfullUploaded}
                                      />
                                    </div>
                                    <div className="Files">
                                      {this.state.files.map(file => {
                                        return (
                                        
                                          <div key={file.name} className="Row">
                                            {/* <span className="Filename"><small>{file.name}</small></span> */}
                                            <small>
                                              <b>{file.name +" "}</b> ~  {Math.round( file.size/(1000**2)*10)/10 +"Mb "}  
                                              <i className="fa fa-remove" style={{color:"red"}} onClick={e=>this.remove(file)} ></i>
                                             </small> 
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
                                        cant = {this.state.files.length}
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
         
         :  <Container>
              <strong>
                ESTA SECCIÓN ESTA DESHABILITADA DEBIDO A QUE TU CARRERA NO HA CONFIGURADO UNA CUENTA DE ALMACENAMIENTO EXTERNO (DROPBOX/GOOGLE DRIVE).
                PARA ESTO TU CGA O DIRECTOR DEBE COLOCARSE EN CONTACTO CON NOSOTROS.
              </strong>
            </Container>       
        } 
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
    //console.log(enlaces[0].enlace.match(/\bhttps?:\/\/\S+/gi))
    for (let i = 0; i < enlaces.length; i++) {
      var matchEnlaces= enlaces[i].enlace.match(/\bhttps?:\/\/\S+/gi);
      if(matchEnlaces){
        for (let j=0; j< matchEnlaces.length; j++) {
          
          let json={nombre:enlaces[i].nombre, enlace:matchEnlaces[j]}
          const formData = new FormData();
          formData.append('enlace', JSON.stringify(json));
          formData.append('cod_categoria', this.state.categoria);
          formData.append('cod_contenido', this.state.contenido);
          formData.append('descripcion', this.state.descripcion);
          formData.append('isEnlace',this.state.isEnlace)
          this.enviar(formData,matchEnlaces[j])
   
        }
      }
      else{
        toast.error("Debe ingresar los enlaces en el formato correcto")
      }
      
    }
  }
  enviar(formData,nombre){  
    archivo.Upload(formData).then(res=>{
      toast.success("Enlace: " + nombre+ " subido")
    })

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
          style={{color:this.props.textColor, backgroundColor:this.props.user.color?this.props.user.color:"#8965E0"}}
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

import React from 'react';
import {useDropzone} from 'react-dropzone';
import {
  Card
} from "reactstrap";


function UploadFile(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: ['image/*','audio/*','video/*','text/*','application/zip'
            ,'application/rar','application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.oasis.opendocument.text',
            'application/sql'
          ],     
    onDrop: acceptedFiles => {
      //enviar al padre.
      props.dataFromDropZone(acceptedFiles);
    }
  });
  
  const acceptedFilesItems = acceptedFiles.map(file => (  
    <li key={file.path} >
       <small><b>{file.path}</b> ~  {Math.round( file.size/(1000**2)*10)/10} Mb  </small> 
    </li>
  ));



  return (
    <section>
       <Card className="shadow">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <br></br> 
            <center><i className="fa fa-cloud-upload fa-5x" style={{color:'#172b4d'}} ></i></center>
            <center><strong>Arrastrar archivos aquí, o click para seleccionar</strong></center>

            <div align="center">   
              <small>Formatos permitidos: |PDF|IMG|RAR|ZIP|VIDEO|SQL|TXT|PPT/X|XLS/X|DOC/X|</small>
            </div>
          </div>
     
          <hr/>
          <div style={{'height': '100px', 'overflowY': 'scroll'}}>
            <ul>{acceptedFilesItems}</ul>
          </div>
        </Card>
    </section>
  );
}

export default UploadFile;

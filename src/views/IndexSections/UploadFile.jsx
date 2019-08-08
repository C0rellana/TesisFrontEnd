import React from 'react';
import {useDropzone} from 'react-dropzone';

import {
  Card,
  TabPane,
} from "reactstrap";


function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      <strong> {file.name.toUpperCase()} </strong>
    </li>
  ));

  return (
    <section>

        <div className="row">
          <div className="col-md-12">
            <Card className="shadow">
              <TabPane>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <br></br> 
                    <center><i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i></center>
                    <center><strong>Arrastrar archivos aquí, o click para seleccionar</strong></center>
                  </div>
              </TabPane>
              <hr></hr>
              <TabPane>
                   <ul>{files}</ul>
              </TabPane>
            </Card>  
          </div>
        </div>
  </section>
  );
}


export default Basic;

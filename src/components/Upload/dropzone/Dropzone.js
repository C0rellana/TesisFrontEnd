import React, { Component } from "react";
import "./Dropzone.css";
import { toast } from "react-toastify";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false ,cantidad:0};
    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
  
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(event) {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();
    if (this.props.disabed) return;
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list) {
   
    var cant= this.props.cant
    const array = [];
    for (var i = 0; i < list.length; i++) {
      if(cant<10){
        if(list.item(i).size<=100000000){
          cant=cant+1;
          array.push(list.item(i));
        }
        else{  
          toast.error("El archivo "+list.item(i).name+" supera el tamaño máximo establecido")
        }
      }
      else{  
        toast.error("No se puede agregar el archivo "+list.item(i).name+" ,cantidad máxima de archivos alcanzado")
      }
     
     
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <i className="fa fa-cloud-upload fa-5x" style={{color:this.props.user.color?this.props.user.color:"#8965E0"}} ></i>
        <span><small>Max Files : 10</small></span>
        <span><small>Max Size : 100mb</small></span>
        
       
       
      </div>
    );
  }
}

export default Dropzone;

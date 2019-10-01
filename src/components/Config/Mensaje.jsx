import React, { Component } from 'react';
import {
    Col,Row,Input
  } from "reactstrap";
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { admin } from "services/admin";
import { toast } from 'react-toastify';

var stateFromHTML = require('draft-js-import-html').stateFromHTML;

class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editorState: EditorState.createEmpty(),
            tipo:"primary",
        }
        this.onEditorStateChange= this.onEditorStateChange.bind(this)
        this.enviar= this.enviar.bind(this)
        this.tipo= this.tipo.bind(this)
        this.eliminar= this.eliminar.bind(this)
      }
      async componentDidMount(){
        var a= await admin.GetMensaje();
        if(a.length >0){
          let contentState = stateFromHTML(a[0].mensaje);
          this.setState({
            editorState: EditorState.createWithContent(contentState) 
          })
       }
      }
    
    onEditorStateChange(editorState){
      this.setState({
        editorState,
      });
    };
    tipo(e){
      this.setState({
        tipo:e.target.id
      })
   
    }
    enviar(){
      try {
        var mensaje =draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        admin.SetMensaje({mensaje:mensaje,tipo:this.state.tipo,estado:true}).then(data=>{
         let contentState = stateFromHTML(data.mensaje);
         this.setState({
           editorState: EditorState.createWithContent(contentState) 
         })
         toast.success('Mensaje publicado');
       });
        
      } catch (error) {
        toast.error('Error al realizar la acción');
      }
  

    }
    eliminar(){
      admin.SetMensaje({estado:false}).then(data=>{
        this.setState({
          editorState:null
        })
        toast.success('Mensaje eliminado');
      });
  
    }

  
    render() {
      const { editorState } = this.state;
      return (
        <Row>
            <Col> 
                <p><small>Enviar un mensaje o alerta a los usuarios del sistema.</small></p>
                <Row>
                    <Col md="8" align="right" >
                        <b>Tipo de mensaje</b>
                    </Col>
                    <Col md="2" align="right">
                        <Input
                            id="primary"
                            name="tipo"
                            type="radio"
                            defaultChecked
                            onClick={this.tipo}
                        />
                        <label>Información</label>
                    </Col>
                    <Col md="2" align="right">
                        <Input
                        id="warning"
                        name="tipo"
                        type="radio"
                        onClick={this.tipo}
                    />
                    <label>Alerta </label>
                    </Col>
                </Row>
               
               
                <br></br>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Ingrese su mensaje aquí."
                />
                 <br></br>
                <div align="center">
                <button className="btn btn-danger" onClick={this.eliminar}>Eliminar mensaje</button>
                 <button className="btn btn-success" onClick={this.enviar}>Enviar mensaje</button>
                </div>
            
              
          </Col>
        </Row>
      );
    }
  }

export default EditorConvertToHTML;

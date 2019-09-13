import React from "react";
import {Modal,Button,Input,Form}from "reactstrap";
import BaseSelect from "react-select";
import * as Constants from 'services/Constantes'
import FixRequiredSelect from "services/FixRequiredSelect";
import {denuncias} from "services/denuncias"
import { toast} from 'react-toastify';
class MiModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      denuncia:[],
      Descripcion:'',
    };
    this.submit = this.submit.bind(this); 
  };

  async submit(event){
    event.preventDefault();
    let respuesta= await denuncias.Denunciar(this.props.idArchivo,this.state.denuncia.value,this.state.Descripcion);
    if(respuesta.status){
      toast.info('Tu denuncia fue enviada');
      this.setState({
        modal:false
      })
    }
  }

  //actualiza componente si el valor del archivo denunciado es distinto
  componentDidUpdate(prevProps){
    if(this.props.idArchivo !==prevProps.idArchivo){
      this.setState({
        modal:this.props.isOpen
      })
    }
  }

  async componentDidMount(){
    this.setState({
      modal:this.props.isOpen,
      TiposDenuncias : await denuncias.GetTipos()
    })
   
  }
  toggleModal(value,tableMeta){
    this.setState({
      modal:false
    });
  };
  onChange(e){
    this.setState({ 
        denuncia:e
    });
  };


  render() {  
    
  

    const Select = props => (
        <FixRequiredSelect
          {...props}
          SelectComponent={BaseSelect}
        />
      );

      return (
      <>      
      
        <Modal
          className="modal-dialog-centered"
          isOpen={this.props.isOpen && this.state.modal}
          toggle={() => this.toggleModal()}
        >
            <Form onSubmit={this.submit}>
                <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                         DENUNCIAR ESTE CONTENIDO
                    </h6>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal()}
                    >
                    <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                        <Select 
                            placeholder="Tipo de Denuncia"
                            styles={Constants.colourStyles}    
                            options={this.state.TiposDenuncias} 
                            isSearchable 
                            value={this.state.denuncia}
                            onChange={(e) => this.onChange(e)}   
                            required 
                        />
                        <br></br>
                        <Input rows="1" type="textarea" onChange={(e) =>  this.setState({Descripcion:e.target.value})}  required placeholder="Descripción de la denuncia"></Input>
                </div>
                <div className="modal-footer">
                    <Button color="danger" type="submit">
                         ENVIAR DENUNCIA
                    </Button>
                </div>
          </Form>

        </Modal>
      </>
    );
  }
}

export default MiModal;


import React from "react";
import {
  Input,Button,Col,Row,
} from "reactstrap";
import { carrera} from 'services/carrera';
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';

class Token extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        disabled:true,
        token:'******************'
    };
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }
  componentDidMount(){
  }
  edit(){
      this.setState({
        disabled:false,
      })
  }
  save(){
    var token=this.state.token;
    carrera.CarreraToken(token).then(r=>{
      if(r.success){
        toast.success('Token modificado',{
          className: css({
            borderRadius:'10px',
            top:'10em'
          }),
        });
        this.setState({
          disabled:true,
          token:'******************',
        })
      }
    })
    
   
}

  render() {
    return (
      <>
        <ToastContainer transition={Flip}
            position= "top-right"
            autoClose= {3000}
            hideProgressBar= {false}
            closeOnClick= {true}
            pauseOnHover= {true}
            draggable= {true}
        />
      <p><small>Editar cuenta de almacenamiento. <b>Cuidado! al modificar esta opcion los datos almacenados seran removidos</b></small></p>
      <Row>
          <Col md="9">        
            <Input name="token" 
            disabled={this.state.disabled} 
            onChange={e=>this.setState({token:e.target.value})} 
            value={this.state.token}
            placeholder="INGRESE TOKEN"
            />  
            <br/>
          </Col>
          <Col md="3">
            {this.state.disabled
                ? <Button onClick={this.edit}> <i className="fa fa-pencil"></i></Button>
            
                : <Button onClick={this.save}> <i className="fa fa-check"></i></Button>
            } 
             <br/>
          </Col>
      </Row>
      </>
    );
  }
}

export default Token;

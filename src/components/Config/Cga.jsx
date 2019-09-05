import React from "react";
import {
    Row,
    Col,
    Input,
    Button,
    Form
  } from "reactstrap";
import { role} from 'services/roles';
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';

class Cga extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        enable:'',
        rut:'',
        data:[]
      };
      this.DeleteCga = this.DeleteCga.bind(this);
      this.NewCga = this.NewCga.bind(this);
  }
  componentDidMount(){
    role.getRoleCga().then(r=>{
      this.setState({
        data:r
      }) 
    })
  }


  DeleteCga(rut){
      var obj={
        rut:rut,
        role:"USER",
      }
      role.EditRol(obj).then(r=>{
        if(r.status){
          role.getRoleCga().then(r=>{
            this.setState({
              data:r
            }) 
          })
          toast.success('CGA eliminado',{
            className: css({
              borderRadius:'10px',
              top:'10em'
            }),
          });
        }
      });

  }
  NewCga(e){
      e.preventDefault();
      var obj={
        rut:this.state.rut,
        role:"CGA",
      }
      role.EditRol(obj).then(r=>{
        if(r.status){
          role.getRoleCga().then(r=>{
            this.setState({
              data:r
            }) 
          })
          toast.success('Nuevo CGA añadido',{
            className: css({
              borderRadius:'10px',
              top:'10em'
            }),
          });
        }
        else{
          toast.error(r.message,{
            className: css({
              borderRadius:'10px',
              top:'10em'
            }),
          });
        }
       
      });

  }


  render() {
   
    var data= this.state.data;

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
       <p><small>Asignar rol de <b>CGA</b> a un usuario.</small></p>
      <Row>
        <Col>
    
        {
          data.map((user, index) => 
          <Row key={index}>
              <Col  md="6" >
                <Input value={user.nombre.toUpperCase()}  disabled={true}/> 
                <br/>
              </Col>
              <Col md="3">
                <Input value={user.rut} disabled={true}/><br/>
                </Col>
              <Col  md="3">
                <Button onClick={e=>this.DeleteCga(user.rut)}> <i className="fa fa-trash"></i></Button>
                <br/><br/>
              </Col>
              </Row>
          )
          }
          <Form onSubmit={this.NewCga} >
           <Row>
              <Col md="6">   
                  <br/>
                </Col>
                <Col md="3">
                  <Input placeholder="Rut" onChange={e=>this.setState({rut:e.target.value})}  required/><br/>
                  </Col>
                <Col md="3">
                  <Button type="submit"> <i className="fa fa-save"></i></Button>
                  <br/> <br/>
                </Col>
              </Row>
              </Form>
          </Col>
        </Row>
     
        </>
    );
  }
}

export default Cga;

import React from "react";
import  { withRouter} from 'react-router-dom'
import { auth } from 'services/authenticacion';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledAlert,
  CardHeader
} from "reactstrap";

class Contraseña extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email:'',
      alert: false,
      mensaje:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  componentDidMount(){
  }

  onDismiss() {
    this.setState({alert: false})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value
    this.setState({
      email: value
    });
  }


  async handleSubmit(event) {
    event.preventDefault();
    var object={
      correo: this.state.email,
    }
  
  var data= await auth.Restablecer(object)

  if(data.success){
  
    this.props.handleClick("login","res",data.message);
  }
  else{
    this.setState({
      alert:true,
      message:data.message,
    })
  }
}


  render() {
    const {handleClick} = this.props;

    return (
      <>            
            <Card className="shadow border-0">
              <CardHeader className="bg-white pb-4">
                  <div className="text text-center">
                      <strong><big>COMPARTE UCM 2019 </big></strong>
                      <br/>
                      <strong><small>RESTABLECER CONTRASEÑA</small></strong>
                  </div>
                </CardHeader>
                <CardBody className=" px-lg-5 py-lg-5">
                <UncontrolledAlert color="danger" fade={true} isOpen={this.state.alert} toggle={this.onDismiss}>
                      <small >
                        {this.state.message}
                      </small>
                 </UncontrolledAlert>


                    <Form onSubmit={this.handleSubmit}>
                                       
                        <FormGroup >
                            <InputGroup className=" mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                <i className="ni ni-email-83" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Correo" type="email" name="email"  onChange={this.handleInputChange}required/>
                            </InputGroup>
                        </FormGroup>
                       
                        <div className="text-center"> 
                            <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            >
                            Restablecer
                            </Button>
                        </div>
                        <div className="text-center">
                        <hr></hr>

                        <button className="text-light text-center miboton" onClick={e=>handleClick("login")} >
                            <small>Ya tengo una cuenta.  <strong>Iniciar Sesión</strong></small>       
                        </button>
          
                        </div>
                    </Form>
                </CardBody>
            </Card>  
        
      </>
    );
  }
}

export default withRouter(Contraseña)


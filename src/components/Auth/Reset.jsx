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
  CardHeader
} from "reactstrap";

class Contraseña extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password:'',
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
    password: value
    });
  }


  async handleSubmit(event) {
    event.preventDefault();
    var object={
        password: this.state.password,
        token: this.props.history.location.pathname
    }
  
  var data= await auth.CambiarContraseña(object)
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

                    <Form onSubmit={this.handleSubmit}>
                                       
                        <FormGroup>
                            <InputGroup className="">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                required
                                placeholder="Nueva contraseña"
                                type="password"
                                autoComplete="off"
                                name="password"
                                minLength="6"
                                onChange={this.handleInputChange}
                                />
                            </InputGroup>
                        </FormGroup>
                       
                        <div className="text-center"> 
                            <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            >
                            CAMBIAR
                            </Button>
                        </div>
                      
                    </Form>
                
                </CardBody>
            </Card>  
        
      </>
    );
  }
}

export default withRouter(Contraseña)


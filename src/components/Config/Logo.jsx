import React from "react";
import {
  Input,Col,Row
} from "reactstrap";
import { admin} from 'services/admin';

class Logo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logo(event){
    const formData = new FormData();
    var file=event.target.files[0];
    formData.append('file', file);
    admin.ChangeLogo(formData).then(r=>{
      if(r.success){
        window.location.reload();
      }
    })
  }



  render() {
    return (
      <>
      <p><small>Modificar logo de sistema.</small></p>
      <Row>
        <Col>
          <Input type="file" accept="image/*" onChange={this.logo} ></Input>
          
        </Col>

      </Row>
       
     
      </>
    );
  }
}

export default Logo;

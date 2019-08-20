import React from 'react';
import {
  Row,
  Col,
  Input,
} from "reactstrap";


class Enlaces extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        Inputs: [{nombre:'nombre-0', enlace: 'enlace-0',row:`row-0`}],
        enlaces: [{nombre:'',enlace:''}],
        disabled:true
      };
      this.handleChange = this.handleChange.bind(this);
    }

    appendInput() {
      var NewInput = {nombre:`nombre-`+this.state.Inputs.length, enlace:`enlace-`+this.state.Inputs.length,row:`row-`+this.state.Inputs.length}
      this.setState(prevState => ({ Inputs: prevState.Inputs.concat([NewInput]),enlaces: prevState.enlaces.concat([{nombre:'',enlace:''}])}));    
    }
    removeInput() {
      if(this.state.Inputs.length>1){
        this.state.Inputs.pop();
        this.state.enlaces.pop();
        this.setState({});  
      }      
    }

    

  handleChange(e) {
    var input= e.target.name.split('-')
    var attr = input[0];
    var pos= input[1];
    var value= e.target.value;
    
    this.state.enlaces.map(function callback(e, i, array) {
      if(i===parseInt(pos)){ e[attr]=value }
      return array;
    }); 
    this.props.dataEnlaces(this.state.enlaces);
  } 


    render() {
      return (
          <section>
            
            {this.state.Inputs.map(Inputs =>
              <Row key={Inputs.row+'a'}>
                <Col md="6" key={Inputs.row+'b'} >
                    <Input type="text" placeholder="Nombre del enlace" maxLength="10" key={Inputs.nombre} name={Inputs.nombre} onChange={this.handleChange} required />
                    <br/>
                  </Col>
                <Col md="6" key={Inputs.row+'c'}>
                  <Input type="url" placeholder="URL: http://www.Mienlace.com" key={Inputs.enlace} name={Inputs.enlace} onChange={this.handleChange} required/>
                  <br/>
                </Col>
                
              </Row>
                )}   

              <div align="right">
              <button className="miboton"  onClick={() => this.appendInput()}>
                  <i style={{color:"#172B4D"}} className="fa fa-plus-circle fa-2x"></i>
              </button>
              <button className="miboton" onClick={() => this.removeInput()}>
                  <i style={{color:"#172B4D"}} className="fa fa-minus-circle fa-2x"></i>
              </button>
              </div>
          </section>
      

      )
  }
}

export default Enlaces;

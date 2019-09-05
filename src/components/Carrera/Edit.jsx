import React from 'react';
import { ramo } from 'services/ramos'
import {Button,  Row, Col,Input,Label} from "reactstrap";

  class EditRamo extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
          disabled:true,
          nombre:'',
          codigo:'',

      };
      this.edit = this.edit.bind(this);
      this.save = this.save.bind(this);
      this.delete = this.delete.bind(this);
      this.changeinput = this.changeinput.bind(this);
    }

    componentDidUpdate(prevProps){
        if (prevProps.ramo !== this.props.ramo) {
          this.setState({
            nombre:this.props.ramo.nombre,
            codigo:this.props.ramo.codigo
          })
        }
      }
      componentDidMount(){
        this.setState({
            nombre:this.props.ramo.nombre,
            codigo:this.props.ramo.codigo
          })
      }
    

    render() {

        var disabled= this.state.disabled
        var {nombre,codigo} = this.state;

        return (<>
                <Row> 
                    <Col md="7">
                    <Label>NOMBRE DEL RAMO</Label>
                    <Input name="nombre" value={nombre}  disabled={disabled} onChange={e=>this.changeinput(e.target)} /> 
                    </Col>
                    <Col md="2">
                    <Label>CODIGO </Label>
                    <Input name="codigo"  value={codigo} disabled={disabled}  onChange={e=>this.changeinput(e.target)}/> 
                    </Col>
                    <Col md="3" align="center"> 
                        <Label>OPCIONES</Label>
                        <br></br>
                        {disabled
                            ?<Button onClick={this.edit} color="info"  ><i className="fa fa-pencil" ></i> </Button>
                            :<Button onClick={this.save} color="success"  ><i className="fa fa-check" ></i> </Button>
                        }
                        <Button onClick={this.delete} color="danger"  ><i className="fa fa-trash" ></i> </Button>
                        
                    
                    </Col>
                </Row>
        </>);
    }

    changeinput(e){
    var name= e.name;
    var value= e.value;
    this.setState({
        [name]:value
    })
    }


    async delete(){
        var id=this.props.ramo.id;
        await ramo.DeleteRamo(id).then( r=>{
            this.setState({disabled:true})
    })
        this.setState({disabled:false})
        this.props.actualizar("delete");
    }

    edit(){
        this.setState({disabled:false})
    }
    async save(){

        var obj={
            id:this.props.ramo.id,
            nombre:this.state.nombre,
            codigo:this.state.codigo,
        }
        await ramo.EditRamo(obj).then(r=>{
            this.setState({disabled:true})
            this.props.actualizar();
    })
        
    }
};

export default EditRamo;


import React from 'react';
import TablaCarrera from "components/Carrera/tabla"
import {  Row, Col,Input,Button,Label,Card,CardBody} from "reactstrap";
import { ramo } from 'services/ramos'
import Edit from "components/Carrera/Edit"
import { Container } from '@material-ui/core';
import Breadcrumbs from "components/Navbars/Breadcrumbs"

class Carrera extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DataRamos:[],
      nombre:'',
      codigo:'',
      ramo:[],
      nuevo:true,
      ListFilter:[],
         
    };
    this.NuevoRamo = this.NuevoRamo.bind(this);
    this.changeinput = this.changeinput.bind(this);
    this.clickramo = this.clickramo.bind(this);
    this.nuevo = this.nuevo.bind(this);
    this.actualizar = this.actualizar.bind(this);
    this.search = this.search.bind(this);
    
  }
 async componentDidMount(){
    this.setState({
      DataRamos: await ramo.getRamos(),
   })
  }

  render() { 
    var color=this.props.user.color;
    var textColor= this.props.textColor;
   
    var Ramos = this.state.ListFilter.length>0
      ?this.state.ListFilter
      :this.state.DataRamos;

    var ramo = this.state.ramo;
    return (
      <>
      <Breadcrumbs page="MI CARRERA"  {...this.props} />
      <Row>
        <Col>
          <Container> 
            <Row>
              <Col md="3">
                <Input type="search" placeholder="Buscar" onChange={e=>this.search(e)}></Input>
                <br></br>
                <Card>
                  <CardBody>
                    <div style={{'height': '440px', 'overflowY': 'scroll'}}>
                        <li key="add" style={{listStyleType:"none"}} > 
                          <Button  style={{backgroundColor:color?color:"#8965E0",color:textColor}}  block onClick={this.nuevo}>
                            <i className="fa fa-plus"></i> Nuevo Ramo
                          </Button>
                          <br/>
                        </li>
                        { Ramos.map((ramo, index) =>              
                            <li key={index} style={{listStyleType:"none"}}> 
                              <Button  block  onClick={e=>this.clickramo(e,index)}>
                                <small>
                                { ramo.nombre.length<30? ramo.nombre: ramo.nombre.slice(0, 25)+'...' }
                                </small>
                                
                              </Button>
                              <br/>
                            </li>
                        )}
                      </div>
                    </CardBody>
                  </Card>           
              </Col>
              <Col md="9">
                <Card className="shadow">
                  <CardBody>
                      {this.state.nuevo
                      ? <div style={{'height': '517px'}} >
                          <Row> 
                            <Col md="8">
                              <Label>NOMBRE DEL RAMO</Label>
                              <Input name="nombre" placeholder="RAMO 1" onChange={e=>this.changeinput(e.target)} /> 
                            </Col>
                            <Col md="4">
                              <Label>CODIGO</Label>
                              <Input name="codigo" placeholder="CODIGO-1" onChange={e=>this.changeinput(e.target)}/> 
                            </Col>
                          </Row>
                          <br></br>
                          <Button style={{backgroundColor:color?color:"#8965E0",color:textColor}} onClick={this.NuevoRamo} block>GUARDAR CAMBIOS</Button>
                        </div>

                      : <>
                        <Edit actualizar={this.actualizar} ramo={ramo}/>
                          <br/>
                          
                        <TablaCarrera ramo={ramo.id}/>
                        </>
                      }
                  </CardBody>
                </Card>
              </Col>
            </Row>
         </Container>
        </Col>
      </Row>
      </>
    );
  }

  actualizar(e){
    ramo.getRamos().then(r=>{
      if(e==="delete"){
        this.setState({
          DataRamos: r,
          nuevo: true,
        })
      }  
      else{
        this.setState({
          DataRamos: r,
       })
      }
    })
}

  NuevoRamo(){
    var obj={
      nombre:this.state.nombre,
      codigo:this.state.codigo,
    }
   ramo.NuevoRamo(obj).then(r=>{
    if(r.status){
      this.setState({
        DataRamos: this.state.DataRamos.concat(r.data)
      })
      
    }
   })
  }
  

  search(e){
    var List = this.state.DataRamos;
    var q= e.target.value.toLowerCase();

    List = List.filter(ramo => {
      if(ramo.nombre.toLowerCase().indexOf(q) !== -1){
        return ramo;
      }
      return ''
    });
    if(List.length>0){
      this.setState({
        ListFilter: List
     })
    }
    
  }


  changeinput(e){
    var name= e.name;
    var value= e.value;
    this.setState({
      [name]:value
    })
  }
  
  clickramo(e,id){
    e.preventDefault();
    this.setState({
      ramo: this.state.DataRamos[id],
      nuevo:false
    })
  }

  nuevo(){
    this.setState({nuevo:true})
  }

}

export default Carrera;


import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,InputGroupText
} from "reactstrap";

import HashLoader from 'react-spinners/HashLoader';
import  {Calcular} from "services/nota";
import { Column,Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';
import Breadcrumbs from "components/Navbars/Breadcrumbs"
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUploading:false,
      data:[],
      Inputs: [{porcentaje:'porcentaje-0', nota: 'nota-0',row:`row-0`},{porcentaje:'porcentaje-1', nota: 'nota-1',row:`row-1`}],
      notas: [{porcentaje:'',nota:''},{porcentaje:'',nota:''}],
      disabled:true,
      notadeseada:40
    };
    this.Calcular = this.Calcular.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeNotaDeseada = this.changeNotaDeseada.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.comprobarPorcentajes = this.comprobarPorcentajes.bind(this);
    this.comprobarNotas = this.comprobarNotas.bind(this);
  }

  render() {
    var color = this.props.user.color;
    var textColor= this.props.textColor;
    var data = this.state.data
    var len=this.state.notas.length;
    var c1=1000/len, c2=1000/len,c6=1000/len;
    var c3=0, c4=0 ,c5=0;
    if(len>2)c3=1000/len;
    if(len>3)c4=1000/len;
    if(len>4)c5=1000/len;
   

    return (
        
      <>

        <Breadcrumbs page="CALCULAR NOTAS" {...this.props} />
        
        <ToastContainer transition={Flip}
                  position= "top-right"
                  autoClose= {3000}
                  hideProgressBar= {false}
                  closeOnClick= {true}
                  pauseOnHover= {true}
                  draggable= {true}
                  />

          <Container >
            <p align="justify"> <b>
                  En esta sección puedes calcular las notas faltantes para aprobar un ramo con cierta nota deseada.
                  Puedes calcular hasta cinco notas siempre y cuando ingreses un mínimo de dos notas
                  o calcular hasta cuatro notas ingresando simplemente una.</b> 
            </p>
            <br/>
            <Form onSubmit={this.Calcular} >
              <Row >
                {this.state.Inputs.map((Inputs,index) =>
                  <Col md="2"  key={"z"+Inputs.porcentaje} >
                    <center>
                     <small><b>Ingrese Porcentaje {index+1} </b></small>
                    </center>
                    <InputGroup className="input-group">
                      <Input type="text"  placeholder="100" max="100" min="1" style={{color:"#000"}} name={Inputs.porcentaje} key={Inputs.porcentaje} onChange={this.handleChange} required/>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="fa fa-percent"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <br/>
                    <center>
                      <small><b>Ingrese Nota {index+1} </b></small>
                    </center>
                    <InputGroup className="input-group">
                      <Input type="text"  placeholder="40" max="70" min="10" style={{color:"#000"}}  name={Inputs.nota} key={Inputs.nota} onChange={this.handleChange}/>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="fa fa-hand-o-left"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
       
                    <br/>
                
                  </Col>   
                )}  
                
                 <Col align="right">
                   <br></br>
                   <div >
                    <button className="miboton" type="button" onClick={() => this.appendInput()}>
                        <i style={{color:color?color:"#8965e0"}} className="fa fa-plus-circle fa-2x"></i>
                    </button>
                    <button className="miboton" type="button" onClick={() => this.removeInput()}>
                        <i style={{color:color?color:"#8965e0"}} className="fa fa-minus-circle fa-2x"></i>
                    </button>
                  </div> 
                  </Col>
                </Row>
              <Row>
                <Col md="2">   
                  <div align="center">
                    <center>
                      <small><b>Nota Deseada </b></small>
                    </center>
                    <InputGroup className="input-group">
                      <Input type="text"  value={this.state.notadeseada} style={{color:"#000"}}  max="100" min="1"   onChange={this.changeNotaDeseada} required/>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-hand-o-left"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                  </div>    
                </Col>
                <Col md="2"> 
                  <br></br>
                  <button className="btn" style={{backgroundColor:color?color:"#8965e0" ,width:"145px", color:textColor}} type="submit">
                     {this.state.isUploading?
                     <center>
                    <HashLoader
                      size={20}
                      color={textColor}
                      loading={this.state.isUploading}
                    />   </center>

                      : <b>Calcular</b>  }
                  </button>  
                
                </Col>
              </Row>
             
            </Form>
            <br/><br/>
 
            <div style={{"overflowX":"scroll","overflowY":"hidden",width:"1000",height:"auto"}}>
              <Table
                
                rowStyle={{border:"1px solid", }}
             
                width={1000}
                height={500}
                headerHeight={40}
                rowHeight={30}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowClassName={({ index }) => (index % 2 === 0 ? "color1" : "color2")}
              >
                <Column
                  width={c1}
                  label='Nota 1'
                  dataKey='nota1'
                  
                />
                <Column
                  width={c2}
                  label='Nota 2'
                  dataKey='nota2'
                />
                
                <Column
                  width={c3}
                  label='Nota 3'
                  dataKey='nota3'
                />
                <Column
                  width={c4}
                  label='Nota 4'
                  dataKey='nota4'
                />
                <Column
                  width={c5}
                  label='Nota 5'
                  dataKey='nota5'
                />
                  <Column
                  width={c6}
                  label='Promedio Final'
                  dataKey='final'
                />            
              </Table>
            </div>
         </Container>
      </>
    );
  }


  //ENVIA LAS NOTAS PARA CALCULAR.
  Calcular(e){
    e.preventDefault();
    var N= this.state.notas;
    var notas = [];
    var porcentajes=[]
    if(this.comprobarPorcentajes() && this.comprobarNotas() ){
      this.setState({isUploading:true})
      for (let i = 0; i < N.length; i++) {
        notas.push(N[i].nota)
        porcentajes.push(N[i].porcentaje)
      }
      
      Calcular({Notas:notas,Porcentajes:porcentajes,notadeseada:this.state.notadeseada}).then((data)=>{
        if(data.length===0){
          toast.info('Oops... No se puede alcanzar la nota deseada :( ',{
            className: css({
              borderRadius:'10px',
              top:'10em'
            }),
          });
        }
        this.setState({
          data:data,
          isUploading:false
        })
   
      })

    }
   
  }
//AGREGAR NUEVA NOTA
  appendInput() {
    if(this.state.Inputs.length<5){
      var NewInput = {porcentaje:`porcentaje-`+this.state.Inputs.length, nota:`nota-`+this.state.Inputs.length,row:`row-`+this.state.Inputs.length}
      this.setState(prevState => ({ Inputs: prevState.Inputs.concat([NewInput]),notas: prevState.notas.concat([{porcentaje:'',nota:''}])}));    
    } 
  } 
//REMOVER NOTA
  removeInput() {
    if(this.state.Inputs.length>2){
      this.state.Inputs.pop();
      this.state.notas.pop();
      this.setState({});  
    }      
  }

//MODIFICAR NOTA DESEADA
  changeNotaDeseada(e){
    this.setState({
      notadeseada:e.target.value
    })
  }
//MODIFICAR NOTAS INGRESADAS
  handleChange(e) {
    var input= e.target.name.split('-')
    var attr = input[0];
    var pos= input[1];
    var value= e.target.value;
    
    this.state.notas.map(function callback(e, i, array) {
      if(i===parseInt(pos)){ e[attr]=value }
      return array;
    }); 
  
  }
//COMPROBAR LOS PORCENTAJES SUMEN 100 
  comprobarPorcentajes(){
    var notas = this.state.notas;
    
    var sum = 0;
    for (let i = 0; i < notas.length; i++) {
      sum= sum +parseInt(notas[i].porcentaje);
    }
    if(sum===100){
      return true;
    }
    toast.error('Oops... La suma de los porcentajes debe ser 100!',{
      className: css({
        background: '#FB6340',
        borderRadius:'10px',
        top:'10em'
      }),
    });
    return false;
  }
  //COMPROBAR NOTAS
  comprobarNotas(){

    var notadeseada = parseInt(this.state.notadeseada);
    var notas = this.state.notas;
    var bool = true;
    var cont = 0;

    if(isNaN(notadeseada)){
      toast.error('Oops... La nota deseada debe ser valida!',{
        className: css({
          background: '#FB6340',
          borderRadius:'10px',
          top:'10em'
        }),
      });
      return false;
    }
    if(notadeseada<40 || notadeseada>70){
      toast.error('Oops... La nota deseada debe estar entre 40-70!',{
        className: css({
          background: '#FB6340',
          borderRadius:'10px',
          top:'10em'
        }),
      });
      return false;
    }


    for (let i = 0; i < notas.length; i++) {
      if(notas[i].nota !==""){
        cont =cont+1;
        if(isNaN (parseInt(notas[i].nota))){
          bool =false;
        }
        if(notas[i].nota<10 || notas[i].nota>70){
          bool= false;
        }
      }
    }
    if(cont<1 ){
      toast.error('Oops... Debe ingresar al menos una nota!',{
        className: css({
          background: '#FB6340',
          borderRadius:'10px',
          top:'10em'
        }),
      });
      return false;
    }
  if(notas.length===5 && cont<2 ){
    toast.error('Oops... Debe ingresar al menos 2 notas!',{
      className: css({
        background: '#FB6340',
        borderRadius:'10px',
        top:'10em'
      }),
    });
    return false;
  }
    if(!bool){
    toast.error('Oops... Verifique las notas ingresadas!',{
      className: css({
        background: '#FB6340',
        borderRadius:'10px',
        top:'10em'
      }),
    });
    }
    return bool;
  }

}


export default Home;


import React from "react";
import { categoria } from 'services/categoria';
import classnames from "classnames";
import { ChromePicker } from 'react-color';
import {
  Container,
  Nav,NavItem,NavLink,
  Row,Col,CardBody,Card,TabContent,TabPane
} from "reactstrap";
import { Input } from "@material-ui/core";
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';
import Breadcrumbs from "components/Navbars/Breadcrumbs"

class Categorias extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            Categorias: [],
            Tab: 1,
            descripcion:'',
            color: {id:'', value: ''},
            nombre: {id:'', value: ''},
    
        };
        this.GuardarCambios = this.GuardarCambios.bind(this);
        this.Eliminar = this.Eliminar.bind(this);
        this.toggleNavs = this.toggleNavs.bind(this);
    
    }

    componentDidMount() {
        categoria.GetCategorias().then(data=>{
            this.setState({
                Categorias: data,
            })
        }) 
    }


    render() {
        
        //variables necesarias
        let nav_item =[],TabPanes=[];
        var {Categorias,color,nombre,descripcion}= this.state;
        var user_color= this.props.user.color;

        for (let i = 0; i < Categorias.length; i++) {   
            nav_item.push(      
                <NavItem key={Categorias[i].value} >
                    <NavLink key={Categorias[i].value}
                        aria-selected="true"
                        className={classnames("mb-sm-3 mb-md-1 ", {
                        active: this.state.Tab===Categorias[i].value,     
                        })}
                        onClick={e => this.toggleNavs(e, "iconTabs", Categorias[i].value)}
                        href="#"
                        role="tab"       
                    > 
                        
                        <small>
                            <span>
                                <i className="fa fa-circle mr-2" style={{
                                    //logica de colores 
                                    color:color?color.id===Categorias[i].value?color.value:Categorias[i].color
                                    :Categorias[i].color
                                    }} 
                                    />
                               
                                {//logica de nombres 
                                    nombre.id===Categorias[i].value
                                    ?nombre.value?nombre.value:Categorias[i].label
                                    :Categorias[i].label
                                }                   
                            </span>
                        </small>     
                    </NavLink>
                </NavItem>
            )  
            TabPanes.push(      
                <TabPane key={Categorias[i].value} tabId={Categorias[i].value}>
                    <Row>
                    
                        <Col md="6">   
                            <br></br>
                            <Col md="12" >   
                                <Input 
                                    type="text" 
                                    style={{display:"block"}} 
                                    placeholder="Nombre de la categoria"
                                  
                                    defaultValue={Categorias[i].label}
                                    required
                                    onChange={e=>this.setState({nombre:{id:Categorias[i].value,value: e.target.value.toString().toUpperCase()}})}

                                />
                            </Col>
                            <br/><br/>
                            <Col md="12">   
                                <Input
                                    id=""
                                    defaultValue={Categorias[i].descripcion}
                                    placeholder="Descripción de la categoria"
                                    rows="3"
                                    style={{display:"block"}}
                                    type="textarea"
                                    required
                                    onChange={e=>this.setState({descripcion:e.target.value})}
                                />
                            </Col>
                            <br/><br/>
                            <Col md="12">   
                            <button
                                    className="btn btn-block"
                                    onClick={this.GuardarCambios}
                                    style={{backgroundColor:user_color?user_color:"#8965e0",color:"#fff"}}
                                    >
                                    Guardar Cambios
                                </button>
                            </Col>
                            <br></br>
                            <Col md="12">   
                                <div> 
                                    <button onClick={this.Eliminar} className="btn btn-danger btn-block">ELIMINAR CATEGORIA </button>
                                </div>
                            </Col>
                        </Col>
                        <Col md="6">   
                            <br></br>
                            
                            <center>
                                <ChromePicker 
                                color={color.value?color.value:Categorias[i].color} 
                                onChange={e=>this.setState({color:{id:Categorias[i].value,value:e.hex}})}
                                />
                            </center>  
                         


                     
   
                        </Col>
                    
                    
                    </Row>
            </TabPane>
            )
        }
           
        return (
            <>
            <Breadcrumbs page="CATEGORIAS" {...this.props} />
             <Row className="justify-content-center">
                <Col lg="12"> 
                    <ToastContainer transition={Flip}
                        position= "top-right"
                        autoClose= {3000}
                        hideProgressBar= {false}
                        closeOnClick= {true}
                        pauseOnHover= {true}
                        draggable= {true}
                    />    
                    <Container>       
                        <p align="justify"> 
                            <b>
                                Esta sección contiene las categorias de su carrera, 
                                puede agregar/eliminar o modificar las actuales.
                                <br></br>
                                <b>Debe tener en cuenta que al eliminar una categoría todos los archivos 
                                    asociados a ella también se eliminaran</b>
                            </b>  
                        </p>
                        <br/>
                        <div className="nav-wrapper">
                            <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist" >
                                {nav_item}   
                                {/* añadir nueva categoria */}
                                <NavItem key="add" >
                                    <NavLink key="addlink"
                                        onClick={e => this.toggleNavs(e, "iconTabs", "add")}
                                        className={classnames("mb-sm-3 mb-md-1 ", {
                                        active: this.state.Tab==="add",     
                                        })}
                                        href="#"
                                        role="tab" 
                                        > 
                                        <small>
                                            <span>
                                        
                                                <i className="fa fa-plus mr-2" style={{
                                                //logica de colores 
                                                color:color?color.id==="add"?color.value:"#000"
                                                :"#000"
                                                }} />
                                                {//logica de nombres 
                                                
                                                nombre.id==="add"
                                                ?nombre.value?nombre.value:"AÑADIR"
                                                :"AÑADIR"
                                                } 

                                            </span>
                                        </small>     
                                    </NavLink>
                                </NavItem>      
                            </Nav>    
                        </div>
                        <Card className="shadow">
                            <CardBody>
                                <TabContent activeTab={this.state.Tab}>
                                    {TabPanes}
                                    {/* añadir nueva categoria */}
                                    <TabPane key="addlink" tabId="add">
                                        <Row>               
                                            <Col md="6">   
                                                <br></br>
                                                <Col md="12" >   
                                                    <Input 
                                                        type="text" 
                                                        style={{display:"block"}} 
                                                        placeholder="Nombre de la categoria"
                                                        required
                                                        value={nombre.value}
                                                        onChange={e=>this.setState({nombre:{id:"add",value:e.target.value.toString().toUpperCase()}})}

                                                    />
                                                </Col>
                                                <br/><br/>
                                                <Col md="12">   
                                                    <Input
                                                        id=""
                                                        placeholder="Descripción de la categoria"
                                                        rows="3"
                                                        style={{display:"block"}}
                                                        type="textarea"
                                                        required
                                                        value={descripcion}
                                                        onChange={e=>this.setState({descripcion:e.target.value})}
                                                    />
                                                </Col>
                                                <br/><br/>
                                                <Col md="12">   
                                                <button
                                                        onClick={this.GuardarCambios}
                                                        className="btn btn-block"
                                                        style={{backgroundColor:user_color?user_color:"#8965e0",color:"#fff"}}
                                                        >
                                                        Guardar Cambios
                                                    </button>
                                                </Col>
                                            </Col>
                                            <Col md="6">   
                                                <center>
                                                    <ChromePicker 
                                                    color={color.value} 
                                                    onChange={e=>this.setState({color:{id:'add',value:e.hex}})}
                                                    />
                                                </center>     
                                            </Col>
                                        
                                        
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Container>
                </Col>
        </Row>
         </>
         );
    }

    
    GuardarCambios(){
        var {descripcion, Tab,color,nombre} =this.state;

        var object={
            id:Tab,
            descripcion:descripcion,
            color: color.value,
            nombre : nombre.value
        }
        if(Tab==="add"){
            //agregar
            categoria.AgregarCategoria(object).then((resp)=>{
                if(resp.status){
                    toast.success(resp.message,{
                        className: css({
                          borderRadius:'10px',
                          top:'10em'
                        }),
                      });
                    categoria.GetCategorias().then(data=>{
                        this.setState({
                            Categorias: data,
                            descripcion:'',
                            color: {id:'', value: ''},
                            nombre: {id:'', value: ''},
                            
                        })
                    }) 
    
                }
                else{
                    toast.error(resp.message,{
                        className: css({
                          borderRadius:'10px',
                          top:'10em'
                        }),
                      });
                }
            })
        }
        else{
            categoria.EditarCategoria(object).then((resp)=>{
                if(resp.status){
                    toast.success(resp.message,{
                        className: css({
                          borderRadius:'10px',
                          top:'10em'
                        }),
                      });
                    categoria.GetCategorias().then(data=>{
                        this.setState({
                            Categorias: data,
                        })
                    }) 
    
                }
                else{
                    toast.error(resp.message,{
                        className: css({
                          borderRadius:'10px',
                          top:'10em'
                        }),
                      });
                }
            })
        }

    }
    Eliminar(){
        categoria.EliminarCategoria(this.state.Tab).then((resp)=>{
            if(resp.status){
                toast.success(resp.message,{
                    className: css({
                      borderRadius:'10px',
                      top:'10em'
                    }),
                  });
                categoria.GetCategorias().then(data=>{
                    this.setState({
                        Categorias: data,
                    })
                }) 

            }
            else{
                toast.error(resp.message,{
                    className: css({
                      borderRadius:'10px',
                      top:'10em'
                    }),
                  });
            }
        })
    }
    toggleNavs(e, state, index){
        e.preventDefault();
        this.setState({
            Tab :index,
            descripcion:'',
            color: {id:'', value: ''},
            nombre: {id:'', value: ''},
        })
    }
}

export default Categorias;


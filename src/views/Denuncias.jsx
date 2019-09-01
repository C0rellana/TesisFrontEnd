import React from "react";
import classnames from "classnames";
import Tabla from "components/denuncia/Tabla"
import SelectRamo from "components/denuncia/Select"
import { denuncias } from 'services/denuncias';
import { ToastContainer,toast,Flip } from 'react-toastify';
import { css } from 'glamor';
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Col,Row,
} from "reactstrap";


class Navs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: "",
      Ramoid:[],
      Data:[]
    };
    this.changeRamo = this.changeRamo.bind(this);
    this.toggleNavs = this.toggleNavs.bind(this);
    this.showToast = this.showToast.bind(this);
    
  }


  render() {
   
    return (
      <>
        <Row className="justify-content-center">
          <Col lg="12">
          <ToastContainer 
                    transition={Flip}
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
                          Esta sección contiene las denuncias realizadas por alumnos de la carrera a distintos archivos,
                          usted puede aceptar o rechazar estas denuncias.
                          Para facilitar la tarea usted tiene la opción filtrar las denuncias por ramo.
                      </b>  
                  </p>
                  <hr/>
                  <p>
                      <b>
                      <b>ACEPTAR: </b> Esta opción eliminará lógicamente el archivo, dejándolo oculto para los estudiantes.
                      <br/>
                      <b>RECHAZAR: </b> Esta opción ignorará y ocultará las denuncias realizadas, dejando el archivo visible para los estudiantes.        
                      </b> 
                  </p>
                  <br/>
                <SelectRamo changeRamo={this.changeRamo}></SelectRamo>
                {/* NAVS 1-NUEVAS 2-ACEPTADAS 3- RECHAZADAS */}
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"                  
                  >
                  <NavItem >
                    <NavLink
                      aria-selected={this.state.tabs === 1}
                      className={classnames("mb-sm-3 mb-md-0 backgroundColor:red", {
                        active: this.state.tabs === "activa",
                                               
                      }
                        )}
                      onClick={e => this.toggleNavs(e, "tabs", "activa")}
                      href="#pablo"
                      role="tab"
                    >
                  
                      <i className="fa fa-eye mr-2"></i>
                     
                      NUEVAS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 2}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === "rechazada"
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", "rechazada")}
                      href="#pablo"
                      role="tab"
                      >
                      <i className="fa fa-ban mr-2"></i>
                   
                      RECHAZADAS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.tabs === 3}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.tabs === "aceptada"
                      })}
                      onClick={e => this.toggleNavs(e, "tabs", "aceptada")}
                      href="#pablo"
                      role="tab"
                    >
                      <i className="fa fa-check  mr-2"></i>
                      ACEPTADAS
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <Card className="shadow">
                <CardBody>
                  <TabContent activeTab={this.state.tabs}>
                    <TabPane tabId="activa">
                        <Tabla 
                            Data={this.state.Data} 
                            Ramoid={this.state.Ramoid}
                            estado={this.state.tabs} 
                            showToast={this.showToast} >

                        </Tabla>
                    </TabPane>
                    <TabPane tabId="rechazada">
                        <Tabla 
                            Data={this.state.Data} 
                            Ramoid={this.state.Ramoid}
                            estado={this.state.tabs} 
                            showToast={this.showToast} >

                        </Tabla> 
                      </TabPane>
                    <TabPane tabId="aceptada">
                        <Tabla 
                            Data={this.state.Data} 
                            Ramoid={this.state.Ramoid}
                            estado={this.state.tabs} 
                            showToast={this.showToast} >

                        </Tabla>
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


  changeRamo(e){
    this.setState({
      Ramoid: [e.value]
    })
  };
  
  showToast(e){
    if(e.status){
      denuncias.GetDenuncias(this.state.tabs).then((data)=>{
        this.setState({
          Data :  data
        })
      })
      toast.success("Acción completada con éxito",{
        className: css({
          borderRadius:'10px',
          top:'10em'
        }),
      });
    }else{
      toast.error("No se pudo realizar la acción solicitada",{
        className: css({
          borderRadius:'10px',
          top:'10em'
        }),
      });
    }
  }
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    //Traer la DATA y CAMBIAR PESTAÑA
    denuncias.GetDenuncias(index).then((data)=>{
      this.setState({
        tabs: index,
        Data :  data
      })
    })
  };

}

export default Navs;

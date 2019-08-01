
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

const categorias=[
  { value: '1', label: 'Libros', material: [

    {value: '1', nombre: 'libro calculo 1', link:'libro1.pdf', formato:'pdf' },
    {value: '2', nombre: 'libro calculo 2', link:'libro2.pdf', formato:'pdf' } 
  
  ]},
  { value: '1', label: 'Guias', material: [

    {value: '1', nombre: 'Guia calculo 1', link:'Guia.pdf', formato:'pdf' },
    {value: '2', nombre: 'Guia calculo 2', link:'Guia.pdf', formato:'pdf' } 
  
  ]},
  { value: '1', label: 'Pruebas', material: [

    {value: '1', nombre: 'Prueba calculo 1', link:'Prueba.pdf', formato:'pdf' },
    {value: '2', nombre: 'Prueba calculo 2', link:'Prueba.pdf', formato:'pdf' } 
  
  ]},
]


class TabsSection extends React.Component {

  state = {
    iconTabs: 0,
    plainTabs: 1,
    nav_item: [],
    nav_cont: []
  };

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

   

  render() {
  
    this.state.nav_item =[]
    this.state.nav_cont =[]
    for (let i = 0; i < categorias.length; i++) {
      this.state.nav_item.push(      
        <NavItem>
          <NavLink
            aria-selected={this.state.iconTabs === i}
            className={classnames("mb-sm-3 mb-md-1", {
              active: this.state.iconTabs === i
            })}
            onClick={e => this.toggleNavs(e, "iconTabs", i)}
            href="#pablo"
            role="tab"
          >
            <i className="ni ni-cloud-upload-96 mr-2" />
            {categorias[i].label}
          </NavLink>
        </NavItem>
        )

        this.state.nav_cont.push(      
          <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
          <TabPane tabId={"iconTabs"+i}>
            <p className="description">
              <div class="row">
                <div class="col-sm-2">
                <strong>{categorias[i].material[1].nombre}</strong>
                </div>
                <div class="col-sm-2">
                <strong>valoracion</strong>
                </div>
                <div class="col-sm-2">
                <strong>denunciar</strong>
                </div>
                <div class="col-sm-2">
                <a href="/#">{categorias[i].material[1].link}</a>
                </div>
              </div>
            </p>
          </TabPane>
        </TabContent>
          )

    }

    return (
      <>
        <Row className="justify-content-center">
          <Col lg="12">
            <div className="nav-wrapper">
              <Nav className="nav-fill flex-column flex-md-row" id="tabs-icons-text" pills role="tablist" >
                 {this.state.nav_item}         
              </Nav>
            </div>
            <Card className="shadow">
            <CardBody >
               {this.state.nav_cont}
            </CardBody>
            </Card>
          </Col>
        </Row>

      </>
    );
  }
}

export default TabsSection;

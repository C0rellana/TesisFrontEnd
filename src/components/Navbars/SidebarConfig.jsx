import React from "react";
import  { withRouter } from 'react-router-dom'
import Sidebar from "react-sidebar";
import { CirclePicker } from 'react-color';
import { auth } from 'services/authenticacion';
import {  Container} from "reactstrap";
import SidebarAdmin from "./SidebarAdmin";
class SidebarConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.changeColor = this.changeColor.bind(this);
        this.changeImg = this.changeImg.bind(this);
    }
    componentDidMount(){

        auth.GetAvatar().then(data=>{
          var imagen ="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg";
          if(data.success){
            imagen = "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, data.data.data));
          }
          this.setState({
            imagen: imagen
          })
          
        })
      
      }

  render() {

    
    var nombre=this.props.nombre;
    var color = this.props.color;
    var isOpen= this.props.isOpen
    var Change= this.props.Change
    var role = this.props.role
 
    return (
      <>
    {/* CONFIG SIDEBAR */}
    <Sidebar
        sidebar={
          <Container>
            <br/> <br/> <br/> <br/> <br/>
            <div align="center">
                <h4><b>@{nombre} </b></h4>
                <div className="container2">
                  <img src={this.state.imagen} alt="" className="image" style={{"width":"150px"}}/>
                  <div className="middle">
                    <label htmlFor="file-input">
                        <i className="fa fa-camera fa-2x"></i>
                    </label>
                    <input id="file-input" type="file" accept="image/*" onChange={this.changeImg}/>
                  </div> 
                </div> 
                 {/* ADMIN SIDEBAR */}
                 {(role==='ADMIN' || role==='DIRECTOR' || role==='CGA') &&
 
                 <SidebarAdmin color={color} isOpen={this.state.sidebarAdminOpen} Change= {this.onSetSidebarAdminOpen}/>
                }
                <hr></hr>  
                <h4><small><b>ELIGE TU COLOR FAVORITO</b></small></h4>
                <br/>   
                <CirclePicker
                  triangle="hide"
                  width="350px" 
                  circleSize= {28}
                  circleSpacing={10}
                  onChange={ this.changeColor }
                />
               <hr></hr>
            </div>

          </Container>  
      }
        open={isOpen}
        onSetOpen={Change}
        styles={{ sidebar: { background: "white", height:"auto", position: "fixed" } }}
        pullRight={true}
      >
       <></>
      </Sidebar>  
      </>
    );
  }

  changeColor(color, event){
    auth.FChangeColor(color.hex).then(()=>{
      window.location.reload();
    })
   
  }
  changeImg(event){
    const formData = new FormData();
    var file=event.target.files[0];
    formData.append('file', file);
    auth.ChangeAvatar(formData)
    this.setState({
      imagen: URL.createObjectURL(file)
    })
  }


}


export default withRouter(SidebarConfig)

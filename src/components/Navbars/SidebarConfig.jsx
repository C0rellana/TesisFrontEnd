import React from "react";
import  { withRouter } from 'react-router-dom'
import Sidebar from "react-sidebar";
import { CirclePicker } from 'react-color';
import { auth } from 'services/authenticacion';
import {  Container,Button} from "reactstrap";
import SidebarAdmin from "./SidebarAdmin";

class SidebarConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
        }
        this.changeColor = this.changeColor.bind(this);
        this.changeImg = this.changeImg.bind(this);
        this.logout = this.logout.bind(this); 
        
    }
    componentDidMount(){

        auth.GetAvatar().then(data=>{
          var imagen ="https://icon-library.net/images/default-user-icon/default-user-icon-4.jpg";
          if(data.success){
            imagen = "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, data.data.data));
          }
          this.setState({
            imagen: imagen,
            loading:false,
          })         
        })
      }

  render() {
    var {nombre,role}=this.props.user;
    var {isOpen,Change} = this.props;


    return (
      <>
    {/* CONFIG SIDEBAR */}
    <Sidebar
        sidebar={
          <Container>
            <br/> <br/> <br/> <br/> <br/>
            <div align="center">
                <h4>
                  <b>{nombre}</b>
                  <small><small>{" ("+role+")"}</small></small>
                  </h4>
                <div className="container2">
                  {
                    this.state.loading
                  ? <div className="loader"></div>
                  :<img src={this.state.imagen} alt="" className="image" />
                  } 
                  <div className="middle">
                    <label htmlFor="file-input">
                        <i className="fa fa-camera fa-2x"></i>
                    </label>
                    <input id="file-input" type="file" accept="image/*" onChange={this.changeImg}/>
                  </div> 
                </div> 
                 {/* ADMIN SIDEBAR */}
                 {(role==='ADMIN' || role==='DIRECTOR' || role==='CGA') &&
 
                 <SidebarAdmin {...this.props} isOpen={this.state.sidebarAdminOpen} Change= {this.onSetSidebarAdminOpen}/>
                }
                <hr></hr>  
                <h4><small><b>PERSONALIZA A TU GUSTO</b></small></h4>
                <br/>   
                <CirclePicker
                  //colors= {["#F44336","#E91E63","#9C27B0","#3F51B5","#4CAF50","#FF9800","#FF5722","#000"]}
                  circleSize= {23}
                  circleSpacing={8}
                  onChange={ this.changeColor }
                />
                <br></br>   
            
               <hr></hr>
                 <Button block color="danger" onClick={this.logout}>
                    CERRAR SESIÓN
                </Button>
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
    this.setState({
      loading: true,
    })
    auth.ChangeAvatar(formData).then(()=>{
      this.setState({
        loading:false,
        imagen: URL.createObjectURL(file)
      })
    })
    
  }

  logout() {
    auth.logout()
    this.props.history.push("/Auth");
  }


}


export default withRouter(SidebarConfig)

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import Hidden from '@material-ui/core/Hidden';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WebIcon from '@material-ui/icons/Web';

import { Link } from 'react-router-dom';

import Ayuda from "./Ayuda";
import { admin} from 'services/admin';
import FolderIcon from '@material-ui/icons/Folder';
import { Divider } from '@material-ui/core';





class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Open:false,
            Ayuda:false,
            imagen:''
        };
        this.sidebar = this.sidebar.bind(this); 
        this.OpenAyuda = this.OpenAyuda.bind(this); 
    }  
    componentDidMount(){

        admin.GetLogo().then(data=>{
            var imagen='';
            if(data.success){
              imagen = "data:image/png;base64,"+ btoa(String.fromCharCode.apply(null, data.data.data));
            }
            this.setState({
              imagen: imagen
            })
            
          })
    } 

    render(){
        var color=this.props.user.color?this.props.user.color:"#8965E0";
        var textColor=this.props.textColor;
        return (
            <>
            <Ayuda isOpen={this.state.Ayuda} OpenAyuda={this.OpenAyuda}/>
            <AppBar position="sticky" style={{zIndex:"900", backgroundColor:color}}>
                
                <Toolbar className="container"  style={{display:"block"}}>
                        
                            <Link to="/" className="link" style={{color:textColor}} >
                                <img src={this.state.imagen} alt="logo" height="50px" style={{paddingTop:"15px"}} hreonclif="/" />
                            </Link>
                           
                     
                        <Hidden mdUp>
                            <IconButton
                        
                                aria-label="open drawer"
                                edge="start"
                                onClick={this.sidebar}
                                style={{float:"left", top:"9px",color:textColor}} 
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <IconButton onClick={() => this.props.ChangeConfig(true)} style={{float:"right", top:"9px",color:textColor}} >
                                <SettingsIcon />
                        </IconButton>   
                        <IconButton  
                                onClick={() => this.OpenAyuda()} style={{float:"right", top:"9px",color:textColor}} >
                                <HelpIcon />
                        </IconButton>
                        <Hidden smDown>                        
                            <Button style={{float:"right", top:"15px",color:textColor}} >
                                <Link to="/notas" className="link" style={{color:textColor}} >CALCULAR NOTAS</Link>
                            </Button>
                            <Button style={{float:"right", top:"15px",color:textColor}} >
                                <Link to="/archivos" className="link" style={{color:textColor}} >MIS ARCHIVOS</Link>
                            </Button>
                            <Button style={{float:"right", top:"15px",color:textColor}} >
                                <Link to="/upload" className="link" style={{color:textColor}} >COMPARTIR</Link>
                            </Button>
                            <Button style={{float:"right", top:"15px",color:textColor}} >
                                <Link to="/buscador" className="link" style={{color:textColor}} >BUSCAR</Link>
                            </Button>
                         
                        </Hidden>

                
            
                </Toolbar>
            </AppBar>
            <Drawer   
                style={{zIndex:"800"}}
                open={this.state.Open}
                onClose={this.sidebar} 
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >   
                    <List style={{top:"65px" }}>
                    
                        <ListItem button >
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <Link to="/" className="link">INICIO</Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemIcon><ShareIcon /></ListItemIcon>
                            <Link to="/upload" className="link">COMPARTIR</Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button >
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <Link to="/buscador" className="link">BUSCAR</Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <Link to="/archivos" className="link">MIS ARCHIVOS</Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button >
                            <ListItemIcon>< SpellcheckIcon/></ListItemIcon>
                            <Link to="/notas" className="link">CALCULAR NOTAS</Link>
                        </ListItem>
                        <Divider/>
                        <ListItem button  component="a" href="http://www.sibib.ucm.cl/">
                            <ListItemIcon>< LibraryBooksIcon/></ListItemIcon>
                            <i>BIBLOTECA UCM</i>
                        </ListItem>
                        <Divider/>
                        <ListItem button  component="a" href="http://portal.ucm.cl/">
                            <ListItemIcon>< WebIcon/></ListItemIcon>
                            <i>PORTAL UCM</i>
                        </ListItem>
                        <Divider/>
                        <ListItem button component="a" href="https://lms.ucm.cl/">
                            <ListItemIcon>< WebIcon/></ListItemIcon>
                            <i>LMS</i>
                        </ListItem>
                        <Divider/>
                
                    </List>
            
            </Drawer>
            </>
        );
    }

    sidebar() {
            this.setState({Open:!this.state.Open});
    }
    OpenAyuda(){
        this.setState({ Ayuda: !this.state.Ayuda });
    }

}

export default NavBar;
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
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Ayuda from "./Ayuda";
import { admin} from 'services/admin';
import FolderIcon from '@material-ui/icons/Folder';





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
            <AppBar position="relative" style={{zIndex:"2000", backgroundColor:color}}>
                
                <Toolbar className="container"  style={{display:"block"}}>
                        <a href="/">
                            <img src={this.state.imagen} alt="logo" height="50px" style={{paddingTop:"15px"}} hreonclif="/" />
                        </a>
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
                            <Button href="/notas" style={{float:"right", top:"15px",color:textColor}} >CALCULAR NOTAS</Button>
                            <Button href="/archivos" style={{float:"right", top:"15px",color:textColor}} >MIS ARCHIVOS</Button>
                            <Button href="/upload"  style={{float:"right", top:"15px",color:textColor}} >COMPARTIR</Button>
                            <Button href="/buscador" style={{float:"right", top:"15px",color:textColor}}  >BUSCAR</Button>
                        
                        </Hidden>

                
            
                </Toolbar>
            </AppBar>
            <Drawer   
                open={this.state.Open}
                onClose={this.sidebar} 
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >   
                    <List style={{top:"65px"}}>

                        <ListItem button key="INICIO" component="a" href="/">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="INICIO" />
                        </ListItem>

                        <ListItem button key="COMPARTIR" component="a" href="/upload">
                            <ListItemIcon><ShareIcon /></ListItemIcon>
                            <ListItemText primary="COMPARTIR"/>
                        </ListItem>

                        <ListItem button key="Buscar" component="a" href="/buscador"  >
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <ListItemText primary="BUSCAR" />
                        </ListItem>

                        <ListItem button key="Archivos" component="a" href="/archivos">
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary="MIS ARCHIVOS" />
                        </ListItem>

                        <ListItem button key="CALCULAR" component="a" href="/notas">
                            <ListItemIcon>< AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary="CALCULAR NOTA" />
                        </ListItem>
                
                
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
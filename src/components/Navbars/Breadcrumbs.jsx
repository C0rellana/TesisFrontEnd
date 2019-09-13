import React from "react";


import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Hidden from '@material-ui/core/Hidden';

class Bread extends React.Component {


  render() {
      var page= this.props.page;
      var color = this.props.user.color;
      var textColor = this.props.textColor;
    return (
      <>
      <Hidden smDown>


            <Paper elevation={0} style={{backgroundColor:color?color:"#8965E0",position:"absolute",left:"1%" }}>
              <Breadcrumbs separator={<NavigateNextIcon style={{color:textColor}} fontSize="small"/>} aria-label="breadcrumb">
                <Link style={{color:textColor}} href="/" >
                    <small><b>{"\u00a0"}{"\u00a0"}HOME</b></small>
                </Link>
              <Typography style={{color:textColor}}>
                  <small><b>{page}{"\u00a0"}{"\u00a0"}</b></small>
              </Typography>
              </Breadcrumbs>
            </Paper>
            <br/><br/><br/>
            </Hidden>
     
      </>
    );
  }
}

export default Bread;

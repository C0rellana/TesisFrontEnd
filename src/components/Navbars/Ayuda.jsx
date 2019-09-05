import React from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import  { withRouter} from 'react-router-dom'

const images = [
  'https://i.imgur.com/E6ne8wK.png',
  'https://i.imgur.com/fp1uVW1.png',

];

class Ayuda extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0, //modificar este valor
    };
  };

  componentDidMount(){
    const {pathname} = this.props.location;
    switch(pathname) {
      case '/buscador':
        return this.setState({photoIndex:0});
      case '/upload':
        return this.setState({photoIndex:1});
      default:
        return "";
    }   
  }

  render() {  
  
    const { photoIndex} = this.state;
      return (
      <>    
      <div>
 
        {this.props.isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            imagePadding={100}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.props.OpenAyuda()}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>  
     

      </>
    );
  }
}

export default withRouter(Ayuda)


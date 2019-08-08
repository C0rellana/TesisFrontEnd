
import React from "react";
import { FaSearch } from "react-icons/fa";

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     mi_busqeuda :props.busqueda
      
    }  
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log(this.state.mi_busqeuda)
  }

  handleInputChange(event) {
    const target = event.target;
 
    const value = target.value
    
    this.setState({
      mi_busqeuda: value
    });
  }

  render() {
    
    console.log(this.state.mi_busqeuda)
    return (
      <>
      <section>
        <div className="input-group input-group-alternative mb-4">
            <input className="form-control form-control-alternative" onChange={this.handleInputChange} placeholder="Ej: Libro de calculo I" type="text"></input>
            <div className="input-group-prepend">
            <button className="btn btn-icon btn-2 btn-white" type="button">
            <FaSearch /> 
          </button>
            </div>
        </div>
        </section>
      </>
    );
  }
}

export default Search;

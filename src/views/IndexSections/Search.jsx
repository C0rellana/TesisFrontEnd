
import React from "react";
import { FaSearch } from "react-icons/fa";

class Search extends React.Component {

  render() {
    return (
      <>
      <section>
        <div className="input-group input-group-alternative mb-4">
            <input className="form-control form-control-alternative" placeholder="ej: Libro de calculo I" type="text"></input>
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

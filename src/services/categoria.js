import { ApiCategorias} from "./api";
import React from "react";
import axios from 'axios';
import { auth } from 'services/authenticacion';


async function getAllCategoriasbyCarrera() {
    const response = await axios.get(ApiCategorias,await auth.ConfigHeader());
   
    response.data.map(value=>{ 
        return value.label = <span><i className="fa fa-circle mr-2" style={{color: value.color}}/>{value.label}</span>
    });

    return response.data
}

export const categoria = {
    getAllCategoriasbyCarrera,
};
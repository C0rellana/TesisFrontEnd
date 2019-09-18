import { 
    ApiCategorias,
    ApiAgregarCategoria,
    ApiEditarCategoria,
    ApiEliminarCategoria,
    ApiMisCategorias,
} from "./api";
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



async function MisCategorias() {
    const response = await axios.get(ApiMisCategorias,await auth.ConfigHeader());
       return response.data
}


async function GetCategorias() {
    const response = await axios.get(ApiCategorias,await auth.ConfigHeader());
       return response.data
}

async function AgregarCategoria(object) {
    const response = await axios.post(ApiAgregarCategoria,object,await auth.ConfigHeader());
       return response.data
}
async function EditarCategoria(object) {
    const response = await axios.post(ApiEditarCategoria,object,await auth.ConfigHeader());
       return response.data
}
async function EliminarCategoria(id) {
    const response = await axios.post(ApiEliminarCategoria,{id:id},await auth.ConfigHeader());
       return response.data
}


export const categoria = {
    MisCategorias,
    getAllCategoriasbyCarrera,
    GetCategorias,
    EditarCategoria,
    AgregarCategoria,
    EliminarCategoria
};
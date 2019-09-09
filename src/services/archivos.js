import { 
    ApiArchivos,
    ApiMisArchivos,
    ApiDownloadArchivo,
    ApiValorarArchivo,
    ApiFilterArchivo,
    ApiEditArchivo,
    ApiDeleteArchivo
} from "./api";

import axios from 'axios';
import { auth } from 'services/authenticacion';

async function Upload(object) {
    const response = await axios.post(ApiArchivos, object,  await auth.ConfigHeader());
 
    return response.data;
}

async function GetAll() {
    const response = await axios.get(ApiArchivos,  await auth.ConfigHeader());
    return response.data;
}
async function GetMisArchivos() {
    const response = await axios.get(ApiMisArchivos, await auth.ConfigHeader());
    return response.data;
}

async function FilterArchivo(carrera,ramo,contenido,busqueda) {
    var object ={
        carreras:carrera, 
        ramos: ramo, 
        contenidos: contenido,
        busqueda:busqueda,
    }
    const response = await axios.post(ApiFilterArchivo,object,  await auth.ConfigHeader());
    return response.data;
}

async function DownloadArchivo(file,id) {
    const response = await axios.post(ApiDownloadArchivo, { nombre: file,id:id },  await auth.ConfigHeader());
    return response.data;
}

async function NuevaValoracion(archivo,value) {
    const response = await axios.post(ApiValorarArchivo, { archivo:archivo, value: value },  await auth.ConfigHeader());
    return response.data;
}
async function EditArchivo(obj) {
    const response = await axios.post(ApiEditArchivo, obj,  await auth.ConfigHeader());
    return response.data;
}
async function DeleteArchivo(obj) {
    const response = await axios.post(ApiDeleteArchivo, obj,  await auth.ConfigHeader());
    return response.data;
}


export const archivo = {
    Upload,
    GetAll,
    NuevaValoracion,
    DownloadArchivo,
    FilterArchivo,
    GetMisArchivos,
    EditArchivo,
    DeleteArchivo,
};


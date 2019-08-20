import { ApiArchivos,ApiDownloadArchivo,ApiValorarArchivo,ApiFilterArchivo} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function Upload(object) {
    const response = await axios.post(ApiArchivos, object, auth.ConfigHeader);
 
    return response.data;
}

async function GetAll() {
    const response = await axios.get(ApiArchivos, auth.ConfigHeader);
    return response.data;
}

async function FilterArchivo(carrera,ramo,contenido) {
    const response = await axios.post(ApiFilterArchivo,{ carreras:carrera, ramos: ramo, contenidos: contenido }, auth.ConfigHeader);
    return response.data;
}

async function DownloadArchivo(file) {
    const response = await axios.post(ApiDownloadArchivo, { nombre: file }, auth.ConfigHeader);
    return response.data;
}

async function NuevaValoracion(archivo,value) {
    const response = await axios.post(ApiValorarArchivo, { archivo:archivo, value: value }, auth.ConfigHeader);
    return response.data;
}

export const archivo = {
    Upload,
    GetAll,
    NuevaValoracion,
    DownloadArchivo,
    FilterArchivo
};


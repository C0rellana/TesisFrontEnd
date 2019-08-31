import { 
    ApiIgnorarDenuncia,
    ApiAceptarDenuncia,
    ApiDenuncia,
    ApiDenunciar,
    ApiGetTipos
} from "./api";

import axios from 'axios';
import { auth } from 'services/authenticacion';



async function Ignorar(id) {
    const response = await axios.post(ApiIgnorarDenuncia,{cod_archivo:id},await auth.ConfigHeader());
    return response.data;
}
async function Aceptar(id) {
    const response = await axios.post(ApiAceptarDenuncia,{cod_archivo:id},await auth.ConfigHeader());
    return response.data;
}

async function GetDenuncias() {
    const response = await axios.get(ApiDenuncia,await auth.ConfigHeader());
    return response.data;
}

async function Denunciar(archivo,tipo,descripcion) {
    const response = await axios.post(ApiDenunciar, { archivo:archivo, tipo: tipo, descripcion:descripcion },  await auth.ConfigHeader());
    return response.data;
}
async function GetTipos() {
    const response = await axios.get(ApiGetTipos, await auth.ConfigHeader());
    return response.data;
}


export const denuncias = {
    Ignorar,
    Aceptar,
    GetDenuncias,
    Denunciar,
    GetTipos
};
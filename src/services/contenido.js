import { ApiContenidos,ApiNewContenido,ApiEditContenido,ApiDeletContenido} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';



async function getContenidos(id) {
    const response = await axios.post(ApiContenidos, {id:id}, await auth.ConfigHeader());
    return response.data;
}

async function NewContenido(object) {
    const response = await axios.post(ApiNewContenido,object, await auth.ConfigHeader());
    return response.data;
}
async function EditContenido(object) {
    const response = await axios.post(ApiEditContenido,object, await auth.ConfigHeader());
    return response.data;
}
async function DeleteContenido(id) {
    const response = await axios.post(ApiDeletContenido,{id:id}, await auth.ConfigHeader());
    return response.data;
}


export const contenido = {
    getContenidos,
    NewContenido,
    EditContenido,
    DeleteContenido,
};
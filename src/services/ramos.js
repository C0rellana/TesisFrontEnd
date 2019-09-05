import { ApiRamos,ApiNuevoRamo,ApiEditRamo,ApiDeleteRamo,ApiRamos2} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function getRamosbyCarrera() {
    const response = await axios.get(ApiRamos,  await auth.ConfigHeader());
   
    response.data.map((value) => {
        return value.label =value.label +' ('+ value.codigo+')';

      });
    return response.data;
}
async function getRamos() {
    const response = await axios.get(ApiRamos2,  await auth.ConfigHeader());
    return response.data;
}

async function NuevoRamo(object) {
    const response = await axios.post(ApiNuevoRamo,object, await auth.ConfigHeader());
    return response.data;
}
async function EditRamo(object) {
    const response = await axios.post(ApiEditRamo,object, await auth.ConfigHeader());
    return response.data;
}
async function DeleteRamo(id) {
    const response = await axios.post(ApiDeleteRamo,{id:id}, await auth.ConfigHeader());
    return response.data;
}


export const ramo = {
    getRamosbyCarrera,
    NuevoRamo,
    EditRamo,
    DeleteRamo,
    getRamos
};
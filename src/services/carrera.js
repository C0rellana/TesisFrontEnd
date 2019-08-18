import { ApiCarreras,ApiCarrerasRamos} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function getAllCarrerasRamos() {
    const response = await axios.get(ApiCarrerasRamos, auth.ConfigHeader);
    return response.data;

}
async function getAllCarreras() {
    const response = await axios.get(ApiCarreras, auth.ConfigHeader);
    return response.data;

}

export const carrera = {
    getAllCarrerasRamos,
    getAllCarreras,
};
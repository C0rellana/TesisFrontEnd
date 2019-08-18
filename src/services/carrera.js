import { ApiCarreras,ApiCarrerasRamos} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

function getAllCarrerasRamos() {
    return axios.get(ApiCarrerasRamos,auth.ConfigHeader)
        .then(response => {
            return response.data;
        });

}
function getAllCarreras() {
    return axios.get(ApiCarreras,auth.ConfigHeader)
        .then(response => {
            return response.data;
        });

}

export const carrera = {
    getAllCarrerasRamos,
    getAllCarreras,
};
import { ApiCarreras,ApiCarrerasRamos} from "./api";
import axios from 'axios';


function getAllCarrerasRamos() {
    return axios.get(ApiCarrerasRamos)
        .then(response => {
            return response.data;
        });

}
function getAllCarreras() {
    return axios.get(ApiCarreras)
        .then(response => {
            return response.data;
        });

}

export const carrera = {
    getAllCarrerasRamos,
    getAllCarreras,
};
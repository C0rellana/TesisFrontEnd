import { ApiRamos} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

function getRamosbyCarrera() {
    return axios.get(ApiRamos,auth.ConfigHeader)
        .then(response => {
            return response.data;
        });
}


export const ramo = {
    getRamosbyCarrera,
};
import { ApiCategorias} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

function getAllCategoriasbyCarrera() {
    return axios.get(ApiCategorias,auth.ConfigHeader)
        .then(response => {
            return response.data;
        });

}

export const categoria = {
    getAllCategoriasbyCarrera,
};
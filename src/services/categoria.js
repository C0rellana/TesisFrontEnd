import { ApiCategorias} from "./api";
import axios from 'axios';

function getAllCategoriasbyCarrera(id) {
    return axios.get(ApiCategorias+'/'+id)
        .then(response => {
            return response.data;
        });

}

export const categoria = {
    getAllCategoriasbyCarrera,
};
import { ApiCategorias} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';


async function getAllCategoriasbyCarrera() {
    const response = await axios.get(ApiCategorias, auth.ConfigHeader);
    return response.data;
}

export const categoria = {
    getAllCategoriasbyCarrera,
};
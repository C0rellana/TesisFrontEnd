import { ApiRamos} from "./api";
import axios from 'axios';


function getRamosbyRamos(id) {
    return axios.get(ApiRamos+'/'+id)
        .then(response => {
            return response.data;
        });

}


export const ramo = {
    getRamosbyRamos,
};
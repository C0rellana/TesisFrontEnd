import { ApiArchivos} from "./api";
import axios from 'axios';


function Upload(objet) {
    return axios.post(ApiArchivos,objet).then(response => {
        console.log("se envio?")
            return response.data;
        });
}


export const archivo = {
    Upload,
};


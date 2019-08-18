import { ApiArchivos,ApiDownloadArchivo} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

function Upload(object) {
    return axios.post(ApiArchivos,object,auth.ConfigHeader)
    .then(response => {
        alert(response)
            return response.data;
        });
}

function GetAll() {
    return axios.get(ApiArchivos,auth.ConfigHeader)
    .then(response => {
            return response.data;
        });
}

function DownloadArchivo(file) {
    return axios.post(ApiDownloadArchivo,{nombre:file},auth.ConfigHeader)
    .then(response => {
            return response.data;
        });
}

export const archivo = {
    Upload,
    GetAll,
    DownloadArchivo
};


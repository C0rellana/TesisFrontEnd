import { ApiCarreras,ApiCarrerasRamos} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function getAllCarrerasRamos() {
    const response = await axios.get(ApiCarrerasRamos, auth.ConfigHeader);
    response.data.map((value) => {
        value.label =value.label +' ('+ value.sigla+')';
          value.Ramos.map((ramo) => {
            return   ramo.label=ramo.label+' ('+ ramo.codigo+')';
          });
        return value.Ramos.label=value.Ramos.label+' ('+ value.Ramos.codigo+')';
      });
    return response.data

}
async function getAllCarreras() {
    const response = await axios.get(ApiCarreras, auth.ConfigHeader);
    return response.data;

}

export const carrera = {
    getAllCarrerasRamos,
    getAllCarreras,
};
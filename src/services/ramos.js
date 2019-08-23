import { ApiRamos} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function getRamosbyCarrera() {
    const response = await axios.get(ApiRamos,  await auth.ConfigHeader());
   
    response.data.map((value) => {
        return value.label =value.label +' ('+ value.codigo+')';

      });
    return response.data;
}


export const ramo = {
    getRamosbyCarrera,
};
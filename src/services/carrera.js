import { ApiCarreras,ApiCarrerasRamos,ApiGetCarrera,ApiCarreraToken,ApiCarreraIsEnabled} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

async function getAllCarrerasRamos() {
    const response = await axios.get(ApiCarrerasRamos, await auth.ConfigHeader());
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
    const response = await axios.get(ApiCarreras);
    return response.data;
}

async function GetCarrera() {
  const response = await axios.get(ApiGetCarrera,  await auth.ConfigHeader());
  return response.data;

}
async function CarreraToken(token) {
  const response = await axios.post(ApiCarreraToken,{token:token}, await auth.ConfigHeader());
  return response.data;

}

async function isEnabled() {
  const response = await axios.get(ApiCarreraIsEnabled,await auth.ConfigHeader());
  return response.data;

}


export const carrera = {
    getAllCarrerasRamos,
    getAllCarreras,
    GetCarrera,
    CarreraToken,
    isEnabled,
};
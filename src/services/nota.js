import {ApiNotas} from "services/api";
import axios from 'axios';
import { auth } from 'services/authenticacion';

export async function Calcular(object) {
    const response = await axios.post(ApiNotas,object, await auth.ConfigHeader());
    return response.data;
}


import { ApiRoles,ApiEditRole} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';


async function getRoleCga() {
    const response = await axios.post(ApiRoles,{role:"CGA"},  await auth.ConfigHeader());
    return response.data;
}

async function getRoleDirector() {
    const response = await axios.post(ApiRoles, {role:"DIRECTOR"}, await auth.ConfigHeader());
    return response.data;
}

async function EditRol(object) {
    const response = await axios.post(ApiEditRole,object,await auth.ConfigHeader());
    return response.data;
}


export const role = {
    getRoleCga,
    getRoleDirector,
    EditRol,
};
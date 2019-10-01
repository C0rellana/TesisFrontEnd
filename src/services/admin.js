import {ApiLogo,ApiGetMensaje,ApiSetmensaje} from "./api";
import axios from 'axios';
import { auth } from 'services/authenticacion';


async function ChangeLogo(object) {
    return auth.ConfigHeader().then(async data=>{
        const response = await axios.post(ApiLogo,object,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}

async function GetLogo() {
    return auth.ConfigHeader().then(async data=>{
        const response = await axios.get(ApiLogo,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}

async function SetMensaje(object) {
    return auth.ConfigHeader().then(async data=>{
        const response = await axios.post(ApiSetmensaje,object,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}

async function GetMensaje() {
    return auth.ConfigHeader().then(async data=>{
        const response = await axios.get(ApiGetMensaje,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}



export const admin = {

    ChangeLogo,
    GetLogo,
    SetMensaje,
    ApiGetMensaje,
    GetMensaje

};
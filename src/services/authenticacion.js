import {ApiLogin, ApiRegister,ApiGetData,ChangeColor,ApiAvatar,changePreferencias,ApiRestablecer,ApiCambiarContraseña} from "./api";
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

//Obtener session y token
var session= localStorage.getItem('session');
if(session==='undefined'){session=null;} 
const Usuario = new BehaviorSubject(JSON.parse(session));


async function ConfigHeader(){
    var session= localStorage.getItem('session');
    if(session==='undefined'){session=null;} 
    const Usuario = new BehaviorSubject(JSON.parse(session));

    return {
        headers: {
           Authorization:Usuario.value?Usuario.value.token:"",
        }
    }

}
    
async function login(correo, password) {

    const response = await axios.post(ApiLogin, {
        correo: correo,
        password: password,
    });
    localStorage.setItem('session', JSON.stringify(response.data.data));
    Usuario.next(response.data.data);
    return response.data;
}

async function register(object) {
    const response = await axios.post(ApiRegister, object);
    return response.data;
}

async function Restablecer(object) {
    const response = await axios.post(ApiRestablecer, object);
    return response.data;
}

async function CambiarContraseña(object) {
    const response = await axios.post(ApiCambiarContraseña, object);
    return response.data;
}

function logout() {
    localStorage.removeItem('session');
    Usuario.next(null);
}


async function GetData() {
    return this.ConfigHeader().then(async data=>{
       const response = await axios.get(ApiGetData, data);
        return response.data;   
    }).catch((error)=>{
         throw error;
    });
}



async function FChangeColor(color) {
    return this.ConfigHeader().then(async data=>{
        const response = await axios.post(ChangeColor,{color:color},data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}
async function ChangeAvatar(object) {
    return this.ConfigHeader().then(async data=>{
        const response = await axios.post(ApiAvatar,object,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}

async function GetAvatar() {
    return this.ConfigHeader().then(async data=>{
        const response = await axios.get(ApiAvatar,data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}


async function FchangePreferencias(preferencias) {
    return this.ConfigHeader().then(async data=>{
        const response = await axios.post(changePreferencias,{preferencias:preferencias},data);
        return response.data;
    }).catch((error)=>{
        return error;
    });
}


export const auth = {
    login,
    logout,
    register,
    currentUser: Usuario.asObservable(),
    get currentUserValue () { return Usuario.value },
    GetData,
    ConfigHeader,
    FChangeColor,
    ChangeAvatar,
    GetAvatar,
    FchangePreferencias,
    Restablecer,
    CambiarContraseña
};
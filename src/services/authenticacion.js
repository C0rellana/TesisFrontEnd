import {ApiLogin, ApiRegister,ApiGetData} from "./api";
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

//Obtener session y token
var session= sessionStorage.getItem('session');
if(session==='undefined'){session=null;} 
const Usuario = new BehaviorSubject(JSON.parse(session));


async function ConfigHeader(){
    var session= sessionStorage.getItem('session');
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
    sessionStorage.setItem('session', JSON.stringify(response.data.data));
    Usuario.next(response.data.data);
    return response.data;
}

async function register(object) {
    const response = await axios.post(ApiRegister, {
        nombre: object.nombre,
        rut: object.rut,
        correo: object.correo,
        password: object.password,
        cod_carrera: 1,
    });
    return response.data;
}

function logout() {
    sessionStorage.removeItem('session');
    Usuario.next(null);
}


async function GetData() {
    return this.ConfigHeader().then(async data=>{
       const response = await axios.get(ApiGetData, data);
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
    ConfigHeader
};
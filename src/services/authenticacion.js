import {ApiLogin, ApiRegister} from "./api";
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

function login(correo, password) {

    return axios.post(ApiLogin,{
        correo:correo,
        password:password,

        })
        .then(response => {
            sessionStorage.setItem('currentUser', JSON.stringify(response.data.data));
            currentUserSubject.next(response.data.data);
            return response.data;
        });

}


function register(object) {

    return axios.post(ApiRegister,{

        nombre: object.nombre,
        rut: object.rut,
        correo: object.correo,
        password: object.password,
        cod_carrera:1,
        })
        .then(response => {
            return response.data;
        });

}

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}


export const auth = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};
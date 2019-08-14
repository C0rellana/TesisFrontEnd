import {ApiLogin} from "./api";
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

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}


export const auth = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};
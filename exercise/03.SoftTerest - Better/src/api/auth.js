import { setUser } from '../util.js';
import * as api from './api.js';


const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

async function login(email, password) {
    let user = await api.post(endpoints.login, { email, password })
    if (user) {
        setUser(user);
    }
}

async function register(email, password) {
    let user = await api.post(endpoints.register, { email, password })
    setUser(user);
}

async function logout() {
    api.post(endpoints.logout)
    localStorage.removeItem('user');
}

export {
    login,
    register,
    logout,
};

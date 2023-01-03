import { loadHomePage } from './pages/home.js';
import { sendLogout } from './api.js'
import { updateNav } from './util.js'

function logout() {
    sendLogout();
    localStorage.removeItem('user');
    updateNav();
    loadHomePage();
}

export {
    logout,
};
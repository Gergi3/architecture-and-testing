import { loadHomePage } from "./pages/home.js";
import { loadRegisterPage } from "./pages/register.js";
import { loadLoginPage } from "./pages/login.js";
import { loadIdeasPage } from "./pages/ideas.js";
import { loadCreatePage } from "./pages/create.js";
import { logout } from "./auth.js";
import { updateNav } from "./util.js";
// load helpers
import './helpers/detailsHelper.js';
import './helpers/ideasHelper.js';
import './helpers/loginHelper.js';
import './helpers/registerHelper.js';
const nav = document.querySelector('nav');

const routes = {
    '/': loadHomePage,
    '/register': loadRegisterPage, 
    '/login': loadLoginPage,
    '/ideas': loadIdeasPage,
    '/create': loadCreatePage,
    '/logout': logout,
};
    
nav.addEventListener('click', (e) => {
    e.preventDefault();
    const anchor = e.target.closest('a');
    
    if (anchor) {
        let url = new URL(anchor);
        let pathname = url.pathname;

        const view = routes[pathname];
        if (typeof view === 'function') {
            view();
        }
    }
});

loadHomePage();
updateNav();
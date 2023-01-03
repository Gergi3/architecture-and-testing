import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { initRouter } from './router.js';
import { logout } from './api/auth.js';


document.getElementById('views').remove();

const routes = {
    '/': showHome,
    '/register': showCreate,
    '/login': showLogin,
    '/register': showRegister,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': onLogout,
};
const router = initRouter(routes);

router.updateNav();
router.goTo('/');

function onLogout() {
    logout();
    router.updateNav();
    router.goTo('/');
}
import { login } from '../api/auth.js';


const section = document.getElementById('loginPage');
const form = section.querySelector('form');
let currentRouter = null;

form.addEventListener('submit', onLogin)

export function showLogin(router) {
    currentRouter = router;
    form.reset();
    router.showSection(section);
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let email = formData.get('email'); 
    let password = formData.get('password');

    try {
        await login(email, password);
        form.reset();
        currentRouter.updateNav();
        currentRouter.goTo('/');
    } catch (err) {
        alert(err.message);
    }
}
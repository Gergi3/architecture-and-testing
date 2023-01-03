import { loadLoginPage } from '../pages/login.js';

const registerSection = document.querySelector('#register');
const registerForm = registerSection.querySelector('form');
const signInRedirectHref = registerForm.querySelector('p.alreadyUser a');

signInRedirectHref.addEventListener('click', onClick);

function onClick(e) {
    e.preventDefault();
    registerForm.reset();
    loadLoginPage();
}
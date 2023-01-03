import { loadRegisterPage } from "../pages/register.js";

const loginSection = document.querySelector('#login');
const loginForm = loginSection.querySelector('form');
const signUpRedirectHref = loginSection.querySelector('p.alreadyUser a');

signUpRedirectHref.addEventListener('click', onClick)

function onClick(e) {
    e.preventDefault();
    loginForm.reset();
    loadRegisterPage();
};

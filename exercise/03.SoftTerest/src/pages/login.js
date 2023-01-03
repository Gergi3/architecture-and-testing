import { login } from '../api.js';
import { showSection, updateNav } from '../util.js';
import { loadHomePage } from './home.js';

const loginSection = document.querySelector('#login');
const loginForm = loginSection.querySelector('form');

loginForm.addEventListener('submit', onSubmit);

function loadLoginPage() {
    showSection(loginSection);
}

async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget
    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    
    if (email === '' || password === '') {
        alert('Please fill all fields');
        return;
    }

    try {
        let user = await login(email, password);
        delete user.password;

        localStorage.setItem('user', JSON.stringify(user));

        form.reset();
        updateNav();
        loadHomePage();
    } catch (err) {
        if (err.message === 'Forbidden') {
            alert('Wrong username or password');
        } else {
            alert(err.message);
        }
    }
}

export {
    loadLoginPage,
};
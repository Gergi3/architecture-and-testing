import { showSection, updateNav } from '../util.js';
import { register } from '../api.js';
import { loadHomePage } from './home.js';

const registerSection = document.querySelector('#register');
const registerForm = registerSection.querySelector('form');

registerForm.addEventListener('submit', onSubmit);

function loadRegisterPage() {
    showSection(registerSection);
}

async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget
    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword')

    let alerts = [];
    if (password !== rePassword) {
        alerts.push('Passwords dont match!')
    }
    if (email.length < 3) {
        alerts.push('Email must be at least 3 characters long!');
    }
    if (password.length < 3) {
        alerts.push('Password must be at least 3 characters long!');
    }
    if (email === '' || password === '' || rePassword === '') {
        alerts.push('Please fill all fields!');
    }

    if (alerts.length > 0) {
        alert(alerts.join('\n'));
        return;
    }

    try {
        let user = await register(email, password);
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
    loadRegisterPage,
};
import { register } from '../api/auth.js';


const section = document.getElementById('registerPage');
const form = section.querySelector('form');
let currentRouter = null;

form.addEventListener('submit', onRegister)

export function showRegister(router) {
    currentRouter = router;
    form.reset();
    router.showSection(section);
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let email = formData.get('email'); 
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword');

    let alerts = [];
    if (email.length < 3) {
        alerts.push('The email should be at least 3 characters long');
    }
    if (password.length < 3) {
        alerts.push('The password should be at least 3 characters long');
    }
    if (password !== rePassword) {
        alerts.push('The repeat password should be equal to the password')
    }

    if (alerts.length > 0) {
        alert(alerts.join('\n'));
        return;
    }

    try {
        await register(email, password);
        form.reset();
        currentRouter.updateNav();
        currentRouter.goTo('/');
    } catch (err) {
        alert(err.message);
    }
}
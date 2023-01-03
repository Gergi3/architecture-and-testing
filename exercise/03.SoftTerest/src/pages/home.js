import { getUser, showSection } from '../util.js';

const homeSection = document.querySelector('#homepage');
const ideasSection = document.querySelector('#ideas');
const loginSection = document.querySelector('#login');
const getStartedBtn = homeSection.querySelector('a.btn.btn-secondary.btn-lg')

getStartedBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let user = getUser();
    if (user) {
        showSection(ideasSection);
    } else {
        showSection(loginSection);
    }
})

function loadHomePage() {
    showSection(homeSection);
}

export {
    loadHomePage,
};
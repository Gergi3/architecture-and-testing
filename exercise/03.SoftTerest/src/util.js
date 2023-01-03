const sections = document.querySelectorAll('section');

function showSection(section) {
    hideAllSections();
    section.style.display = 'block';
}

function hideAllSections() {
    [...sections].forEach(section => section.style.display = 'none');    
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function getAuthToken() {
    let user = getUser();
    if (user) {
        return user.accessToken;
    }
    return null;
}

const nav = document.querySelector('nav');
const userNavElements = [...nav.querySelectorAll('.user')];
const guestNavElements = [...nav.querySelectorAll('.guest')];
function updateNav() {
    let user = getUser();
    let userDisplay = user ? 'block' : 'none';
    let guestDisplay = user ? 'none' : 'block';
    
    userNavElements.forEach(x => x.style.display = userDisplay);
    guestNavElements.forEach(x => x.style.display = guestDisplay);
}

export {
    showSection,
    getAuthToken,
    getUser,
    updateNav,
};
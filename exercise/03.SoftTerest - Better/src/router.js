import { getUser } from './util.js';


export function initRouter(routes) {
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    nav.addEventListener('click', onNavigate);

    const userElements = [...nav.querySelectorAll('.user')]
    const guestElements = [...nav.querySelectorAll('.guest')]

    const router = {
        showSection,
        goTo,
        updateNav,
    };
    return router;

    function onNavigate(event) {
        let target = event.target;
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            event.preventDefault();
            let url = new URL(target.href);
            let path = url.pathname;
            
            goTo(path);
        }
    }
    
    function goTo(path, ...args) {
        let handler = routes[path];
        if (typeof handler === 'function') {
            handler(router, ...args);
        }
    }
    
    function showSection(section) {
        main.replaceChildren(section);
    }
    
    function updateNav() {
        let user = getUser();
        if (user) {
            userElements.forEach(el => el.style.display = 'block');
            guestElements.forEach(el => el.style.display = 'none');
        } else {
            userElements.forEach(el => el.style.display = 'none');
            guestElements.forEach(el => el.style.display = 'block');
        }
    }
}
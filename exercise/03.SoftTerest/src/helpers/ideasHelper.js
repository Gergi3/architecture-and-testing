import { loadDetailsPage } from '../pages/details.js';

const ideasSection = document.querySelector('#ideas');

ideasSection.addEventListener('click', onClick);

function onClick(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();

        let ideaId = e.target.dataset.id;
        loadDetailsPage(ideaId);
    }
}
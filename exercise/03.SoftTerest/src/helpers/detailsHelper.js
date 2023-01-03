import { deleteIdea } from '../api.js';
import { loadIdeasPage } from '../pages/ideas.js';

const detailsSection = document.querySelector('#idea-details');

detailsSection.addEventListener('click', onClick);

function onClick(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const ideaId = e.target.dataset.id;
        deleteIdea(ideaId);
        loadIdeasPage();
    }
}
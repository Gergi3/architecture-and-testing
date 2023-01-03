import { showSection } from '../util.js';
import { getIdea } from '../api.js';
import { createDetailedIdeaElement } from '../factory.js';

const detailsSection = document.querySelector('#idea-details');

function loadDetailsPage(id) {
    showSection(detailsSection);
    loadDetailsOf(id);
}

async function loadDetailsOf(id) {
    try {
        let idea = await getIdea(id);

        let ideaElement = createDetailedIdeaElement(idea);
        detailsSection.replaceChildren(ideaElement);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }    
}

export {
    loadDetailsPage,
};
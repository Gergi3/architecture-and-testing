import { getIdeas } from '../api.js';
import { showSection } from '../util.js';
import { e, createIdeaElement } from '../factory.js';

const ideasSection = document.querySelector('#ideas');
const dashboard = ideasSection.querySelector('#dashboard-holder');
const noIdeasH1 = e('h1', 'No ideas yet! Be the first one :)');

function loadIdeasPage() {
    showSection(ideasSection);
    dashboard.replaceChildren();
    loadIdeas();
}

async function loadIdeas() {
    try {
        let fragment = document.createDocumentFragment();

        let ideas = await getIdeas();
        if (ideas.length === 0) {
            dashboard.replaceChildren(noIdeasH1);
            return;
        }

        ideas.forEach(idea => {
            let ideaEl = createIdeaElement(idea);
            fragment.appendChild(ideaEl);
        });

        dashboard.replaceChildren(fragment);
    } catch (err) {
        console.error(err);
        alert(err.message)
    }
}



export {
    loadIdeasPage,
};
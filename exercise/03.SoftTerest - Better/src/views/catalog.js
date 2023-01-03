import { getAllIdeas } from '../api/data.js';
import { e } from '../factory.js';


const section = document.getElementById('dashboard-holder');
const errorH1 = e('h1', {}, 'No ideas yet! Be the first one :)');
let currentRouter = null;

section.addEventListener('click', onDetailsClick);

export function showCatalog(router) {
    currentRouter = router;
    router.showSection(section);
    showIdeas();
}

async function showIdeas() {
    try {
        let fragment = document.createDocumentFragment();

        let ideas = await getAllIdeas();
        if (ideas.length === 0) {
            fragment.appendChild(errorH1);
        } else {
            ideas.forEach(idea => {
                let ideaElement = createIdeaPreview(idea);
                fragment.appendChild(ideaElement);
            });
        }

        section.replaceChildren(fragment);
    } catch (err) {
        alert(err.message); 
    }
}

function createIdeaPreview(idea) {
    return e('div', { className: 'card overflow-hidden current-card details', style: 'width: 20rem; height: 18rem;' },
        e('div', { className: 'card-body' },
            e('p', { className: 'card-text' }, idea.title)
        ),
        e('img', { className: 'card-image', src: idea.img, alt: 'Card image cap'}),
        e('a', { className: 'btn', href: '/details', 'data-id': idea._id }, 'Details')
    );
}

function onDetailsClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        currentRouter.goTo('/details', event.target.dataset.id);
    }
}
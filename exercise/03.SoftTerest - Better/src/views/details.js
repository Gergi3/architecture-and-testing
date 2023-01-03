import { deleteIdea, getIdea } from '../api/data.js';
import { getUser } from '../util.js';
import { e } from '../factory.js';


const section = document.getElementById('detailsPage');
let currentRouter = null;

section.addEventListener('click', onDeleteClick);

export function showDetails(router, id) {
    currentRouter = router;
    router.showSection(section);
    loadDetailsOf(id);
}

async function loadDetailsOf(id) {
    try {
        let idea = await getIdea(id);
        let ideaElement = createIdeaDetailed(idea);

        section.replaceChildren(ideaElement);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

function createIdeaDetailed(idea) {
    let fragment = document.createDocumentFragment();

    let img = e('img', { className: 'det-img', src: idea.img });
    let desc = e('div', { className: 'desc' }, 
        e('h2', { className: 'display-5' }, idea.title),
        e('p', { className: 'infoType' }, 'Description:'),
        e('p', { className: 'idea-description' }, idea.description)
    );

    fragment.appendChild(img);
    fragment.appendChild(desc);

    let user = getUser();
    if (user && user._id === idea._ownerId) {
        let deleteBtn = e('div', { className: 'text-center' },
            e('a', { className: 'btn detb', href: '/delete', 'data-id': idea._id }, 'Delete')
        );
        fragment.appendChild(deleteBtn);
    }

    return fragment;
}

async function onDeleteClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        try {
            await deleteIdea(event.target.dataset.id);
            currentRouter.goTo('/catalog');
        } catch (err) {
            alert(err.message);
        }
    }
}
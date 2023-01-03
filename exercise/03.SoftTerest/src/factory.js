import { getUser } from "./util.js";

function e(type, text, attributes, ...children) {
    text = text || '';
    if (type === 'textNode') {
        return document.createTextNode(text);
    }
    let element = document.createElement(type);
    type === 'input' || type === 'textarea' ? element.value = text : element.textContent = text; 

    Object.entries(attributes || {}).forEach(([attr, value]) => {
        attr === 'data-id' || attr === 'data-owner-id' ? element.setAttribute(attr, value) : element[attr] = value;
    });

    (children || []).forEach(child => element.appendChild(child));

    return element;
}

function createIdeaElement(idea) {
    return e('div', '', { className: 'card overflow-hidden current-card details', style: 'width: 20rem; height: 18rem;' }, 
        e('div', '', { className: 'card-body' }, 
            e('p', idea.title, { className: 'card-text' })
        ),
        e('img', '', { className: 'card-image', src: idea.img, alt: 'Card image cap' }),
        e('a', 'Details', { className: 'btn', href: "/idea/details", 'data-id': idea._id })
    );
}

function createDetailedIdeaElement(idea) {
    let ideaEl = 
    e('div', '', { className: 'container home some' },
        e('img', '', { className: 'det-img', src: idea.img }),
        e('div', '', { className: 'desc' },
            e('h2', idea.title, { className: 'display-5' }),
            e('p', 'Description:', { className: 'infoType' }),
            e('p', idea.description, { className: 'idea-description' }),
        ),
    )

    let user = getUser();
    if (user && user._id === idea._ownerId) {
        let btn = 
        e('div', '', { className: 'text-center' },
            e('a', 'Delete', { className: 'btn detb', href: 'idea/delete', 'data-id': idea._id })
        )
        ideaEl.appendChild(btn);
    }

    return ideaEl;
}

export {
    e,
    createIdeaElement,
    createDetailedIdeaElement,
};


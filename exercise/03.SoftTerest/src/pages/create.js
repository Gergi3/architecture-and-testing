import { createIdea } from '../api.js';
import { showSection } from '../util.js';
import { loadIdeasPage } from './ideas.js';

const createSection = document.querySelector('#idea-create');
const createForm = createSection.querySelector('form');

createForm.addEventListener('submit', onSubmit);

function loadCreatePage() {
    showSection(createSection);
}

async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);
    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');

    let alerts = [];
    if (title.length < 6) {
        alerts.push('Title must be at least 6 characters long');
    }
    if (description.length < 10) {
        alerts.push('Description must be at least 10 characters long');
    }
    if (img.length < 5) {
        alerts.push('Image link must be at least 5 characters long');
    }
    if (alerts.length > 0) {
        alert(alerts.join('\n'));
        return;
    }

    try {
        let idea = await createIdea(title, description, img);
        console.log(idea);
        form.reset();
        loadIdeasPage();
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}


export {    
    loadCreatePage,
};
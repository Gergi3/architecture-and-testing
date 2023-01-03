import { createIdea } from '../api/data.js';


const section = document.getElementById('createPage');
const form = section.querySelector('form');
let currentRouter = null;

form.addEventListener('submit', onCreate)

export function showCreate(router) {
    currentRouter = router;
    form.reset();
    router.showSection(section);
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let title = formData.get('title'); 
    let description = formData.get('description');
    let img = formData.get('imageURL');

    let alerts = [];
    if (title.length < 6) {
        alerts.push('The title should be at least 6 characters long.');
    }
    if (description.length < 10) {
        alerts.push('The description should be at least 10 characters long.');
    }
    if (img.length < 5) {
        alerts.push('The image should be at least 5 characters long.');
    }

    if (alerts.length > 0) {
        alert(alerts.join('\n'));
        return;
    }

    try {
        await createIdea(title, description, img);
        form.reset();
        currentRouter.goTo('/catalog');
    } catch (err) {
        alert(err.message);
    }
}
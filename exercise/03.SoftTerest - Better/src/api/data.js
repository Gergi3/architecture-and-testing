import * as api from './api.js';


const endpoints = {
    'ideas': '/data/ideas',
    'ideasPreview': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
};

export async function getAllIdeas() {
    return api.get(endpoints.ideasPreview);
}

export async function getIdea(id) {
    return api.get(`${endpoints.ideas}/${id}`);
}

export async function createIdea(title, description, img) {
    return api.post(endpoints.ideas, { title, description, img })
}

export async function deleteIdea(id) {
    return api.delete(`${endpoints.ideas}/${id}`);
}

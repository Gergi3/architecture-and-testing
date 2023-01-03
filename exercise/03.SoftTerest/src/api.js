import * as api from './request.js';

const baseUrl = 'http://localhost:3030';

const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/users/logout`;

const ideasUrl = `${baseUrl}/data/ideas`;
const ideasSortedUrl = `${ideasUrl}?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`

export const login = (email, password) => api.post(loginUrl, { email, password });
export const register = (email, password) => api.post(registerUrl, { email, password });
export const sendLogout = () => api.get(logoutUrl);

export const getIdeas = () => api.get(ideasSortedUrl);
export const getIdea = (id) => api.get(`${ideasUrl}/${id}`);
export const deleteIdea = (id) => api.del(`${ideasUrl}/${id}`);
export const createIdea = (title, description, img) => api.post(ideasUrl, { title, description, img });

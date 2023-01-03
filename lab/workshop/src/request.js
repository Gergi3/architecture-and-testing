import { getAuthToken } from './utils.js';

async function request(method, url, data) {
    let options = {
        method,
        headers: {},
     };
    
    if (method !== 'GET') {
        options = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
    } 

    let token = getAuthToken();
    if (token) {
        options.headers['X-Authorization'] = token;
    }

    try {
        let response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem('user');
            }
            throw new Error(response.statusText);
        }
        
        return await response.json();
    } catch (err) {
        throw err;
    }
}

    
export const get = request.bind(null, 'GET');
export const del = request.bind(null, 'DELETE');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const post = request.bind(null, 'POST');
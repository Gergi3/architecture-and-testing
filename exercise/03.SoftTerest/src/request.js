import { getAuthToken } from './util.js';

async function request(method, url, data) {
    let options = { method };
    let authToken = getAuthToken();

    if (method !== 'GET') {
        options = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
    }

    if (authToken && method !== 'GET') {
        if (!options.headers) {
            options.headers = {}
        }
        options.headers['X-Authorization'] = authToken;
    }

    try {
        let res = await fetch(url, options)

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        if (res.status === 204) {
            return res;
        } else {
            return res.json();
        }
        
    } catch (err) {
        throw err;
    }
}

export const get = request.bind(null, 'GET');
export const del = request.bind(null, 'DELETE');
export const post =  request.bind(null, 'POST');
export const put =  request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');

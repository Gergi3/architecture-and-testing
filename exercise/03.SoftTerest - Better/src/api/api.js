import { getUser } from '../util.js';


const host = 'http://localhost:3030';

async function request(method, endpoint, data) {
    let options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let user = getUser();
    if (user) {
        let token = user.accessToken;
        options.headers['X-Authorization'] = token; 
    }

    try {
        const url = host + endpoint;
        let response = await fetch(url, options);
        
        if (!response.ok) {
            if (response.status === 403) {
                localStorage.removeItem('user');
            }
            let error = await response.json();
            throw new Error(error.message);
        }
        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (err) {
        alert(err.message);
        throw err;
    }
}
//method, url, data
const get = request.bind(null, 'GET');
const del = request.bind(null, 'DELETE');
const post = request.bind(null, 'POST');
const patch = request.bind(null, 'PATCH');
const put = request.bind(null, 'PUT');

export {
    get,
    del as delete,
    post,
    patch,
    put,
};
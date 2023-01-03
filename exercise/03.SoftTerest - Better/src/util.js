export function getUser() {
    let user = localStorage.getItem('user');
    return (user == 'undefined' ? undefined : JSON.parse(user)); 
}

export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
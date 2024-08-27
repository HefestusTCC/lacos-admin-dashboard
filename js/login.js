import SERVER_IP from '../config/SERVER_IP.js';

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const loginRequest = {
        email: email,
        password: password
    }
    console.log(loginRequest);
    fetch(`${SERVER_IP}/admin/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginRequest)
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
})
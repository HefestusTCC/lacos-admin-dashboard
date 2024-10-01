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
        if(res.status == 200){
            return res.json();
        }
    }).then(data => {
        sessionStorage.setItem("jwt", data.accessToken);
        sessionStorage.setItem("expiration", data.expiresIn);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.log(error);
    })
})
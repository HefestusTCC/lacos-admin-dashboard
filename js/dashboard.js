import apiFetch from './api.js'; 


try {
    const response = await apiFetch('/report/users/all');
    const data = await response.json();
    console.log(data)
    document.getElementById('total-users').innerText = data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
}

try {
    const response = await apiFetch('/report/users/new-since?date=2024-09-01T00:00:00');
    const data = await response.json();
    console.log(data)
    document.getElementById('new-users').innerText = data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
}

try {
    const response = await apiFetch('/report/posts/last-24-hours');
    const data = await response.json();
    console.log(data)
    document.getElementById('new-users').innerText = data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
}

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu_btn");
const closeBtn = document.querySelector("#close_btn");
const themeToggler = document.querySelector(".theme-toggler");


//sidebar
menuBtn.addEventListener('click' , () =>{
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click' , () =>{
    sideMenu.style.display = 'none';
})

//light e dark mode

themeToggler.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-theme');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})


//garantir sidebar após atualizar
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('aside').style.display = 'block';
    } else {
        document.querySelector('aside').style.display = 'none';
    }
});


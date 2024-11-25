
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



//garantir sidebar após atualizar
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('aside').style.display = 'block';
    } else {
        document.querySelector('aside').style.display = 'none';
    }
});


import apiFetch from './api.js';
import genericFetch from './genericApi.js'

window.onload = function () {
    loadUsers();
};

async function loadUsers() {
    $('#listaUsuarios').empty();
    let response = await getUsers('/admin/all');
    console.log(response);
    if (response.length > 0) {
        response.forEach(function (user) {
            const card = `
                                <div class="parceria-container">
                                    <div class="parceria-info">
                                        <img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image">
                                        <div class="parceria-details">
                                            <h2>${user.name}</h2>
                                            <small class="text-muted">${user.username}</small>
                                        </div>
                                    </div>
                                    <div class="parceria-buttons">
                                        <button type="button" class="parceria_type dropdown-btn">Opções</button>
                                        <div class="dropdown-content">
                                            
                                            <button style="width: 100%; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Remover Admin</a></button>
                                        </div>
                                    </div>
                                </div>
                            `;
            $('#listaUsuarios').append(card);

            assignButtonEvents();
        });
    }
}

$('#searchForm').on('submit', async function (event) {
    event.preventDefault();
    const name = $('#search-name').val();
    const username = $('#search-username').val();
    const id = $('#search-id').val();
    
    if (!name && !username && !id) {
        loadUsers();
        return;
    }
    let url = `/admin/search?`;
    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (username) url += `username=${encodeURIComponent(username)}&`;
    if (id) url += `id=${encodeURIComponent(id)}&`;
    let responseData = await getUsers(url);
    let response = responseData.data;
    $('#listaUsuarios').empty();
    if (response.length > 0) {
        response.forEach(function (user) {
            const card = `
                                <div class="parceria-container">
                                    <div class="parceria-info">
                                        <img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image">
                                        <div class="parceria-details">
                                            <h2>${user.name}</h2>
                                            <small class="text-muted">${user.username}</small>
                                        </div>
                                    </div>
                                    <div class="parceria-buttons">
                                        <button type="button" class="parceria_type dropdown-btn">Opções</button>
                                        <div class="dropdown-content">
                                            <button style="width: 100%; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Remover Admin</a></button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            `;
            $('#listaUsuarios').append(card);
        });
        assignButtonEvents();
        $(".dropdown-btn").on("click", function () {
            $(this).next(".dropdown-content").toggleClass("show");
        });
    } else {
        $('#listaUsuarios').html('<p>Nenhum usuário encontrado.</p>');
    }
})

$(document).on("click", ".dropdown-btn", function () {
    $(this).next(".dropdown-content").toggleClass("show");
});

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function assignButtonEvents() {

    $('.banUser').on('click', async function () {
        const userId = $(this).data('id');
        let data = await genericFetch(`/admin/users/${userId}/ban`);
        if (data.status == 200) {
            location.reload();
        }
    });

    // Apagar usuário
    $('.deleteUser').on('click', async function () {
        const userId = $(this).data('id');
        let data = await buttonActions(`/admin/users/${userId}/delete`);
        if (data.status == 200) {
            location.reload();
        }
    });

    // Tornar admin
    $('.promoteButton').on('click', async function () {
        const userId = $(this).data('id');
        let data = await buttonActions(`/admin/users/${userId}/promote`);
        console.log(data);
        if (data.status == 200) {
            location.reload();
        }
    });

    // Desbanir usuário
    $('.demoteButton').on('click', async function () {
        const userId = $(this).data('id');
        let data = await buttonActions(`/admin/users/${userId}/demote`);
        console.log(data);
        if (data.status == 200) {
            location.reload();
        }
    });
}

async function getUsers(url) {
    try {
        const response = await apiFetch(`${url}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}

async function buttonActions(url) {
    try {
        const response = await genericFetch(`${url}`, {}, 'POST');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}
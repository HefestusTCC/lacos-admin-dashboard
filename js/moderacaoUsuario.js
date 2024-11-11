import apiFetch from './api.js';
import genericFetch from './genericApi.js'

window.onload = function () {
  loadUsers();
};

async function loadUsers() {
  $("#listaUsuarios").empty();

  const header = `
            <table id="table">
                <thead>
                    <tr style="background-color:#f5823b;">
                        <th style=" border-radius: 10px 0px 0px 10px">ID</th>
                        <th></th>
                        <th style="">Nome</th>
                        <th style="">Usuário</th>
                        <th style="">Email</th>
                        <th style="">Nível</th>
                        <th style="">Status</th>
                        <th style=""> </th>
                        <th style=""> </th>
                        <th style=""> </th>
                        <th style=""> </th>

                    </tr>
                </thead>
    `;

  // Insere o cabeçalho no HTML
  $("#listaUsuarios").append(header);

  let response = await getUsers("/report/users/all");
  if (response.length > 0) {
    response.forEach(function (user) {
      let viewRole = user.roles.map((role) => role.role).join("<br>");
      const row = `
                <tr>
                  <td><small class="text-muted">${user.id}</small></td>
                    <td style="text-align:center;">
                        <img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image">
                    </td>
                    <td><small class="text-muted">${user.name}</small></td>
                    <td><small class="text-muted">${user.username}</small></td>
                    <td><small class="text-muted">${user.email}</small></td>
                    <td><small class="text-muted">${viewRole}</small></td>
                    <td><small class="text-muted">${user.status}</small></td>
                     <td style="text-align: center;"><button type="button" class="promoteButton" data-id="${user.id}"><img src="./img/tornarAdmin.png" class="img-promote"> Tornar Admin</button></td>
<td>
    <button class="banUser" data-id="${user.id}">
    <div class="imgButtons">
      <img src="./img/banirUsuario.png" class="img-ban">
      Banir Usuário
      </div>
    </button>
</td>
<td >
    <button type="button" class="demoteButton" data-id="${user.id}">
      <div class="imgButtons">
      <img src="./img/desbanir.png" class="img-demote"> 
      Desbanir Usuário    
      </div>
    </button>
</td>
<td>
    <button class="deleteUser" data-id="${user.id}">
        <div class="imgButtons">
          <img src="./img/remover.png" class="img-delete"> 
          Apagar Usuário
        </div>
    </button>
</td>

                </tr>
            `;
      $("#table").append(row);
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
  let url = `/admin/users/search?`;
  if (name) url += `name=${encodeURIComponent(name)}&`;
  if (username) url += `username=${encodeURIComponent(username)}&`;
  if (id) url += `id=${encodeURIComponent(id)}&`;
  let response = await getUsers(url);
  $("#listaUsuarios").empty();
  const header = `
            <table id="table">
                <thead>
                    <tr style="background-color:#f5823b;">
                        <th style=" border-radius: 10px 0px 0px 10px">ID</th>
                        <th></th>
                        <th style="">Nome</th>
                        <th style="">Usuário</th>
                        <th style="">Email</th>
                        <th style="">Nível</th>
                        <th style="">Status</th>
                        <th style=""> </th>
                        <th style=""> </th>
                        <th style=""> </th>
                        <th style=""> </th>

                    </tr>
                </thead>
    `;

  $("#listaUsuarios").append(header);
  if (response.length > 0) {
    response.forEach(function (user) {
      let viewRole = user.roles.map((role) => role.role).join("<br>");
      const row = `
                <tr>
                  <td><small class="text-muted">${user.id}</small></td>
                    <td style="text-align:center;">
                        <img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image">
                    </td>
                    <td><small class="text-muted">${user.name}</small></td>
                    <td><small class="text-muted">${user.username}</small></td>
                    <td><small class="text-muted">${user.email}</small></td>
                    <td><small class="text-muted">${viewRole}</small></td>
                    <td><small class="text-muted">${user.status}</small></td>
                     <td style="text-align: center;"><button type="button" class="promoteButton" data-id="${user.id}"><img src="./img/tornarAdmin.png" class="img-promote"> Tornar Admin</button></td>
<td>
    <button class="banUser" data-id="${user.id}">
    <div class="imgButtons">
      <img src="./img/banirUsuario.png" class="img-ban">
      Banir Usuário
      </div>
    </button>
</td>
<td >
    <button type="button" class="demoteButton" data-id="${user.id}">
      <div class="imgButtons">
      <img src="./img/desbanir.png" class="img-demote"> 
      Desbanir Usuário    
      </div>
    </button>
</td>
<td>
    <button class="deleteUser" data-id="${user.id}">
        <div class="imgButtons">
          <img src="./img/remover.png" class="img-delete"> 
          Apagar Usuário
        </div>
    </button>
</td>

                </tr>
            `;
      $("#table").append(row);
      assignButtonEvents();
    });
  } else {
    $('#listaUsuarios').html('<p>Nenhum usuário encontrado.</p>');
  }
})

function assignButtonEvents() {
  $(".banUser").on("click", async function () {
    const userId = $(this).data("id");
    let data = await buttonActions(`/admin/users/${userId}/ban`);
    if (data.status == 200) {
      location.reload();
    }
  });

  // Apagar usuário
  $(".deleteUser").on("click", async function () {
    const userId = $(this).data("id");
    let data = await buttonActions(`/admin/users/${userId}/delete`);
    if (data.status == 200) {
      location.reload();
    }
  });

  // Tornar admin
  $(".promoteButton").on("click", async function () {
    const userId = $(this).data("id");
    let data = await buttonActions(`/admin/users/${userId}/promote`);
    console.log(data);
    if (data.status == 200) {
      location.reload();
    }
  });

  // Desbanir usuário
  $(".demoteButton").on("click", async function () {
    const userId = $(this).data("id");
    let data = await buttonActions(`/admin/users/${userId}/unban`);
    if (data.status == 200) {
      location.reload();
    }
  });
}

async function getUsers(url) {
  try {
    const response = await apiFetch(`${url}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
  }
}

async function buttonActions(url) {
  try {
    const response = await genericFetch(`${url}`, {}, "POST");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
  }

  function toggleDarkMode(isDarkModeEnabled) {
    if (isDarkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}

$(document).on("click", ".dropdown-btn", function () {
  $(this).next(".dropdown-content").toggleClass("show");
});

window.onclick = function (event) {
  if (!event.target.matches(".dropdown-btn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

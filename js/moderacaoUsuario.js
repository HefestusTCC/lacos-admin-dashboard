import apiFetch from './api.js';
import genericFetch from './genericApi.js'

window.onload = function () {
  loadUsers();
};

async function loadUsers() {
  $('#listaUsuarios').empty();

  const header = `
    <table>
        <tr style="background-color:#ff7a28b0;">
            <th style="width: 7%; border-radius:10px 0px 0px 10px; text-align:left;"></th>
            <th style="width: 10%;">Nome</th>
            <th style="width: 13%;">Usuário</th>
            <th style="width: 21%;">Email</th>
            <th style="width: 7%;">Nível</th>
            <th style="width: 8%;">Status</th>
            <th style="width: 40%; border-radius:0px 10px 10px 0px;"></th>
        
        </tr>
    </table>
`;

  // Insere o cabeçalho no HTML
  $("#listaUsuarios").append(header);

  let response = await getUsers('/report/users/all');
  if (response.length > 0) {
    response.forEach(function (user) {
      let viewRole = "";
      user.roles.forEach((role) => {
        viewRole = viewRole + role.role + "<br>";
      });
      const card = `
                   <tr>
                            <td style="width: 5%;"><img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image"></td>
                            <td style="width: 20%;"><small class="text-muted">${user.name}</small></td>
                            <td style="width: 15%;"><small class="text-muted">${user.username}</small></td>
                            <td style="width: 25%;"><small class="text-muted">${user.email}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${viewRole}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${user.status}</small></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="promoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Tornar Admin</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Desbanir Usuário</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="deleteUser" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Apagar Usuário</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="banUser" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Banir Usuário</a></button></td>
                            
                        </tr>    
    
     

                            `;
      $("#listaUsuarios").append(card);

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
  $('#listaUsuarios').empty();

  const header = `
    <table>
        <tr style="background-color:#ff7a28b0;">
            <th style="width: 7%; border-radius:10px 0px 0px 10px; text-align:left;"></th>
            <th style="width: 10%;">Nome</th>
            <th style="width: 13%;">Usuário</th>
            <th style="width: 21%;">Email</th>
            <th style="width: 7%;">Nível</th>
            <th style="width: 8%;">Status</th>
            <th style="width: 40%; border-radius:0px 10px 10px 0px;"></th>
        
        </tr>
    </table>
`;


  $("#listaUsuarios").append(header);


  if (response.length > 0) {
    response.forEach(function (user) {
      console.log(user)
      let viewRole = "";
      user.roles.forEach((role) => {
        viewRole = viewRole + role.role + "<br>";
      });
      const card = `
             <tr>
                            <td style="width: 5%;"><img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image"></td>
                            <td style="width: 20%;"><small class="text-muted">${user.name}</small></td>
                            <td style="width: 15%;"><small class="text-muted">${user.username}</small></td>
                            <td style="width: 25%;"><small class="text-muted">${user.email}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${viewRole}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${user.status}</small></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="promoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Tornar Admin</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="banUser" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Banir Usuário</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Desbanir Usuário</a></button></td>
                            <td><button style="width: 100%; z-index: 99;" type="button" class="deleteUser" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Apagar Usuário</a></button></td>
                            
                            
                        </tr>
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
}
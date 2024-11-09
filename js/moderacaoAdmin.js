import apiFetch from "./api.js";
import genericFetch from "./genericApi.js";

window.onload = function () {
  loadUsers();
};

async function loadUsers() {
  $("#listaUsuarios").empty();

  const header = `
    <table>
        <tr style="background-color:#f5823b;">
            <th style="width: 10%; border-radius:10px 0px 0px 10px;"></th>
            <th style="width: 16%; text-align: center; vertical-align: middle;">Nome</th>
            <th style="width: 15%; text-align: center; vertical-align: middle;">Usuário</th>
            <th style="width: 26%; text-align: center; vertical-align: middle;">Email</th>
            <th style="width: 10%; text-align: center; vertical-align: middle;">Nível</th>
            <th style="width: 13%; text-align: center; vertical-align: middle;">Status</th>
            <th style="width: 10%;"></th>
            <th style="width: 10%; border-radius:0px 10px 10px 0px;"></th>
        </tr>
    </table>
`;

  // Insere o cabeçalho no HTML
  $("#listaUsuarios").append(header);

  let response = await getUsers("/admin/all");
  console.log(response);

  if (response.length > 0) {
    response.forEach(function (user) {
      let viewRole = "";
      user.roles.forEach((role) => {
        viewRole = viewRole + role.role + " ";
      });
      const card = `
                        <tr>
                            <td style="width: 10%; text-align:center; border-radius: 10px 0px 0px 0px;"><img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image" style="display: block; margin: 0 auto;"></td>
                            <td style="width: 16%;"><small class="text-muted">${user.name}</small></td>
                            <td style="width: 15%;"><small class="text-muted">${user.username}</small></td>
                            <td style="width: 26%;"><small class="text-muted">${user.email}</small></td>
                            <td style="width: 11%;"><small class="text-muted">${viewRole}</small></td>
                            <td style="width: 13%;"><small class="text-muted">${user.status}</small></td>
                            <td style="cursor:pointer;"><button style="width: 100%; border-radius: 0px 10px 10px 0px; cursor:pointer; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99; cursor:pointer;"><img class="imgButtons" style="width: 23px;"; cursor:pointer;" src="./img/banirUsuario.png" alt="remover admin">Remover Admin</a></button></td>
                            <td style="border-radius:0px 10px 10px 0px;"><button style="width: 100%; z-index: 99;" type="button"></button></td>
                        </tr>
                            `;
      $("#listaUsuarios").append(card);

      assignButtonEvents();
    });
  }
}

$("#searchForm").on("submit", async function (event) {
  event.preventDefault();
  const name = $("#search-name").val();
  const username = $("#search-username").val();
  const id = $("#search-id").val();

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
  $("#listaUsuarios").empty();
  if (response.length > 0) {
    response.forEach(function (user) {
      const card = `
                        <tr>
                            <td style="width: 10%;"><img src="${user.profilePictureURL}" alt="Imagem do Usuário" class="parceria-image"></td>
                            <td style="width: 20%;"><small class="text-muted">${user.name}</small></td>
                            <td style="width: 15%;"><small class="text-muted">${user.username}</small></td>
                            <td style="width: 25%;"><small class="text-muted">${user.email}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${user.level}</small></td>
                            <td style="width: 10%;"><small class="text-muted">${user.status}</small></td>
                            <td>
                                <button style="width: 100%; z-index: 99;" type="button" class="demoteButton" data-id="${user.id}"><a style="width: 100%; z-index: 99;">Remover Admin</a></button>
                            </td>
                        </tr> 
                            `;
      $("#listaUsuarios").append(card);
    });
    assignButtonEvents();

    $(".dropdown-btn").on("click", function () {
      $(this).next(".dropdown-content").toggleClass("show");
    });
  } else {
    $("#listaUsuarios").html("<p>Nenhum usuário encontrado.</p>");
  }
});

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

function assignButtonEvents() {
  $(".banUser").on("click", async function () {
    const userId = $(this).data("id");
    let data = await genericFetch(`/admin/users/${userId}/ban`);
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

import apiFetch from "./api.js";
import genericFetch from "./genericApi.js";

window.onload = function () {
  loadUsers();
};

var message;

async function loadUsers() {
  $("#listaUsuarios").empty();

  // Cabeçalho da tabela
  const header = `
    <table id="table">
      <thead>
        <tr style="background-color:#f5823b;">
          <th style="border-radius: 10px 0px 0px 10px">ID</th>
          <th></th>
          <th>Nome</th>
          <th>Usuário</th>
          <th>Email</th>
          <th>Nível</th>
          <th>Status</th>
          <th> </th>
          <th> </th>
          <th> </th>
          <th style="border-radius: 0px 10px 10px 0px;"> </th>
        </tr>
      </thead>
    </table>`;
  $("#listaUsuarios").append(header);

  // Carregar dados de usuários
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
          <td style="text-align: center;">
            <button type="button" class="promoteButton" data-id="${user.id}">
              <img src="./img/tornarAdmin.png" class="img-promote"> Tornar Admin
            </button>
          </td>
          <td>
            <button class="banUser" data-id="${user.id}">
              <div class="imgButtons">
                <img src="./img/banirUsuario.png" class="img-ban"> Banir Usuário
              </div>
            </button>
          </td>
          <td>
            <button type="button" class="demoteButton" data-id="${user.id}">
              <div class="imgButtons">
                <img src="./img/desbanir.png" class="img-demote"> Desbanir Usuário
              </div>
            </button>
          </td>
          <td>
            <button class="deleteUser" data-id="${user.id}">
              <div class="imgButtons">
                <img src="./img/remover.png" class="img-delete"> Apagar Usuário
              </div>
            </button>
          </td>
        </tr>`;
      $("#table").append(row);
    });
    assignButtonEvents();
  }
}

// Atribuir eventos aos botões
function assignButtonEvents() {
  $(".banUser")
    .off()
    .on("click", function () {
      const userId = $(this).data("id");
      handleBanUser(userId);
    });

  $(".deleteUser")
    .off()
    .on("click", async function () {
      const userId = $(this).data("id");
      await handleAction(`/admin/users/${userId}`, "DELETE");
      location.reload();
    });

  $(".promoteButton")
    .off()
    .on("click", async function () {
      const userId = $(this).data("id");
      await handleAction(`/admin/users/${userId}/promote`, "POST");
      location.reload();
    });

  $(".demoteButton")
    .off()
    .on("click", async function () {
      const userId = $(this).data("id");
      await handleAction(`/admin/users/${userId}/unban`, "POST");
      location.reload();
    });
}

// Funções auxiliares
async function getUsers(url) {
  try {
    const response = await apiFetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

async function handleAction(url, method) {
  try {
    const response = await genericFetch(url, {}, method);
    return response;
  } catch (error) {
    console.error("Erro ao executar ação:", error);
  }
}
function handleBanUser(userId) {
  // Criar o HTML do card
  const cardHTML = `
    <div id="banCard" class="card-overlay">
      <div class="card-content">
        <button id="closeCard" class="close-card">&times;</button>
        <h2>Escolha o Tipo de Feedback</h2>
        <p>Selecione como deseja fornecer o feedback para o banimento do usuário com ID <b>${userId}</b>:</p>
        <div class="card-buttons">
          <button id="standardFeedback" class="btn-feedback">Feedback Padrão</button>
          <button id="customFeedback" class="btn-feedback">Feedback Personalizado</button>
        </div>
        <div id="feedbackMessage" class="feedback-message"></div>
        <button id="sendFeedback" class="btn-send-feedback" style="display: none;">Enviar Feedback</button>
      </div>
    </div>
  `;

  // Adicionar o card no body
  $("body").append(cardHTML);

  // Fechar o card ao clicar no "X"
  $("#closeCard").on("click", function () {
    $("#banCard").remove();
  });

  // Fechar o card ao clicar fora dele
  $(".card-overlay").on("click", function (event) {
    if (event.target.id === "banCard") {
      $("#banCard").remove();
    }
  });

  // Exibir feedback padrão
  $("#standardFeedback").on("click", function () {
    $("#feedbackMessage").html(`<p>Aviso de Banimento: Seu acesso à plataforma foi temporariamente suspenso devido ao descumprimento das nossas diretrizes de conduta. Agradecemos a compreensão e pedimos que leia nossas políticas para evitar problemas futuros. Caso tenha dúvidas ou queira mais informações, entre em contato com nossa equipe de suporte através do email hefestustcc@gmail.com.</p>`);
    $("#sendFeedback").show(); // Mostrar botão de enviar feedback
  });

  // Exibir dropdown para feedback personalizado
  $("#customFeedback").on("click", function () {
    $("#feedbackMessage").html(`
      <p>Selecione o motivo do banimento:</p>
      <select id="banReason" class="feedback-dropdown">
        <option value="" disabled selected>Escolha um motivo...</option>
        <option value="assédio">Assédio</option>
        <option value="discriminação">Discriminação</option>
        <option value="spam">Spam</option>
        <option value="outros">Outros</option>
      </select>
      <p id="customMessage" class="custom-message"></p>
    `);
    $("#sendFeedback").show(); // Mostrar botão de enviar feedback

    // Atualizar mensagem de feedback com base na seleção
    $("#banReason").on("change", function () {
      const reason = $(this).val();
      switch (reason) {
        case "assédio":
          message =
            "Seu acesso à plataforma foi suspenso devido a comportamentos inaceitáveis, incluindo assédio a outros usuários. Respeitamos a todos em nossa comunidade e qualquer forma de assédio, seja verbal ou de outra natureza, é contra nossas diretrizes.";
          break;
        case "discriminação":
          message =
            "Seu acesso à plataforma foi suspenso devido a atitudes discriminatórias. Qualquer forma de discriminação, seja por raça, gênero, orientação sexual, religião ou qualquer outra característica pessoal, vai contra as nossas diretrizes.";
          break;
        case "spam":
          message =
            "Seu acesso à plataforma foi suspenso devido à prática de envio de conteúdo repetitivo ou indesejado (spam). Essa prática prejudica a experiência dos outros usuários e vai contra as nossas diretrizes.";
          break;
        case "outros":
          message = "O usuário foi banido por motivos não especificados.";
          break;
      }

      $("#customMessage").text(message);
    });
  });

  // Enviar feedback e banir o usuário
  $("#sendFeedback").on("click", async function () {
    // Obter o feedback baseado no tipo escolhido
    const feedbackMessage = "Seu acesso à plataforma foi temporariamente suspenso devido ao descumprimento das nossas diretrizes de conduta. Caso tenha dúvidas ou queira mais informações, entre em contato com nossa equipe de suporte através do email hefestustcc@gmail.com."
    const banReason = message || feedbackMessage;
    console.log(banReason);
    // Banir o usuário (usar a API ou método adequado)
    await banUser(userId, banReason);

    // Fechar o card após o envio
    $("#banCard").remove();
  });
}

// Função para enviar o feedback (exemplo de envio, você pode adaptá-la)
async function sendFeedback(userId, feedbackMessage) {
  try {
    const response = await genericFetch(`/admin/feedback/${userId}`, {
      method: "POST",
      body: JSON.stringify({ message: feedbackMessage }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Feedback enviado:", response);
  } catch (error) {
    console.error("Erro ao enviar feedback:", error);
  }
}

// Função para banir o usuário
async function banUser(userId, reason) {
  let reasonData = {
    "reason": reason
  }
  try {
    const response = await genericFetch(`/admin/users/${userId}/ban`, {}, "POST", JSON.stringify(reasonData));
    // console.log("Usuário banido:", response.data);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

import apiFetch from './api.js';
import genericFetch from './genericApi.js';

window.onload = function () {
  loadDenuncias();
};

var denuncias;

async function loadDenuncias() {
  const denunciaContainer = document.querySelector('.div-denuncias');
  denunciaContainer.innerHTML = ''; // Limpa o container antes de preencher

  try {
    const response = await apiFetch('/tickets/pendent'); // Fazendo a requisição para obter as denúncias
    const data = await response.json();
    denuncias = data.data;
    console.log(denuncias)

    if (denuncias.length > 0) {
      denuncias.forEach((denuncia) => {
        if (denuncia.post != null) {
          const denunciaElement = `
          <div class="denuncia" data-id="${denuncia.id}">
            <div class="fotoUsuario">
              <img src="${denuncia.author.profilePictureURL}" alt="Foto do Usuário">
            </div>
            <div class="conteudoDenuncia">
               <div class="nomeUserDenuncia">
                <p>${denuncia.author.name}</p>
          </div>
                <div class="message">
                  <p>${denuncia.message}</p>
                </div>
              </div>
              <div class="responderBtn">
                Responder
              </div>
            </div>
              <div class="denunciaContent">
                <div class="fotoUsuario">
                  <img src="${denuncia.post.author.profilePictureURL}"></img>
                </div>
                <p>${denuncia.post.author.name}</p> <p>@${denuncia.post.author.username}</p>
                ${denuncia.post.image != null ? `<img src=\"${denuncia.post.image}\"></img>` : ""}
                <img src=""></img>
                <p>${denuncia.post.content}</p>
            </div>
          </div>
        `;
          denunciaContainer.innerHTML += denunciaElement;
        }
        if (denuncia.comment != null) {
          const denunciaElement = `
          <div class="denuncia" data-id="${denuncia.id}">
            <div class="fotoUsuario">
              <img src="${denuncia.author.profilePictureURL}" alt="Foto do Usuário">
            </div>
            <div class="conteudoDenuncia">
               <div class="nomeUserDenuncia">
                <p>${denuncia.author.name}</p>
          </div>
                <div class="message">
                  <p>${denuncia.message}</p>
                </div>
              </div>
              <div class="responderBtn">
                Responder
              </div>
            </div>
            <div class="denunciaContent">
                <div class="fotoUsuario">
                  <img src="${denuncia.comment.author.profilePictureURL}"></img>
                </div>
                <p>${denuncia.comment.author.name}</p> <p>@${denuncia.comment.author.username}</p>
                ${denuncia.comment.image != null ? `<img src=\"${denuncia.comment.image}\"></img>` : ""}
                <p>${denuncia.comment.content}</p>
            </div>
          </div>
        `;
          denunciaContainer.innerHTML += denunciaElement;
        }
      }
      );
      assignButtonEvents();
    } else {
      denunciaContainer.innerHTML = '<p>Nenhuma denúncia encontrada.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar denúncias:', error);
  }
}

function assignButtonEvents() {
  document.querySelectorAll('.responderBtn').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const denunciaId = event.target.closest('.denuncia').getAttribute('data-id');
      const salvarDenuncia = denuncias.find(item => item.id == denunciaId);
      sessionStorage.setItem('denunciaId', denunciaId);
      sessionStorage.setItem('denuncia', JSON.stringify(salvarDenuncia))
      window.location.href = "responderDenuncia.html";
    });
  });
}




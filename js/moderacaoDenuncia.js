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
          <div class = containerDenuncias>
          <div class="denuncia" data-id="${denuncia.id}">
          <div class="idDenuncia">
          <p class="idDenuncias">#${denuncia.id}</p>
          </div>
          
            <div class="fotoUsuario">
              <img src="${
                denuncia.author.profilePictureURL
              }" alt="Foto do Usuário">
            </div>
            <div class="conteudoDenuncia">
               <div class="nomeUserDenuncia">
                <div>${denuncia.author.name}</div>
          </div>
                <div class="message">
                  <div>${denuncia.message}</div>
                  
                </div>
              </div>
              <div class="responderBtn">
                Responder
              </div>
            </div>
              <div class="denunciaContent">
               
                 <div class="postDenunciado">
                 <div class = "userDenunciado">
                  <div class="fotoUsuario">
                  <img src="${denuncia.post.author.profilePictureURL}"></img>
                </div>
                  <div class="conteudoDenuncia">
                
                <div class="nomeAutorPost">${denuncia.post.author.name}</div> 

                <div class"userAutorPost">@${
                  denuncia.post.author.username
                }</div>
                </div>
                </div>
                <p class="descDenuncia">${denuncia.post.content}</p>
                ${
                  denuncia.post.image != null
                    ? `<img class="imgDenunciada" src=\"${denuncia.post.image}\"></img>`
                    : ""
                }
                <img src=""></img>
                
                </div>
            </div>
          </div>
          </div>
       


        `;
           denunciaContainer.innerHTML += denunciaElement;
         }
         if (denuncia.comment != null) {
           const denunciaElement = `
          <div class="denuncia" data-id="${denuncia.id}">
            <div class="fotoUsuario">
              <img src="${
                denuncia.author.profilePictureURL
              }" alt="Foto do Usuário">
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
                 <div class="postDenunciado">
                 <div class = "userDenunciado">
                  <div class="fotoUsuario">
                  <img src="${denuncia.comment.author.profilePictureURL}"></img>
                </div>
                  <div class="conteudoDenuncia">
                <div class="nomeAutorPost">${
                  denuncia.comment.author.name
                }</div> 

                <div class"userAutorPost">@${
                  denuncia.comment.author.username
                }</div>
                </div>
                </div>
                <p class="descDenuncia">${denuncia.comment.content}>
                ${
                  denuncia.comment.image != null
                    ? `<img class="imgDenunciada" src=\"${denuncia.comment.image}\"></img>`
                    : ""
                }
                
                <img src=""></img>
                
                </div>
                </p>
            </div>
          </div>
          </div>
          `;
           denunciaContainer.innerHTML += denunciaElement;
         }
       });
       assignButtonEvents();
     } else {
       denunciaContainer.innerHTML = "<p>Nenhuma denúncia encontrada.</p>";
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




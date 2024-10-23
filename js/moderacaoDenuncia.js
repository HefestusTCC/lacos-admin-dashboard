import apiFetch from './api.js';
import genericFetch from './genericApi.js';

window.onload = function () {
  loadDenuncias();
};

async function loadDenuncias() {
  const denunciaContainer = document.querySelector('.div-denuncias');
  denunciaContainer.innerHTML = ''; // Limpa o container antes de preencher

  try {
    const response = await apiFetch('/tickets/pendent'); // Fazendo a requisição para obter as denúncias
    const data = await response.json();
    const denuncias = data.data;
    console.log(denuncias)

    if (denuncias.length > 0) {
      denuncias.forEach((denuncia) => {
        const denunciaElement = `
          <div class="denuncia" data-id="${data.id}">
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
           
            </div>
          </div>
        `;
        denunciaContainer.innerHTML += denunciaElement;
      });

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
      const resposta = prompt('Digite sua resposta para a denúncia:');
      if (resposta) {
        await enviarResposta(denunciaId, resposta);
      }
    });
  });
}

async function enviarResposta(denunciaId, resposta) {
  try {
    const response = await genericFetch(`/api/denuncias/${denunciaId}/responder, { resposta }, 'POST'`);
    const result = await response.json();

    if (result.success) {
      alert('Resposta enviada com sucesso!');
      loadDenuncias(); // Recarrega as denúncias após a resposta
    } else {
      alert('Falha ao enviar resposta.');
    }
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
  }
}


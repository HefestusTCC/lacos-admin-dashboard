import genericFetch from './genericApi.js';

window.onload = function () {
    loadDenuncias();
};

async function loadDenuncias() {
    try {
        // Fazendo a requisição GET para buscar as denúncias pendentes
        const response = await genericFetch("/tickets/pendent", 'GET');
        const data = await response.json();
        const denuncias = data.data.data;
            console.log(denuncias);
        if (data && data.data.length > 0) {
            const listaDenuncias = document.getElementById('listaDenuncias');
           


            data.data.forEach(denuncias => {
                // Criando o HTML para cada denúncia
                const denunciaCard = `
                <div class="denuncia" data-id="${denuncias.id}">
                  <div class="fotoUsuario">
                    <img src="${denuncias.author.profilePictureURL}" alt="Foto do Usuário">
                  </div>
                  <div class="conteudoDenuncia">
                    <div class="numeroDenuncia">
                      <p>#${denuncias.id}</p>
                    </div>
                    <div class="nomeUserDenuncia">
                      <p>${denuncias.author.name}</p>
                    </div>
                    <button class="responderBtn" onclick="abrirPaginaDenuncia(${denuncia.id})">Responder</button>
                  </div>
                </div>
              `;
                // Inserindo o card de denúncia no HTML
                listaDenuncias.innerHTML += denunciaCard;
            });
        } else {
            console.log('Nenhuma denúncia pendente encontrada.');
        }
    } catch (error) {
        console.error('Erro ao carregar as denúncias:', error);
    }
}

// Função para redirecionar o admin para a página de resposta da denúncia
function abrirPaginaDenuncia(id) {
    window.location.href = `responderDenuncia.html?denunciaId=${id}`;
}

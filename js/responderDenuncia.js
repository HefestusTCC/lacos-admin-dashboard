import apiFetch from './api.js';
import genericFetch from './genericApi.js';

const denunciaId = sessionStorage.getItem('denunciaId');
const denuncia = JSON.parse(sessionStorage.getItem('denuncia'));
const denunciaContainer = document.querySelector('.div-denuncias');

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

// Quando você ajustar o estilo da denuncias, só colar os dois ifs no lugar dos IFs acima

async function responder(){
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;
    if (!assunto || !mensagem){
        alert("preencha todos os campos");
        return;
    }
    const formData = {
        subject: assunto,
        message: mensagem,
        status: "resolvido"
    }
    try{
        const response = await genericFetch(`/tickets/${denunciaId}/answer`, {}, 'POST', JSON.stringify(formData));
        let data = await response.json();
        alert('Denuncia respondida com sucesso!');
        sessionStorage.setItem("denunciaId", null);
        sessionStorage.setItem("denuncia", null);
        window.location.href = "denuncias.html";
    } catch (error){
        console.log(error);
    }

}

document.querySelector('.btnEnviar').addEventListener('click', async function(){
    responder();
});
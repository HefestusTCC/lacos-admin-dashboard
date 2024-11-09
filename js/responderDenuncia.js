import apiFetch from "./api.js";
import genericFetch from "./genericApi.js";

const denunciaId = sessionStorage.getItem("denunciaId");
const denuncia = JSON.parse(sessionStorage.getItem("denuncia"));
const denunciaContainer = document.querySelector(".div-denuncias");

if (denuncia.post != null) {
  const denunciaElement = `
  
    <button class="btnVoltar">
                <a href="denuncias.html">Voltar</a>
            </button>
            
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
          <div id="formularioResposta">
                <h2>Responder Denúncia</h2>
                <form id="respostaEmailForm">
                    
                    <label for="assunto">Assunto:</label>
                    <br>
                    <input type="text" id="assunto" name="assunto" required><br><br>

                    <label for="mensagem">Mensagem:</label><br>
                    <textarea id="mensagem" name="mensagem" rows="4" required></textarea><br><br>

                    <button type="button" class="btnEnviar">Enviar</button>
                </form>
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
                <p class="descDenuncia">${denuncia.comment.content}</p>
                ${
                  denuncia.comment.image != null
                    ? `<img class="imgDenunciada" src=\"${denuncia.comment.image}\"></img>`
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

// Quando você ajustar o estilo da denuncias, só colar os dois ifs no lugar dos IFs acima

async function responder() {
  const assunto = document.getElementById("assunto").value;
  const mensagem = document.getElementById("mensagem").value;
  if (!assunto || !mensagem) {
    alert("preencha todos os campos");
    return;
  }
  const formData = {
    subject: assunto,
    message: mensagem,
    status: "resolvido",
  };
  try {
    const response = await genericFetch(
      `/tickets/${denunciaId}/answer`,
      {},
      "POST",
      JSON.stringify(formData)
    );
    let data = await response.json();
    alert("Denuncia respondida com sucesso!");
    sessionStorage.setItem("denunciaId", null);
    sessionStorage.setItem("denuncia", null);
    window.location.href = "denuncias.html";
  } catch (error) {
    console.log(error);
  }
}

document
  .querySelector(".btnEnviar")
  .addEventListener("click", async function () {
    responder();
  });

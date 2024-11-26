import apiFetch from "./api.js";
import genericFetch from "./genericApi.js";

const denunciaId = sessionStorage.getItem("denunciaId");
const denuncia = JSON.parse(sessionStorage.getItem("denuncia"));
const postId = denuncia.post.id;
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
              <img src="${denuncia.author.profilePictureURL
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

                <div class"userAutorPost">@${denuncia.post.author.username
    }</div>
                </div>



                </div>
                <p class="descDenuncia">${denuncia.post.content}</p>
                ${denuncia.post.image != null
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

                    <div style="display: flex; flex-direction: row;">
                      <button type="button" class="btnEnviar">Enviar</button>
                      <button type="button" class="btnEnviarEExcluir" style="background-color: red;">Enviar E Excluir Post </button>
                    </div>
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
              <img src="${denuncia.author.profilePictureURL
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
                <div class="nomeAutorPost">${denuncia.comment.author.name
    }</div> 

                <div class"userAutorPost">@${denuncia.comment.author.username
    }</div>
                </div>
                </div>
                <p class="descDenuncia">${denuncia.comment.content}</p>
                ${denuncia.comment.image != null
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

async function responderAndExcluir() {
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
    try{
      const response = await genericFetch(`/post/${postId}`, {}, "DELETE");
      console.log(await response.json());
    } catch(error){
      console.log(error);
    }
    alert("Denuncia respondida com sucesso!");
    sessionStorage.setItem("denunciaId", null);
    sessionStorage.setItem("denuncia", null);
    sessionStorage.setItem("postId", null);
    // window.location.href = "denuncias.html";
  } catch (error) {
    console.log(error);
  }
}

document
  .querySelector(".btnEnviar")
  .addEventListener("click", async function () {
    responder();
  });

document
  .querySelector(".btnEnviarEExcluir")
  .addEventListener("click", async function () {
    responderAndExcluir();
  });

document.querySelectorAll(".apagarDenuncia").forEach((container) => {
  const removeIcon = container.querySelector(".removeIcon");

  removeIcon.addEventListener("click", (event) => {

    event.stopPropagation();


    const confirmationCard = document.createElement("div");
    confirmationCard.classList.add("confirmationCard");
    confirmationCard.innerHTML = `
      <p class= "pNome">Tem certeza que deseja apagar o post?</p>
      <button class="yesBtn">Sim</button>
      <button class="noBtn">Não</button>
    `;
    document.body.appendChild(confirmationCard);


    confirmationCard.style.display = "block";


    confirmationCard.querySelector(".yesBtn").addEventListener("click", async () => {
      alert("Post apagado com sucesso.");
      const postId = container.closest(".denuncia").dataset.id;

      try {
        await deletePost(postId);
        confirmationCard.remove();
        container.closest(".denuncia").remove();

      } catch (error) {
        console.error("Erro ao apagar post:", error);
        alert("Não foi possível apagar o post. Tente novamente.");
      }
    });

    confirmationCard.querySelector(".noBtn").addEventListener("click", () => {
      confirmationCard.remove();


    });


    confirmationCard.querySelector(".noBtn").addEventListener("click", () => {
      confirmationCard.remove();
    });
  });
});

async function deletePost(postId) {
  try {
    const response = await genericFetch(`/post/${postId}`, {}, "DELETE");

    if (response.ok) {
      console.log("Post deletado com sucesso");
    } else {
      throw new Error("Erro ao deletar o post no servidor.");
    }
  } catch (error) {
    console.error("Erro ao deletar o post:", error);
    throw error;
  }
}
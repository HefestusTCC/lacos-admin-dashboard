import apiFetch from './api.js';

async function getCountOfLastComments() {
  try {
    const response = await apiFetch('/report/comments/last-24-hours');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar total de comentários:', error);
  }
}

async function getCountOfLastLikes() {
  try {
    const response = await apiFetch('/report/likes/last-24-hours');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar total de curtidas:', error);
  }
}

let curtidas = await getCountOfLastComments();
console.log(curtidas);

let comentarios = await getCountOfLastLikes();
console.log(comentarios);

document.getElementById('total_curtidas').innerHTML = await curtidas;
document.getElementById('total_comentario').innerHTML = await comentarios;
document.getElementById('total_interacao').innerHTML = parseInt(await curtidas) + parseInt(await comentarios);

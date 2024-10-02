import apiFetch from './api.js'; 
const getRecentPosts = async () => {
    try {
        const response = await apiFetch('/report/posts/last-24-hours');
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
}
let postagensRecentes = await getRecentPosts();
document.getElementById('recent-posts').innerText = postagensRecentes;
console.log(postagensRecentes);









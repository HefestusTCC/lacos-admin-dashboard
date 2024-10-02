import apiFetch from './api.js'; 
let now = new Date();
const dataAtual = new Date(now.getFullYear(), now.getMonth(), now.getDate());
document.addEventListener('DOMContentLoaded', async function () {
  async function updateDashboard() {
    document.getElementById('total-users').innerText = await getUserCount();
    document.getElementById('new-users').innerText = await getNewUsersSince(dataAtual.toISOString().split('.')[0]);
  }
  updateDashboard();
});

async function getUserCount() {
  try {
    const response = await apiFetch('/report/users/count');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
}

async function getNewUsersSince(date) {
  try {
    const response = await apiFetch(`/report/users/new-since?date=${date}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
}
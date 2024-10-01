import apiFetch from './api.js'; 
try {
  const response = await apiFetch('/report/users/all');
  const data = await response.json();
  console.log(data)
  document.getElementById('total-users').innerText = data.data;
} catch (error) {
  console.error('Erro ao buscar dados do usuário:', error);
}

try {
  const response = await apiFetch('/report/posts/last-24-hours');
  const data = await response.json();
  console.log(data)
  document.getElementById('new-users').innerText = data.data;
} catch (error) {
  console.error('Erro ao buscar dados do usuário:', error);
}

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
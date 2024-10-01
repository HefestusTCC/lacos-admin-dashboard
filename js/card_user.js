import apiFetch from './api.js'; 
try {
    const response = await apiFetch('/report/users/new-since?date=2024-09-01T00:00:00');
    const data = await response.json();
    console.log(data)
    document.getElementById('total-users').innerText = data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
}


document.addEventListener('DOMContentLoaded', function() {
    const data = {
        totalUsers: 56,
        totalUsersPercentage: 100,
        newUsers: 5,
        totalOnline: 10
    };

    // Função para atualizar os valores na página
    function updateDashboard(data) {
        document.getElementById('total-users').innerText = data.totalUsers;
        
        document.getElementById('new-users').innerText = data.newUsers;
        document.getElementById('new-users-percentage').innerText = ((data.newUsers / data.totalUsers) * 100).toFixed(1) + '%';
        
        document.getElementById('online_users').innerText = data.totalOnline;
    }

    updateDashboard(data);
});

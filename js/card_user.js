document.addEventListener('DOMContentLoaded', function() {
    const data = {
        totalUsers: 51,
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

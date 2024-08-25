const data = {
    totalUsers: 51,
    totalUsersPercentage: 100,
    newUsers: 5,
    recentPosts: 87,
    newUsersPercentage: (5 / 51) * 100,
    recentPostsPercentage: 10  
};

// Função para atualizar os valores na página
function updateDashboard(data) {
    document.getElementById('total-users').innerText = data.totalUsers;
    
    document.getElementById('new-users').innerText = data.newUsers;
    document.getElementById('new-users-percentage').innerText = data.newUsersPercentage.toFixed(1) + '%';
    
    document.getElementById('recent-posts').innerText = data.recentPosts;
    document.getElementById('recent-posts-percentage').innerText = data.recentPostsPercentage + '%';

    document.getElementById('total-users-percentage').innerText = data.totalUsersPercentage + '%';
}

updateDashboard(data);








import apiFetch from './api.js'; 
try {
  const response = await apiFetch('/report/likes/last-24-hours');
  const data = await response.json();
  console.log(data)
  document.getElementById('total_curtidas').innerText = data.data;
} catch (error) {
  console.error('Erro ao buscar total de curtidas:', error);
}

try {
  const response = await apiFetch('/report/comments/last-24-hours');
  const data = await response.json();
  console.log(data)
  document.getElementById('total_comentario').innerText = data.data;
} catch (error) {
  console.error('Erro ao buscar total de comentários:', error);
}
const data = {
    totalInteracao: 300,
    totalPercentage: 100,
    totalCurtidas: 45,
    curtidasPercentage: 50,
    totalComentario : 5,
    comentarioPercentage: 10

};

// Função para atualizar os valores na página
function updateDashboard(data) {
    document.getElementById('total_interacao').innerText = (('total_comentario').innerText)+(('total_curtidas').innerText);
    
    document.getElementById('total_percentage').innerText = data.totalPercentage;
    document.getElementById('total_percentage').innerText = data.totalPercentage.toFixed(1) + '%';

    document.getElementById('total_curtidas').innerText = data.totalCurtidas;
    document.getElementById('curtidas_percentage').innerText = data.curtidasPercentage;
    document.getElementById('curtidas_percentage').innerText = data.curtidasPercentage + '%';

    document.getElementById('total_comentario').innerText = data.totalComentario;
    document.getElementById('comentario_percentage').innerText = data.comentarioPercentage;
    document.getElementById('comentario_percentage').innerText = data.comentarioPercentage + '%';
   
}

updateDashboard(data);








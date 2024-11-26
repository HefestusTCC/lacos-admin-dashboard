import apiFetch from './api.js';

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  var options = {
    width: '50%', // Faz o gráfico ocupar a largura total
    height: 500,   // Ajuste a altura conforme necessário
    // Outras opções de configuração
  };
  let now = new Date();
  now = new Date(now.getFullYear(), now.getMonth(), 1)
  let lastMonth= new Date(now.getFullYear(), now.getMonth() - 1, 1);
  let lastTwoMonth= new Date(now.getFullYear(), now.getMonth() - 2, 1);
  let nowMonthName = obterNomeMes(now);
  let lastMonthName = obterNomeMes(lastMonth);
  let lastTwoMonthName = obterNomeMes(lastTwoMonth);
  now = now.toISOString().split('.')[0];
  lastMonth = lastMonth.toISOString().split('.')[0];
  lastTwoMonth = lastTwoMonth.toISOString().split('.')[0];
  const newUserSinceToday = await getUserSince(now);
  const newUserSinceLastMonth = await getUserSince(lastMonth);
  const newUserSinceLastTwoMonth = await getUserSince(lastTwoMonth);
  console.log(newUserSinceToday + " " + newUserSinceLastMonth + " " + newUserSinceLastTwoMonth);
  var data = google.visualization.arrayToDataTable([
    ["Mês", "Usuários Totais"],
    [lastTwoMonthName, newUserSinceLastTwoMonth - (newUserSinceToday)],
    [lastMonthName, newUserSinceLastMonth - newUserSinceLastTwoMonth],
    [nowMonthName, newUserSinceToday],
  ]);

  var options = {
    title: "Crescimento de usuários trimestral",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Número de Usuários",
      minValue: 0,
    },
    vAxis: {
      title: "Mês",
    },
    bars: "vertical", // Mantém as barras na vertical
    legend: { position: "bottom" },
    colors: ["#FF6E15"],
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

const getLastThreeMonths = () => {
  const today = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const dataAtualizada = date.toISOString().split('.')[0]
    months.push(dataAtualizada);
  }

  return months;
};

const obterNomeMes = (data) => {
  return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

const fetchUserGrowth = async (months) => {
  const results = [];
  months.forEach((month) => {
    results.push(returnMonthObject(month));
  });
  console.log(results)
  return results;
};

async function returnMonthObject(month) {
  const count = await getUserSince(month);
  return {mes: month, count: count};
}

async function getUserSince(date) {
  try {
    const response = await apiFetch(`/report/users/new-since?date=${date}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
  }
}
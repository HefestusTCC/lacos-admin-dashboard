import apiFetch from './api.js';

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

const obterNomeMes = (data) => {
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

async function drawChart() {
    const dataAtual = new Date();
    const umMesAtras = new Date(dataAtual);
    umMesAtras.setMonth(umMesAtras.getMonth() - 1);
    const doisMesesAtras = new Date(dataAtual);
    doisMesesAtras.setMonth(doisMesesAtras.getMonth() - 2);
    var options = {
        width: '100%', // Faz o gráfico ocupar a largura total
        height: 500,   // Ajuste a altura conforme necessário
        // Outras opções de configuração
    };
    let reports = await getData();
    console.log(reports)
    var data = google.visualization.arrayToDataTable([
        ['Mês', 'Posts'],
        [obterNomeMes(doisMesesAtras), reports[0]+1],
        [obterNomeMes(umMesAtras), reports[1]+2],
        [obterNomeMes(dataAtual), reports[2]+3],
    ]);

    var options = {
        title: 'Crescimento de post trimestral',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Número de Posts',
            minValue: 0
        },
        vAxis: {
            title: 'Mês'
        },
        bars: 'vertical', // Mantém as barras na vertical
        legend: { position: 'bottom' },
        colors: ['#ffb36b']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

async function getData(date) {
    try {
        const response = await apiFetch(`/report/posts/last-three-months`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}


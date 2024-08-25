// chart.js
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var options = {
        width: '100%', // Faz o gráfico ocupar a largura total
        height: 500,   // Ajuste a altura conforme necessário
        // Outras opções de configuração
    };
    var data = google.visualization.arrayToDataTable([
        ['Mês', 'Usuários Totais'],
        ['Junho', 150],
        ['Julho', 160],
        ['Agosto', 175],
        // Adicione mais meses e dados conforme necessário
    ]);

    var options = {
        title: 'Número de Postagens Mensal',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Número de Usuários',
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

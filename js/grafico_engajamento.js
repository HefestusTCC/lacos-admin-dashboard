// Carregar o Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Criar dados fictícios
    var data = google.visualization.arrayToDataTable([
        ['Mês', 'Postagens'],
        ['Jun',  60],
        ['Jul',  50],
        ['Ago',  76],
    ]);

    // Configurações do gráfico
    var options = {
        title: 'Engajamento Mensal',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Mês',
            titleTextStyle: { color: '#333' },
            slantedText: true,
            slantedTextAngle: 45,
            textStyle: { fontSize: 12 }
        },
        vAxis: {
            title: 'Postagens',
            titleTextStyle: { color: '#333' },
            textStyle: { fontSize: 12 }
        },
        lineWidth: 3,  // Largura da linha
        pointSize: 5,  // Tamanho dos pontos
        series: {
            0: {
                color: '#ffb36b',  // Cor da linha
                lineDashStyle: [4, 4]  // Linha pontilhada
            }
        },
        backgroundColor: '#f1f8e9'  // Cor de fundo do gráfico
    };

    // Criar o gráfico
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    // Desenhar o gráfico
    chart.draw(data, options);
}

import apiFetchGet from "./api.js";
import genericFetch from "./genericApi.js";

$('.btnTotal').on('click', function(){
    $('.titulo').text('Todos os Pedidos');
    $(".pendente-container").empty();
    getTotalComunidades();
});

$('.btnPendentes').on('click', function(){
    $('.titulo').text('Todos os Pedidos Pendentes');
    $(".pendente-container").empty();
    getPedidosPendentes();
});

$('.btnAceitos').on('click', function(){
    $('.titulo').text('Todas as comunidades aceitas');
    $(".pendente-container").empty();
    getPedidosAceitos();
});


function renderCards(communities) {
    $(".pendente-container").empty();
    console.log(communities)
    if (communities.length === 0){
        $(".pendente-container").html('<br><p style="font-size: 15px;">Nenhum pedido/comunidade encontrado(a).</p>')
    }
    communities.forEach((community) => {
        let card;
        if (community.status == "analise") {
            card = `
                    <div class="comunidade">
                        <div class="idPedido">
                            <p>#${community.id}</p>
                        </div>
                        <div class="imgComunidade">
                            <img src="${community.communityImageUrl}" alt="img da comunidade">
                        </div>
                        <div class="infoComunidade">
                            <div class="nomeComunidade">
                                <p class="nomeComunidades">${community.name}</p>
                                <p class="idComunidades">#${community.id}</p>
                            </div>
                            <div class="nomeCriadorComunidade">
                                <p>${community.creator.name}</p>
                            </div>
                            <div class="emailCriadorComunidade">
                                <p>${community.creator.email}</p>
                            </div>
                        </div>
                        <div class="dataDoPedido">
                            <p>${formatarData(community.createdAt)}</p>
                        </div>
                        <div class="statusPedido">
                            <button class="btnAceitar" data-id="${community.id}"><img src="./img/accepted.png"></img></button>
                            <button class="btnRecusar" data-id="${community.id}"><img class="imgRefuse" src="./img/refuse.png"></img></button>
                        </div>
                    </div>
            `;
        } else{
            card = `
                    <div class="comunidade">
                        <div class="idPedido">
                            <p>#${community.id}</p>
                        </div>
                        <div class="imgComunidade">
                            <img src="${community.communityImageUrl}" alt="img da comunidade">
                        </div>
                        <div class="infoComunidade">
                            <div class="nomeComunidade">
                                <p class="nomeComunidades">${community.name}</p>
                                <p class="idComunidades">#${community.id}</p>
                            </div>
                            <div class="nomeCriadorComunidade">
                                <p>${community.creator.name}</p>
                            </div>
                            <div class="emailCriadorComunidade">
                                <p>${community.creator.email}</p>
                            </div>
                        </div>
                        <div class="dataDoPedido">
                            <p>${formatarData(community.createdAt)}</p>
                        </div>
                        <div class="statusPedido">
                            Comunidade aprovada.
                        </div>
                    </div>
            `;
        }
        $(".pendente-container").append(card);
        assingButtonEvents();
    });
}

async function getPedidosAceitos(){
    const response = await apiFetchGet('/community/all');
    let data = await response.json();
    data = data.data;
    renderCards(data.reverse());
}

async function getPedidosPendentes(){
    const response = await apiFetchGet('/admin/community/pending-approval');
    let data = await response.json();
    data = data.data;
    renderCards(data.reverse());
}

async function getTotalComunidades() {
    const response = await apiFetchGet('/admin/community/all');
    let data = await response.json();
    data = data.data;
    renderCards(data.reverse());
}


function assingButtonEvents() {
    $(".btnAceitar").on("click", async function () {
        const communityId = $(this).data("id");
        let response = await genericFetch(`/admin/community/${communityId}/approve`, {}, 'POST');
        if (response.status == 200) {
            location.reload();
        }
    });

    $(".btnRecusar").on("click", async function () {
        const communityId = $(this).data("id");
        let response = await genericFetch(`/admin/community/${communityId}/disapprove`, {}, 'POST');
        if (response.status == 200) {
            location.reload();
        }
    });
}

function formatarData(dataISO){
    const data = new Date(dataISO);

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

window.onload = function () {
    getTotalComunidades()
};
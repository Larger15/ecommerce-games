$( document ).ready(function() {
    
    exibirCardJogosPorPlataforma(TipoPlataforma.NINENTO);

});

const TipoPlataforma = {
    "NINENTO" : "N",
    "PLAYSTATION" : "P",
    "XBOX" : "X"
}

function exibirCardJogosPorPlataforma(tipoPlataformaSelect) {

    var listaJogosPorPlataforma = getListaJogosPorPlataforma(tipoPlataformaSelect);

    var cardsHtml = montarHtmlCards(listaJogosPorPlataforma);

    $("#jogosPlataforma").html(cardsHtml);
}

function getListaJogosPorPlataforma(tipoPlataformaSelect) {

    var listaJogosFiltrados = new Array();

    for (var i = 0; i < listaJogosJson.length; i++) {

        if (listaJogosJson[i].listaPlataformas.length > 0) {

            for (var j = 0; j < listaJogosJson[i].listaPlataformas.length; j++) {

                var indTpPlataforma = listaJogosJson[i].listaPlataformas[j].split("-")[0];
                
                if (indTpPlataforma == tipoPlataformaSelect) {
                    
                    var jogo = getInformacoesJogo(listaJogosJson[i]);
                    jogo.vlrJogo = listaJogosJson[i].listaPlataformas[j].split("-")[1];

                    listaJogosFiltrados.push(jogo);
                    break;
                }

            }

        }

    } 

    return listaJogosFiltrados;

}

function getInformacoesJogo(jogoClone) {

    var jogo = new Object();
    jogo.nmJogo = jogoClone.nmJogo;
    jogo.txtDescricao = jogoClone.txtDescricao;
    jogo.nmDesenvolvedora = jogoClone.nmDesenvolvedora;
    jogo.nmDistribuidora = jogoClone.nmDistribuidora;
    jogo.nmDataLancamento = jogoClone.nmDataLancamento;
    jogo.nmGenero = jogoClone.nmGenero;
    jogo.nrEstrelasCheias = jogoClone.nrEstrelasCheias;
    jogo.nrEstrelasMetade = jogoClone.nrEstrelasMetade;
    jogo.nrEstrelasVazias = jogoClone.nrEstrelasVazias;
    jogo.urlVideo = jogoClone.urlVideo;
    jogo.caminhoImagemPrincipal = jogoClone.caminhoImagemPrincipal;
    jogo.caminhoImagemSecundaria = jogoClone.caminhoImagemSecundaria;

    return jogo;
}

function montarHtmlCards(listaJogosPorPlataforma) {

    var modelo = getCardModelo();

    var cardsHtml = "";

    var count = 0;

    for (var i = 0; i < listaJogosPorPlataforma.length; i++) {

        var card = modelo;
        card = card.replace("#nmJogo#", listaJogosPorPlataforma[i].nmJogo);
        card = card.replace("#dataLancamento#", listaJogosPorPlataforma[i].nmDataLancamento);
        card = card.replace("#vlrJogo#", listaJogosPorPlataforma[i].vlrJogo);
        card = card.replace("#estrelas#", montarEstrelas(listaJogosPorPlataforma[i]));
        card = card.replace("#imagem#", "style=\"background: url('" + listaJogosPorPlataforma[i].caminhoImagemPrincipal + "')no-repeat center top\"");
       
        if (count < 2) {
            card = card.replace("#clasMargin#", "pr-50");
            count += 1;
        } else {
            count = 0;
        }

        cardsHtml += card;
    }

    return cardsHtml
}

function getCardModelo() {

    return $("#cardModelo").html();

}

function montarEstrelas(jogo) {

    var estrelas = "";


    for (var i = 0; i < jogo.nrEstrelasCheias; i++) {
        estrelas += "<span class='fas fa-star icon-star'></span>"
    }
   
    for (var i = 0; i < jogo.nrEstrelasMetade; i++) {
        estrelas += "<span class='fas fa-star-half-alt icon-star'></span>"
    }
 
    for (var i = 0; i < jogo.nrEstrelasVazias; i++) {
        estrelas += "<span class='far fa-star icon-star'></span>"
    }
    return estrelas
}
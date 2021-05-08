$( document ).ready(function() {
    
    exibirCardJogosPorPlataforma(TipoPlataforma.NINTENDO);

});

const TipoPlataforma = {
    "NINTENDO" : "N",
    "PLAYSTATION" : "P",
    "XBOX" : "X"
}

var jogoSelectPreview = new Object();

var listaJogosPorPlataforma = new Array();

function exibirCardJogosPorPlataforma(tipoPlataformaSelect) {

    var listaJogosPorPlataforma = getListaJogosPorPlataforma(tipoPlataformaSelect);

    var cardsHtml = montarHtmlCards(listaJogosPorPlataforma);

    $("#jogosPlataforma").html(cardsHtml);
}

function getListaJogosPorPlataforma(tipoPlataformaSelect) {

    listaJogosFiltrados = new Array();

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
    jogo.listaImagens = jogoClone.listaImagens;
    jogo.idJogo = jogoClone.idJogo;

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
        card = card.replace("#idJogo#", listaJogosPorPlataforma[i].idJogo);
      
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

function showInformacoesJogo(idJogo) {
    
    $("#plataformas-jogos").hide();   

    idJogo = parseInt(idJogo);

    var jogoJson = getJogoPorId(idJogo);

    jogoSelectPreview = jogoJson;
    
    popularInformacoesJogo(jogoJson);

    $("#detalhe-jogo").show();   

}

function popularInformacoesJogo(jogoJson) {

    popularImagensAux(jogoJson);

    popularImagemGrande(jogoJson.caminhoImagemPrincipal)

    popularinformacoesDiversas(jogoJson);

}

function popularinformacoesDiversas(jogoJson) {

    $("#nmJogoPreview").text(jogoJson.nmJogo);

    $("#estrelasJogoPreview").html(montarEstrelas(jogoJson));

    $("#dtLancJogoPreview").text(jogoJson.nmDataLancamento);

    $("#sinopseJogoPreview").text(jogoJson.txtDescricao);

    $("#generoJogoPreview").text(jogoJson.nmGenero);

    $("#desenvolvedoraJogoPreview").text(jogoJson.nmDesenvolvedora);

    $("#distribuidoraJogoPreview").text(jogoJson.nmDistribuidora);

    $("#precoJogoPreview").text(jogoSelectPreview.vlrJogo);

}

function popularImagensAux(jogoJson) {

    var htmlImagens = "";

    for (var i = 0; i < jogoJson.listaImagens.length; i++) {
        htmlImagens += "<img onclick='prepararImagemGrande(this)' src='" + jogoJson.listaImagens[i] + "' class='img-thumbnail imagem-aux mb-3 imagem-resolucao' alt='Imagem " + (i+1) + "'>";
        
        if (i == 3) {
            break;
        }
    }

    $("#listaImagensAux").html(htmlImagens);
}

function prepararImagemGrande(element) {

    var nmCaminhoImagem = $(element).attr("src");
    
    popularImagemGrande(nmCaminhoImagem);
}

function popularImagemGrande(nmCaminhoImagem) {

    $("#imagemGrande").html("<img src='" + nmCaminhoImagem + "' class='img-thumbnail imagem-grande mb-3 imagem-resolucao' alt='Imagem Preview'>");

}

function getJogoPorId(idjogo) {

    var jogo = new Object();

    for (var i =0; i < listaJogosFiltrados.length; i++) {

        if (listaJogosFiltrados[i].idJogo == idjogo) {
            jogo = listaJogosFiltrados[i];
            break;
        }

    }

    return jogo;
}
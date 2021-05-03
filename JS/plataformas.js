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

    console.log(listaJogosPorPlataforma)
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
module.exports = function(app){
    var pedidos_insercao = app.controllers.pedidosInsercao;
    
    app.get("/pedidos_insercao", pedidos_insercao.consultarTodos);    
    app.post("/pedidos_insercao", pedidos_insercao.cadastrar);
    app.put("/pedidos_insercao", pedidos_insercao.alterar);
    app.get("/pedidos_insercao/no_ar", pedidos_insercao.consultarNoAr);
    app.get("/pedidos_insercao/novos", pedidos_insercao.consultarNovos);
    app.get("/pedidos_insercao/fora_do_prazo_no_ar", pedidos_insercao.consultarForaDoPrazoNoAr);
    app.get("/pedidos_insercao/encerram_hoje", pedidos_insercao.consultarEncerramHoje);    
    app.get("/pedidos_insercao/contagens", pedidos_insercao.consultarContagens);
    app.get("/pedidos_insercao/:_id", pedidos_insercao.consultarPorId);
};

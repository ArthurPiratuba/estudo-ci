angular.module("pedidosInsercaoApp").factory("pedidoAPI", function($http, valueConfig){
    var apiUrl =  "";//valueConfig.baseUrl;
    
    var _postPedido = function(pedido){
        return $http.post(apiUrl +  "/pedidos_insercao", pedido);
    };

    var _putPedido = function(pedido){
        return $http.put(apiUrl +  "/pedidos_insercao", pedido);
    };



    //GET PEDIDOS  
    var _getPedido = function(cod){
        return $http.get(apiUrl +  "/pedidos_insercao/" + cod);
    };

    var _getPedidos = function(){
        return $http.get(apiUrl +  "/pedidos_insercao");
    };

    var _getEncerramHoje = function(){
        return $http.get(apiUrl +  "/pedidos_insercao/encerram_hoje");
    };

    var _getNoAr = function(){
        return $http.get(apiUrl +  "/pedidos_insercao/no_ar");
    };

    var _getForaDoPrazoNoAr = function(){
        return $http.get(apiUrl +  "/pedidos_insercao/fora_do_prazo_no_ar");
    };

    var _getRecentes = function(){
        return $http.get(apiUrl +  "/pedidos_insercao/novos");
    };
    //GET PEDIDOS END





  
    var _getContagens = function(){
        return $http.get(apiUrl + "/pedidos_insercao/contagens");
    };

   


    return {       
        postPedido: _postPedido,
        putPedido: _putPedido,
        getPedido: _getPedido,
        getPedidos: _getPedidos,
        getEncerramHoje: _getEncerramHoje,
        getNoAr: _getNoAr,
        getForaDoPrazoNoAr: _getForaDoPrazoNoAr,
        getRecentes: _getRecentes,      
        getContagens: _getContagens
    };
});
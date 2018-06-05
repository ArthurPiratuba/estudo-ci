angular.module("pedidosInsercaoApp").factory("clienteAPI", function($http, valueConfig){
    var _getClientes = function(){
        return $http.get("/clientes");
    };

    var _getCliente = function(cod){
        return $http.get("/clientes/" + cod);
    };

    var _postCliente = function(cliente){
        return $http.post("/clientes", cliente);
    };

    var _putCliente = function(cliente){
        return $http.put("/clientes", cliente);
    };

    return {
        getClientes: _getClientes,
        postCliente: _postCliente,
        putCliente: _putCliente,
        getCliente: _getCliente
    };
});
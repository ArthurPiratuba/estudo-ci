angular.module("pedidosInsercaoApp").factory("funcionarioAPI", function($http, valueConfig){
    var _getFuncionarios = function(){
        return $http.get("/funcionarios");
    };

    var _getFuncionario = function(cod){
        return $http.get("/funcionarios/" + cod);
    };


    var _postFuncionario = function(funcionario){
        return $http.post("/funcionarios", funcionario);
    };

    return {
        getFuncionarios: _getFuncionarios,
        getFuncionario: _getFuncionario,
        postFuncionario: _postFuncionario
    };
});
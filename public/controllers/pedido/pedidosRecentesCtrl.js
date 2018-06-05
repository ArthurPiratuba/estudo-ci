angular.module("pedidosInsercaoApp").controller("pedidosRecentesCtrl", function(
    $scope, titulo, $rootScope, pedidoAPI){
    $rootScope.values.pageTitle = titulo;

    var getPedidos = function(){
        pedidoAPI.getRecentes().success(function(data){
            $scope.pedidos = data;
        });
    };

    getPedidos();    
});
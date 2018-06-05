angular.module("pedidosInsercaoApp").controller("pedidosNoArCtrl", function(
    $scope, titulo, $rootScope, pedidoAPI){
    $rootScope.values.pageTitle = titulo;

    var getPedidos = function(){
        pedidoAPI.getNoAr().success(function(data){
            $scope.pedidos = data;
        });
    };

    getPedidos();    
});
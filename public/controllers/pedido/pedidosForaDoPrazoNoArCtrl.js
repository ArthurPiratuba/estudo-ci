angular.module("pedidosInsercaoApp").controller("pedidosForaDoPrazoNoArCtrl", function(
    $scope, titulo, $rootScope, pedidoAPI){
    $rootScope.values.pageTitle = titulo;

    var getPedidos = function(){
        pedidoAPI.getForaDoPrazoNoAr().success(function(data){
            $scope.pedidos = data;
        });
    };

    getPedidos();
});
angular.module("pedidosInsercaoApp").controller("pedidoListagemCtrl", function($scope, $rootScope, pedidoAPI, titulo){
    $rootScope.values.pageTitle = titulo;
    pedidoAPI.getPedidos().success(function(data){
        $scope.pedidos = data;
    });
});
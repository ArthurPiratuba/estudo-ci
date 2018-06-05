angular.module("pedidosInsercaoApp").controller("pedidosEncerramHojeCtrl", function(
    $scope, titulo, $rootScope, pedidoAPI){
    $rootScope.values.pageTitle = titulo;

    var getPedidos = function(){
        pedidoAPI.getEncerramHoje().success(function(data){
            $scope.pedidos = data;
        });
    };

    getPedidos();   
});
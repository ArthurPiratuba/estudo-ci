angular.module("pedidosInsercaoApp").controller("tabelaPedidoCtrl", function($scope, $rootScope, titulo){
    $rootScope.values.pageTitle = titulo;
    $scope.data = new Date();
});
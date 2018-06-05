angular.module("pedidosInsercaoApp").controller("clienteDetalhesCtrl", function($scope, cliente, titulo, $rootScope){
    $scope.c = cliente.data;
    $rootScope.values.pageTitle = titulo;
});
angular.module("pedidosInsercaoApp").controller("pedidosDashboardCtrl", function(
    $scope, titulo, $rootScope, pedidoAPI, valueConfig){
    $rootScope.values.pageTitle = titulo;
    $scope.values = valueConfig;
 
    pedidoAPI.getContagens().success(function(data){
        $scope.countForaDoPrazoNoAr = data[0];
        $scope.countEncerramHoje = data[1];
        $scope.countRecentes = data[2];
        $scope.countNoAr = data[3];
    });
});
angular.module("pedidosInsercaoApp").controller("funcionarioDetalhesCtrl", function($scope, funcionario, titulo, $rootScope){
    $scope.f = funcionario.data;
    $rootScope.values.pageTitle = titulo;
});
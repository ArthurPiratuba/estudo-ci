angular.module("pedidosInsercaoApp").controller("funcionarioCtrl", function(
    $scope, $rootScope, funcionarioAPI, $location, titulo
    ){

    $rootScope.values.pageTitle = titulo;
    $scope.adicionarFuncionario = function(funcionario){
        funcionarioAPI.postFuncionario(funcionario).success(function(data){
            delete $scope.funcionario;
            $scope.funcionarioForm.$setPristine();
            $location.path("/listagemFuncionarios");
        });  
    };

    funcionarioAPI.getFuncionarios().success(function(data){
        $scope.funcionarios = data;
    });
});
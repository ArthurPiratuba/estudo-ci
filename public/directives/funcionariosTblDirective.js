angular.module("pedidosInsercaoApp").directive("funcionariosTbl", function($location){
    return {
        templateUrl : "partials/funcionarios_tbl.html",
        scope:{
            funcionarios: "="          
        },        
        link: function($scope, element, attrs) {
            $scope.detalhes = function(cod) {
                $location.path("/funcionarioDetalhes/" + cod);
            };
        }
    };
});
angular.module("pedidosInsercaoApp").directive("clientesTbl", function($location){
    return {
        templateUrl : "partials/clientes_tbl.html",
        scope:{
            clientes: "="          
        },        
        link: function($scope, element, attrs) {
            $scope.detalhes = function(cod) {
                $location.path("/clienteDetalhes/" + cod);
            };
        }
    };
});
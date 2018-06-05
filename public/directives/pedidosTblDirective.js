angular.module("pedidosInsercaoApp").directive("pedidosTbl", function($location){
    return {
        templateUrl : "partials/pedidos_tbl.html",
        scope:{
            pedidos: "="
        },        
        link: function($scope, element, attrs) {
            $scope.detalhes = function(cod) {
                $location.path("/pedidoDetalhes/" + cod);
            };           
        }
    };
});
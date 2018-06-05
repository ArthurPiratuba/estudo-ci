(function(){'use strict';  
angular.module('pedidosInsercaoApp').controller('loginCtrl',
    ['$scope', '$rootScope', '$location', 'loginAPI',
    function ($scope, $rootScope, $location, loginAPI) {

        $rootScope.values.pageTitle = "Login";
        // reset login status
        //loginAPI.ClearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            loginAPI.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    $rootScope.usuario = response.funcionario.nome;
                    loginAPI.SetCredentials($scope.username, $scope.password, response.funcionario._id);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.logout = function(){
            console.log("logout");
            loginAPI.ClearCredentials();
            $location.path('/');
        };
    }]);
})();
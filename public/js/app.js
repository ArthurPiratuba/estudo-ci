'use strict';

angular.module("pedidosInsercaoApp", [
    "ngRoute",    
    'ngTouch', 
    'ngMessages',
    'ngCookies',
    'pickadate'
])
  
.config(['$routeProvider', function ($routeProvider) {
 
    $routeProvider
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'views/login/login.html'
        }) ;
        
}])
  
.run(['$rootScope', '$location', '$cookieStore', '$http', 'funcionarioAPI',
    function ($rootScope, $location, $cookieStore, $http, funcionarioAPI) {
        // keep user logged in after page refresh
        //console.log($cookieStore.get('globals'));
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            //consulta novamente o funcionario
            funcionarioAPI.getFuncionario($rootScope.globals.currentUser.cod_funcionario).success(function(res){
                $rootScope.usuario = res.nome;
            });
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);






var sobre = function(){
    swal({
        title: "Sobre",
        text: "Software desenvolvido por Arthur Samuel Hack<br>2016<br>Tecnologias: AngularJS, NodeJS e MongoDB<br><a href='mailto:suporte@arthursistemas.com.br'>suporte@arthursistemas.com.br</a>",
        type: "success",
        html: true
    });
};





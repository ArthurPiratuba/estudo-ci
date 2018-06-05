angular.module("pedidosInsercaoApp").directive("menu", function(){
    return {
        templateUrl: "partials/menu.html",      
        link: function($scope, element, attrs) {
           
        },
        replace: true,
        controller: function(){  
            //Função para acionar o metisMenu              
            $(document).ready(function() {
                $('#side-menu').metisMenu();   
            });
            //Função que recolhe o menu de volta depois de tocar em um opção
            //sua ação é visível no mobile
            $("div.sidebar-nav ul li ul li a").on("click", function(){
                if(width < 768){
                    $("button.navbar-toggle").click();
                }
            });        
        }
    }
});
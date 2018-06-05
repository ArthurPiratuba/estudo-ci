angular.module("pedidosInsercaoApp").config(function($routeProvider){

    $routeProvider.when("/cadastroCliente", {
        templateUrl: "views/cliente/cadastro.html",
        controller: "clienteCtrl",
        resolve:{
            titulo: function(){
                return "Cadastro de Cliente";
            },
            cliente: function(){
                return undefined;
            }  
        }       
    });
    $routeProvider.when("/listagemClientes", {
        templateUrl: "views/cliente/listagem.html",
        controller: "clienteCtrl",
        resolve:{
            titulo: function(){
                return "Listagem de Clientes";
            },
            cliente: function(){
                return undefined;
            }

        } 
    });
    $routeProvider.when("/clienteDetalhes/:cod", {
        templateUrl: "views/cliente/detalhes.html",
        controller: "clienteDetalhesCtrl",
        resolve: {           
            titulo: function($route){
                return "Cliente " + $route.current.params.cod;
            },
            cliente: function(clienteAPI, $route){
                return clienteAPI.getCliente($route.current.params.cod);
            }            
        }  
    });


    $routeProvider.when("/funcionarioDetalhes/:cod", {
        templateUrl: "views/funcionario/detalhes.html",
        controller: "funcionarioDetalhesCtrl",
        resolve: {           
            titulo: function($route){
                return "Funcionário " + $route.current.params.cod;
            },
            funcionario: function(funcionarioAPI, $route){
                return funcionarioAPI.getFuncionario($route.current.params.cod);
            }            
        }  
    });


    $routeProvider.when("/cadastroFuncionario", {
        templateUrl: "views/funcionario/cadastro.html",
        controller: "funcionarioCtrl",
        resolve:{
            titulo: function(){
                return "Cadastro de Funcionário";
            }
        }
    });
    $routeProvider.when("/listagemFuncionarios", {
        templateUrl: "views/funcionario/listagem.html",
        controller: "funcionarioCtrl",
        resolve:{
            titulo: function(){
                return "Listagem de Funcionários";
            }
        }     
    });

    
    $routeProvider.when("/dashboard", {
        templateUrl: "views/pedidos_insercao/dashboard.html",
        controller: "pedidosDashboardCtrl",
        resolve:{
            titulo: function(){
                return "Pedidos Ativos";
            }
        }      
    });  


    //PEDIDOS FORA DO PRAZO AINDA NO AR
    $routeProvider.when("/foraDoPrazoNoAr", {
        templateUrl: "views/pedidos_insercao/fora_do_prazo_no_ar.html",
        controller: "pedidosForaDoPrazoNoArCtrl",
        resolve:{
            titulo: function(){
                return "Pedidos fora do prazo";
            }
        }      
    });
    //PEDIDOS QUE ENCERRAM HOJE
    $routeProvider.when("/encerramHoje", {
        templateUrl: "views/pedidos_insercao/encerram_hoje.html",
        controller: "pedidosEncerramHojeCtrl",
        resolve:{
            titulo: function(){
                return "Pedidos que encerram hoje";
            }
        }      
    });
    //PEDIDOS QUE ESTÃO NO AR, INDEPENDENTE DO STATUS
    $routeProvider.when("/pedidosNoAr", {
        templateUrl: "views/pedidos_insercao/total_pedidos_no_ar.html",
        controller: "pedidosNoArCtrl",
        resolve:{
            titulo: function(){
                return "Total de pedidos no ar";
            }
        }
    });   
    //PEDIDOS RECENTES
    $routeProvider.when("/recentes", {
        templateUrl: "views/pedidos_insercao/recentes.html",
        controller: "pedidosRecentesCtrl",
        resolve: {           
            titulo: function(){
                return "Últimos pedidos cadastrados";
            }            
        }  
    });

    //TODOS OS PEDIDOS
    $routeProvider.when("/listagemPedidos", {
        templateUrl: "views/pedidos_insercao/listagem_pedidos.html",
        controller: "pedidoListagemCtrl",
        resolve: {           
            titulo: function(){
                return "Todos os pedidos cadastrados";
            }            
        }  
    });

 
  






    $routeProvider.when("/novoPedido", {
        templateUrl: "views/pedidos_insercao/novo_pedido.html",
        controller: "pedidoCtrl",
        resolve: {           
            titulo: function(){
                return "Novo pedido";
            }      
        }  
    });


   

    $routeProvider.when("/pedidoDetalhes/:cod", {
        templateUrl: "views/pedidos_insercao/detalhes.html",
        controller: "pedidoDetalhesCtrl",
        resolve: {           
            titulo: function($route){
                return "Pedido de Inserção " + $route.current.params.cod;
            },
            pedidoDetalhes: function(pedidoAPI, $route){
                return pedidoAPI.getPedido($route.current.params.cod);
            }            
        }  
    });

    $routeProvider.when("/pedidoAlterar/:cod", {       
        templateUrl: "views/pedidos_insercao/novo_pedido.html",
        controller: "pedidoAlterarCtrl",
        resolve:{
            titulo: function($route){
                return "Alterar Pedido de Inserção " + $route.current.params.cod;
            },
            cod_pedido: function($route){
                return $route.current.params.cod;
            }
        }
    });

    $routeProvider.when("/calendarioPedidos",{
        templateUrl: "views/pedidos_insercao/calendario.html",
        controller: "calendarioPedidoCtrl",
        resolve:{
            titulo: function(){
                return "Calendário de pedidos (Em desenvolvimento!)";
            }
        }
    });
    $routeProvider.otherwise({redirectTo: "/dashboard"});
});
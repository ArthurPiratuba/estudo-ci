angular.module("pedidosInsercaoApp").controller("pedidoCtrl", function(
    $scope, $rootScope, $location,
    titulo, valueConfig,
    pedidoAPI, funcionarioAPI, clienteAPI){  
        
        

        
        
    $scope.values = valueConfig;
    $rootScope.values.pageTitle = titulo;     


    $scope.options = {
      format: 'dd/mm/yyyy'
    };

    $scope.pedido = {        
        horarios_semana : {
            'dom': [],
            'seg': [],
            'ter': [],
            'qua': [],
            'qui': [],
            'sex': [],
            'sab': [],
        }
    };  


    $scope.alteracao = false;    
    
  $scope.dia_semana = "seg";

    $("#horario").on("keydown",function(event){
        //keyCode 39 == seta direita
        //keyCode 37 == seta esquerda     
        
        //enter
        if(event.which == 13){
            $("#btnAdicionarHorario").click();
        }

        if(event.which == 39){
            switch($scope.dia_semana){
                case "dom": 
                    $scope.dia_semana="seg";
                    break;
                case "seg": 
                    $scope.dia_semana="ter";
                    break;
                case "ter": 
                    $scope.dia_semana="qua";
                    break;
                case "qua": 
                    $scope.dia_semana="qui";
                    break;
                case "qui": 
                    $scope.dia_semana="sex";
                    break;
                case "sex": 
                    $scope.dia_semana="sab";
                    break;
                case "sab": 
                    $scope.dia_semana="dom";
                    break;
            }
        }



        if(event.which == 37){
            switch($scope.dia_semana){
                case "dom": 
                    $scope.dia_semana="sab";
                    break;
                case "seg": 
                    $scope.dia_semana="dom";
                    break;
                case "ter": 
                    $scope.dia_semana="seg";
                    break;
                case "qua": 
                    $scope.dia_semana="ter";
                    break;
                case "qui": 
                    $scope.dia_semana="qua";
                    break;
                case "sex": 
                    $scope.dia_semana="qui";
                    break;
                case "sab": 
                    $scope.dia_semana="sex";
                    break;
            }
        }
        $scope.$apply();
    });



    funcionarioAPI.getFuncionarios().success(function(data){
        $scope.funcionarios = data;
    });
    clienteAPI.getClientes().success(function(data){
        $scope.clientes = data;
    });

    $("#horario").on("input",function(){  
        $("#horario").val(
            _formatTime($("#horario").val())
        );       
    });


    var _formatTime = function(time){                           
        time = time.replace(/[^0-9]+/g, "");              
        if(time.length > 2){      
            if(time.substring(0,2) > 23){
                time = "23" + ":" + time.substring(2);
            }    
            else{         
                time = time.substring(0,2) + ":" + time.substring(2);
            }                                     
        }
        if(time.length >= 5){                  
            if(time.substring(3,5) > 59){
                time = time.substring(0,2) + ":" + 59; 
            }
            time = time.substring(0,5);                                          
        }
        return time;
    };




    $scope.adicionarHorario = function(pedido, dia_semana, horario){      
        if(pedido.horarios_semana[dia_semana].indexOf(horario) == -1){
            pedido.horarios_semana[dia_semana].push(angular.copy(horario));            
            pedido.horarios_semana[dia_semana].sort();

            delete $scope.horario;
            $scope.pedidoInsercaoForm.horario.$setPristine();
            $("input[name=horario]").focus();
        }
    };


    $scope.adicionarPedido = function(pedido){          
        // GAMBIARRA
        var data_inicio_split = pedido.data_inicio.split('/');
        var data_termino_split = pedido.data_termino.split('/');
        pedido.data_inicio = new Date(
            data_inicio_split[2],
            (data_inicio_split[1]-1),
            data_inicio_split[0]
        );
        pedido.data_termino = new Date(
            data_termino_split[2],
            (data_termino_split[1]-1),
            data_termino_split[0]
        );
        // GAMBIARRA
        pedidoAPI.postPedido(pedido).success(function(){
            delete $scope.pedido;
            $scope.pedidoInsercaoForm.$setPristine();
            $location.path("/dashboard");
        });      
    };

    $scope.apagarHorario = function(dia_semana, index){        
        $scope.pedido.horarios_semana[dia_semana].splice(index, 1);
    };

});

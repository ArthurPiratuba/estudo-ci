angular.module("pedidosInsercaoApp").controller("clienteCtrl", function(
    $scope, $rootScope, $location, clienteAPI, titulo, valueConfig, cliente
    ){  
        
    $rootScope.values = valueConfig;
    $rootScope.values.pageTitle = titulo;
    $scope.cliente = {
        telefones: []
    };

    $scope.alteracao = false;
    //se for alteração
    if(cliente){
        $scope.alteracao = true;
        $scope.cliente = cliente.data;
    }

            
    $scope.adicionarTelefone = function(telefone){
        $scope.cliente.telefones.push(angular.copy(telefone));
        delete $scope.telefone;
        $scope.clienteForm.$setPristine();
    };

    $("#txtTelefone").on("input", function(){
        $("#txtTelefone").val(
            _formatTelefone($("#txtTelefone").val())
        );
    });

    var _formatTelefone = function(telefone){
        telefone = telefone.replace(/[^0-9]+/g,"");
        if(telefone.length > 2){
            telefone = "(" + telefone.substring(0,2) + ") " + telefone.substring(2);
        }
        if(telefone.length > 9){
            telefone = telefone.substring(0,9) + " " + telefone.substring(9);
        }
        if(telefone.length > 14){
            telefone = telefone.replace(/[^0-9]+/g,"");           
            telefone = "(" + telefone.substring(0,2) + ") " + telefone.substring(2);
            telefone = telefone.substring(0,10) + " " + telefone.substring(10);            
        }
        if(telefone.length > 15){
            telefone = telefone.substring(0,15);
        }


        return telefone;
    };



    $("#txtCpf").on("input",function(){ 
        $("#txtCpf").val(
            _formatCpf($("#txtCpf").val())
        );       
    });
    var _formatCpf = function(cpf){   
        cpf = cpf.replace(/[^0-9]+/g, "");              
        if(cpf.length > 3){  
            cpf = cpf.substring(0,3) + "." + cpf.substring(3);                                                
        }
        if(cpf.length >= 8){
            cpf = cpf.substring(0,7) + "." + cpf.substring(7);                                          
        }
        if(cpf.length >= 12){
            cpf = cpf.substring(0,11) + "-" + cpf.substring(11,13);                                          
        }
        return cpf;
    };


     $("#txtCnpj").on("input",function(){ 
        $("#txtCnpj").val(
            _formatCnpj($("#txtCnpj").val())
        );       
    });
    //XX.XXX.XXX/YYYY-ZZ
    var _formatCnpj = function(cnpj){   
        cnpj = cnpj.replace(/[^0-9]+/g, "");              
        if(cnpj.length > 2){  
            cnpj = cnpj.substring(0,2) + "." + cnpj.substring(2);                                                
        }
        if(cnpj.length >= 7){
            cnpj = cnpj.substring(0,6) + "." + cnpj.substring(6);                                          
        }
        if(cnpj.length >= 11){
            cnpj = cnpj.substring(0,10) + "/" + cnpj.substring(10);                                          
        }
        if(cnpj.length >= 16){
            cnpj = cnpj.substring(0,15) + "-" + cnpj.substring(15, 17);                                          
        }
        return cnpj;
    };








    $scope.apagarTelefone = function(index){
        console.log("passou");
        $scope.cliente.telefones.splice(index,1);
    };


    $scope.adicionarCliente = function(cliente){  
        console.log("controller cliente:"  + cliente); 
        clienteAPI.postCliente(cliente).success(function(data){
             delete $scope.cliente;
             $scope.clienteForm.$setPristine();
             $scope.cliente = {
                telefones: []
             };
             swal({
                title: "Ihull",
                text: "O cliente foi cadastrado :-)",
                type: "success"
            });
            //$location.path("/listagemClientes");
        }) ;                  
    };



    $scope.alterarCliente = function(cliente)
    {
        clienteAPI.putCliente(cliente).success(function(data){
            delete $scope.cliente;
            $location.path("/listagemClientes");
        });
    };     


    clienteAPI.getClientes().success(function(data){
        $scope.clientes = data;
    });     




 










});
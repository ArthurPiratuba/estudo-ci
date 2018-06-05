angular.module("pedidosInsercaoApp").controller("pedidoDetalhesCtrl" , function($scope, $rootScope,titulo, pedidoDetalhes, $location){
    $scope.p = pedidoDetalhes.data;
    $rootScope.values.pageTitle = titulo;

    $scope.alterar = function(cod_pedido_insercao){
        $location.path("/pedidoAlterar/" + cod_pedido_insercao);
    };

    $scope.imprimir = function(pedido){  
        window.print();      
        //  var docDefinition = {
        //     content: [{
        //         table: {               
        //             headerRows: 1,                   
        //             widths: [ '*', '*', '*'],
        //             body: [
        //                 [ { text: 'Status', bold: true }, { text: 'Funcionário', bold: true }, { text: 'Cliente', bold: true }],
        //                 [ pedido.status, pedido.funcionario_responsavel.nome, pedido.cliente.nome_empresa ],
        //                 [' ','',''],                    
        //                 [ { text: 'Data de Início', bold: true }, { text: 'Data de Término', bold: true }, { text: 'Data de Cadastro', bold: true }],
        //                 [ pedido.data_inicio, pedido.data_termino, pedido.data_cadastro ]                      
        //             ]
        //         },     
        //         layout: 'noBorders'
        //     },
        //     {
        //         table: {               
        //             headerRows: 1,                   
        //             widths: [ '*', '*', '66%'],
        //             body: [
        //                 [' ','',''],   
        //                 [ { text: 'Dias da semana', bold: true }, { text: 'Horários', bold: true }, { text: 'Descrição', bold: true }]                                                                                 
        //             ]
        //         },     
        //         layout: 'noBorders'
        //     }                  
        //     ],
        //     styles:{
        //         header:{
        //             bold: true
        //         },
        //         body:{
        //         }
        //     }
        // };
        // docDefinition.content[1].table.body.push([]);
        // docDefinition.content[1].table.body[2].push([]);
        // docDefinition.content[1].table.body[2].push([]);
        // for(var i = 0 ; i < pedido.dias_semana_pi.length;i++){
        //     docDefinition.content[1].table.body[2][0].push(pedido.dias_semana_pi[i]);
        // }    
        // for(var i = 0 ; i < pedido.horarios_dia_pi.length;i++){
        //     docDefinition.content[1].table.body[2][1].push(pedido.horarios_dia_pi[i]);
        // }
        // docDefinition.content[1].table.body[2].push(pedido.descricao);
        // pdfMake.createPdf(docDefinition).open();
    };
});
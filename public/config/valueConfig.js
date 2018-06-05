angular.module("pedidosInsercaoApp").value("valueConfig",{
    //baseUrl: "http://localhost:52256",
    //baseUrl: "http://localhost:92",
    baseUrl: "http://192.168.1.251:92",
   // baseUrl: "http://tutu.noip.me:92",     

    title: "Pedidos de Inserção",
    homeTitle: "Rádio Piratuba FM",
    pageTitle: "Página", //apenas o valor padrão, pageTitle é alterado dinamicamente durante a navegação do sistema


    pedido: {
        descricaoMaxLength: 100
    },

    cliente:{
        nomeEmpresaMaxLength: 100
    }
});
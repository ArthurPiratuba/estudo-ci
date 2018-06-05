module.exports = function(app){
    var Cliente = app.models.cliente;
    var ClienteController = {
         cadastrar: function(req, res) { 
            Cliente.create(req.body, function(erro, cliente) { 
                if(erro){
                    res.status(500).json({erro: erro});
                } else {
                    res.status(201).json(cliente);
                }                
            });
        },
        alterar: function(req, res){
           Cliente.findById(req.body._id, function(erro, cliente){
               if(erro){
                   res.status(500).json({erro: erro});
               } else if(cliente == null){
                   res.status(404).json({erro: "Cliente não encontrado"});
               } else {
                    //armazena o cliente novo na variavel c
                    var c = req.body;
                    if(c.cpf && c.cnpj) {
                        res.status(400).json(
                            {erro: "cpf e enpj não podem fazer parte de um mesmo cliente"}
                        );
                        return;
                    }
                    if(c.nome) cliente.nome = c.nome;
                    if(c.email) cliente.email = c.email;
                    if(c.endereco) cliente.endereco = c.endereco;
                    if(c.site) cliente.site = c.site;
                    if(c.telefones) cliente.telefones = c.telefones; 
                    if(c.cpf) {
                        cliente.cpf = c.cpf;
                    } else {
                        cliente.cpf = undefined
                    }
                    if(c.cnpj) {
                        cliente.cnpj = c.cnpj;
                    } else {
                        cliente.cnpj = undefined;
                    }
                    cliente.save(function(erro, clienteAtualizado){
                      if(erro){
                          res.status(500).json({erro: erro});
                      } else {
                          res.status(200).json(clienteAtualizado);
                      }
                   });
               }
           });
        },
        consultarPorId: function(req, res){ 
            new Cliente().consultarPorId(req.params._id, res, function(cliente){
                res.status(200).json(cliente);
            });              
        },
        consultarTodos: function(req, res){
            new Cliente().consultarTodos(res, function(clientes){
                res.status(200).json(clientes);
            });
        }
    };

    return ClienteController;
};
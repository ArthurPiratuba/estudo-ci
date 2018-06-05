module.exports = function(app){
    var Funcionario = app.models.funcionario;
    var FuncionarioController = {
        cadastrar: function(req, res){
            Funcionario.create(req.body, function(erro, funcionario){
                if(erro){
                    res.status(500).json({erro: erro});
                } else {
                    funcionario.senha = undefined;
                    res.status(201).json(funcionario);
                }
            });
        },
        alterar: function(req, res){
            Funcionario.findById(req.body._id, function(erro, funcionario){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (funcionario == null){
                    res.status(404).json({erro: "Funcionário não encontrado"});
                } else {
                    var f = req.body;
                    if(f.nome) {funcionario.nome = f.nome;}
                    if(f.usuario) {funcionario.usuario = f.usuario;}
                    if(f.senha) {funcionario.senha = f.senha;}
                    if(f.email) {funcionario.email = f.email;}
                    funcionario.save(function(erro, funcionarioAtualizado){
                        if(erro){
                            res.status(500).json({erro: erro});
                        } else {
                            console.log(funcionarioAtualizado);
                            funcionarioAtualizado.senha = undefined;
                            res.status(200).json(funcionarioAtualizado);
                        }
                    });
                }
            });
        },
        consultarPorId: function(req, res){
            new Funcionario().consultarPorId(req.params._id, res, function(funcionario){
                res.status(200).json(funcionario);
            });
        },
        consultarTodos: function(req, res){
            Funcionario.find({}, function(erro, funcionarios){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (funcionarios.length == 0){
                    res.status(404).json({erro: "Nenhum funcionário encontrado."});
                } else {
                    funcionarios.forEach(function(funcionario){
                        funcionario.senha = undefined;
                    });
                    res.status(200).json(funcionarios);
                }
            });
        }    
    };
    return FuncionarioController;
};
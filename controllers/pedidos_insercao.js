module.exports = function(app){
    var PedidoInsercao = app.models.pedidosInsercao;
    var Cliente = app.models.cliente;
    var Funcionario = app.models.funcionario;

    var PedidoInsercaoController = {
        cadastrar: function(req, res){
            console.log(req.body);
            PedidoInsercao.create(req.body, function(erro, pedido_insercao){
                if(erro){
                    res.status(500).json({erro: erro});
                } else {
                    res.status(201).json(pedido_insercao);
                }
            });
        },
        alterar: function(req, res){
            PedidoInsercao.findById(req.body._id, function(erro, pedido){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if(pedido == null){
                    res.status(404).json({erro: "O pedido de inserção não foi encontrado"});
                } else {
                    var p = req.body;
                    if(p.descricao) pedido.descricao = p.descricao;
                    if(p.data_inicio) pedido.data_inicio = p.data_inicio;
                    if(p.data_termino) pedido.data_termino = p.data_termino;
                    if(p.status) pedido.status = p.status;
                    if(p.cliente_id) pedido.cliente_id = p.cliente_id;
                    if(p.funcionario_id) pedido.funcionario_id = p.funcionario_id;
                    if(p.horarios_semana) pedido.horarios_semana = p.horarios_semana;
                    pedido.save(function(erro, pedidoAtualizado){
                        if(erro){
                            res.status(500).json({erro: erro});
                        } else {
                            res.status(200).json(pedidoAtualizado);
                        }
                    });
                }
            });
        },
        consultarPorId: function(req, res){
            PedidoInsercao.findById(req.params._id, function(erro, pedido){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedido == null){
                    res.status(404).json({erro: "O pedido de inserção não foi encontrado"});
                } else {
                    new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                        pedido.cliente = cliente;
                        new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                            pedido.funcionario = funcionario;
                            res.status(200).json(pedido);
                        });    
                    });
                }
            });
        },
        consultarTodos: function(req, res){
            PedidoInsercao.find({}, function(erro, pedidos){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedidos.length == 0){
                    res.status(404).json({erro: "Nenhum pedido de inserção foi encontrado"});
                } else {
                    var pedidos_count = pedidos.length;
                    var pedidos_processados = 0;
                    pedidos.forEach(function(pedido){
                       new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                            pedido.cliente = cliente;
                            new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                                pedido.funcionario = funcionario;
                                pedidos_processados++;
                                if(pedidos_processados == pedidos_count)
                                    res.status(200).json(pedidos);
                            });    
                        });                                
                   });
                }
            });
        },
        consultarNoAr: function(req, res){
            PedidoInsercao.find({status: "No ar"}, function(erro, pedidos){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedidos.length == 0){
                    res.status(404).json({erro: "Nenhum pedido de inserção encontrado"});
                } else {
                    var pedidos_count = pedidos.length;
                    var pedidos_processados = 0;
                    pedidos.forEach(function(pedido){
                       new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                            pedido.cliente = cliente;
                            new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                                
                                
                                pedido.funcionario = funcionario;
                                
                                pedidos_processados++;
                                
                                
                                if(pedidos_processados == pedidos_count)
                                    res.status(200).json(pedidos);
                                    
                                    
                            });    
                        });                                
                   });
                }
            });
        },
        
        
        
        consultarNovos: function(req, res){
            var currentDate = new Date();       
            var dataMin = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());
            var dataMax = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());
                dataMin.setDate(dataMin.getDate() - 6);
                dataMax.setDate(dataMax.getDate() + 1);                

            PedidoInsercao.find({created_at: {$gte: dataMin, $lt: dataMax}}, function(erro, pedidos){
                 if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedidos.length == 0){
                    res.status(404).json({erro: "Nenhum pedido de inserção recente foi encontrado",
                     min: dataMin, max:dataMax});
                } else {
                    var pedidos_count = pedidos.length;
                    var pedidos_processados = 0;
                    pedidos.forEach(function(pedido){
                       new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                            pedido.cliente = cliente;
                            new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                                pedido.funcionario = funcionario;
                                pedidos_processados++;
                                if(pedidos_processados == pedidos_count)
                                    res.status(200).json(pedidos);
                            });    
                        });                                
                   });
                }
            });
        },
        consultarForaDoPrazoNoAr: function(req, res){
            var currentDate = new Date();       
            var dataMax = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());   
            PedidoInsercao.find({data_termino: {$lt: dataMax}, status: "No ar"}, function(erro, pedidos){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedidos.length == 0){
                    res.status(404).json({erro: "Nenhum pedido de inserção fora do prazo foi encontrado"});
                } else {
                    var pedidos_count = pedidos.length;
                    var pedidos_processados = 0;
                    pedidos.forEach(function(pedido){
                       new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                            pedido.cliente = cliente;
                            new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                                pedido.funcionario = funcionario;
                                pedidos_processados++;
                                if(pedidos_processados == pedidos_count)
                                    res.status(200).json(pedidos);
                            });    
                        });                                
                   });
                }
            });  
        },
        consultarEncerramHoje: function(req, res){
            var currentDate = new Date();
            var dataMin = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());
            var dataMax = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());
            dataMax.setDate(dataMin.getDate() + 1);
            PedidoInsercao.find({data_termino: {$gte: dataMin, $lt: dataMax}
            }, function(erro, pedidos){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (pedidos.length == 0){
                    res.status(404).json({erro: "Nenhum pedido de inserção foi encontrado encerrando hoje", 
                    min: dataMin, max:dataMax});
                } else {
                    var pedidos_count = pedidos.length;
                    var pedidos_processados = 0;
                    pedidos.forEach(function(pedido){
                       new Cliente().consultarPorId(pedido.cliente_id, res, function(cliente){
                            pedido.cliente = cliente;
                            new Funcionario().consultarPorId(pedido.funcionario_id, res, function(funcionario){
                                pedido.funcionario = funcionario;
                                pedidos_processados++;
                                if(pedidos_processados == pedidos_count)
                                    res.status(200).json(pedidos);
                            });    
                        });                                
                   });
                }
            });
        },
        consultarContagens: function(req, res){
            //1º countForaDoPrazoNoAr;
            //2º countEncerramHoje;
            //3º countRecentes;
            //4º countNoAr;

            //objeto que vai ser rotornado no final
            //com os valores na ordem acima
            var contagens = [];

            //data atual
            var currentDate = new Date();
            //data minima para as consultas
            var dataMin = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());
            //data máxima para as consultas
            var dataMax = new Date(
                currentDate.getFullYear(), 
                currentDate.getMonth(), 
                currentDate.getDate());

            //countForaDoPrazoNoAr
            var countForaDoPrazoNoAr = function(){
                PedidoInsercao.count({data_termino: {$lt: dataMax}, status: "No ar"}, function(erro, count){
                    if(erro) res.status(500).json({erro: erro});                
                    else {
                        contagens.push(count);
                        countEncerramHoje();
                    }
                });  
            }

            //countEncerramHoje
            var countEncerramHoje = function(){
                dataMax.setDate(dataMin.getDate() + 1);
                PedidoInsercao.count({data_termino: {$gte: dataMin, $lt: dataMax}}, function(erro, count){
                    if(erro) res.status(500).json({erro: erro});               
                    else {
                        contagens.push(count);
                        countRecentes();
                    }              
                });
            }

            //countRecentes
            var countRecentes = function(){
                dataMin.setDate(dataMin.getDate() - 6);
                PedidoInsercao.count({created_at: {$gte: dataMin, $lt: dataMax}}, function(erro, count){
                    if(erro) res.status(500).json({erro: erro});               
                    else {
                        contagens.push(count);
                        countNoAr();
                    }
                });
            }

            //countNoAr
            var countNoAr = function(){
                PedidoInsercao.count({status: "No ar"}, function(erro, count){
                    if(erro) res.status(500).json({erro: erro});                
                    else {
                        contagens.push(count);
                        response();
                    }             
                });
            }            

            //função final do encadeamento
            var response = function(){
                 res.status(200).json(contagens);
            };   
            countForaDoPrazoNoAr();
        }
    };
    return PedidoInsercaoController;
};
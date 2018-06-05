module.exports = function(app){
    var Funcionario = app.models.funcionario;
    var LoginController = {
        login: function(req, res){
            var usuario = req.body;            
            Funcionario.findOne({usuario: usuario.username, senha: usuario.password}, function(erro, funcionario){
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (funcionario == null){
                    res.status(203).json({message: "Usuário ou senha não existem"});
                } else {
                    funcionario.senha = undefined;
                    res.status(202).json({success: true, funcionario : funcionario});
                }
            });       
        }
    };
    return LoginController;
};
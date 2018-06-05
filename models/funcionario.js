module.exports = function(app){
    var db = require("../config/db_connect")();
    var Schema = require("mongoose").Schema;
    var autoIncrement = require("mongoose-auto-increment");
    var utilitarios = require("../libs/utilitarios.js");

    var funcionarioSchema = new Schema({
        _id: {type: String, required: true, index: {unique: true}},
        nome: String,
        usuario: String,
        senha: String,
        email: String,
        created_at: Date,
        updated_at: Date
    });

    funcionarioSchema.methods.consultarPorId = function(_id, res, callback){
        Funcionario.findById(_id, function(erro, funcionario){
            if(erro){
                res.status(500).json({erro: erro});
            } else if (funcionario == null){
                res.status(404).json({erro: "Funcionário não encontrado"});
            } else {
                funcionario.senha = undefined;
                callback(funcionario);
            }
        });
    };

    funcionarioSchema.pre("save", function(next){
        var currentDate = utilitarios.calcularFuso(new Date());
        this.updated_at = currentDate;
        if(!this.created_at){
            this.created_at = currentDate;
        }       
        next();
    });

    funcionarioSchema.plugin(autoIncrement.plugin, {
        model:"Funcionario",
        field: "_id",
        startAt: 1
    });

    var Funcionario = db.model("Funcionario", funcionarioSchema);
    return Funcionario 
};
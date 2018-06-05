module.exports = function(app){
    var db = require('../config/db_connect')();
    var Schema = require("mongoose").Schema;
    var autoIncrement = require('mongoose-auto-increment');
    var utilitarios = require("../libs/utilitarios.js");   

    //Cria o Schema
    var clienteSchema = new Schema({
            _id: {type: String, required: true, index:{unique:true}},
            nome: String,
            endereco: String,
            cnpj: String,
            cpf: String,
            email: String,
            site: String,
            telefones:[
                {
                    numero: String,
                    tipo: String
                }
            ],        
            created_at: Date,
            updated_at: Date
    });    

    clienteSchema.methods.consultarPorId = function(_id, res, callback){
         Cliente.findById(_id, function(erro, cliente){          
                if(erro){
                    res.status(500).json({erro: erro});
                } else if (cliente == null) {
                    res.status(404).json({erro: "Cliente não encontrado!"});
                } else {
                    callback(cliente);
                }   
        });       
    };


    clienteSchema.methods.consultarTodos = function(res, callback){
        Cliente.find({}, function(erro, clientes){
            if(erro){
                res.status(500).json({erro: erro})
            } else if (clientes.length == 0){
                res.status(404).json({erro: "Nenhum cliente encontrado."});
            } else{
                callback(clientes);
            }   
        });
    };


    //Esta função é chamada sempre antes da execução do método save
    clienteSchema.pre("save", function(next){
        var currentDate = utilitarios.calcularFuso(new Date());
        this.updated_at = currentDate;
        if(!this.created_at){
            this.created_at = currentDate;
        }       
        next();
    });      

    clienteSchema.plugin(autoIncrement.plugin, {
        model: 'Cliente', 
        field: "_id",
        startAt: 1
    });

    var Cliente = db.model("Cliente", clienteSchema);
    return Cliente;
};
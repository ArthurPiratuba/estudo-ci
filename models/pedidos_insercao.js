module.exports = function(app){
    var db = require('../config/db_connect')();
    var Schema = require("mongoose").Schema;
    var autoIncrement = require('mongoose-auto-increment');
    var utilitarios = require("../libs/utilitarios.js"); 

    var pedidoInsercaoSchema = new Schema({
        _id: {type: String, required: true, index: {unique: true}},
        descricao: {type: String, required: true},
        data_inicio: {type: Date, required: true},
        data_termino: {type: Date, required: true},
        status: {type: String, required: true},
        horarios_semana: {
            dom: [String],
            seg: [String],
            ter: [String],
            qua: [String],
            qui: [String],
            sex: [String],
            sab: [String]
        },
        cliente_id: {type: Number, ref: "Cliente", required: true},
        funcionario_id: {type: Number, ref: "Funcionario", required: true},
        cliente: Object,
        funcionario: Object,
        created_at: Date,
        updated_at: Date
    }); 

    pedidoInsercaoSchema.pre("save", function(next){
        var currentDate = utilitarios.calcularFuso(new Date());
        this.updated_at = currentDate;
        if(!this.created_at){
            this.created_at = currentDate;
        }
        next();
    });

    pedidoInsercaoSchema.plugin(autoIncrement.plugin, {
        model: "PedidoInsercao",
        field: "_id",
        startAt: 1
    });

    return db.model("PedidoInsercao", pedidoInsercaoSchema);
};
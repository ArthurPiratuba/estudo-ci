module.exports = function(app){

    var cliente = app.controllers.cliente;

    app.get("/clientes", cliente.consultarTodos);
    app.get("/clientes/:_id", cliente.consultarPorId);
    app.post("/clientes", cliente.cadastrar);
    app.put("/clientes", cliente.alterar);
};
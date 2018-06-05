module.exports = function(app){

    var funcionario = app.controllers.funcionario;

    app.get("/funcionarios", funcionario.consultarTodos);
    app.get("/funcionarios/:_id", funcionario.consultarPorId);
    app.post("/funcionarios", funcionario.cadastrar);
    app.put("/funcionarios", funcionario.alterar);
};
module.exports = function(app){
    var LoginController = app.controllers.login;
    app.post("/login", LoginController.login);
};
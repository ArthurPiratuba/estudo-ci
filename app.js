var express = require('express');
var app = express();                              
var morgan = require('morgan');                  //Registra Requisições no console
var bodyParser = require('body-parser');         //formata informações em POST para JSON
var methodOverride = require('method-override'); //simulate DELETE and PUT (express4)
var load = require('express-load');


app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

load('models')
  .then('controllers')
  .then('routes')
  .into(app)
;


//Inicializa o sistema na porta especificada;
app.listen(process.env.PORT || 8081, function(){
    //console.log("App listening at " + process.env.PORT + " port");
    console.log("App listening at 5000 port");
});




module.exports = app;
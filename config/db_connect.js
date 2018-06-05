var mongoose = require('mongoose');
var single_connection;
var autoIncrement = require('mongoose-auto-increment');


module.exports = function() {
  var url = "mongodb://arthur:aq1sw2DE#@ds050189.mlab.com:50189/pedidos_insercao";
  //var url = "mongodb://localhost/pedidos_insercao";

  if(!single_connection) {
    single_connection = mongoose.connect(url);
    mongoose.Promise = require('bluebird');
    autoIncrement.initialize(single_connection); 

    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + url);
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });



    });








  }
  return single_connection;
};

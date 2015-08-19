//set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose'); //Definición del modelo
var port     = process.env.PORT || 8080;
var database = require('./config/database'); //Base de datos

//Configuración

mongoose.connect(database.url); //Conexión con la base de datos

app.configure(function() {
  app.use(express.static(__dirname + '/public')); //Localización de los archivos estáticos p.e /public/img --> /img
  app.use(express.logger('dev')); //Muestra un log de todos los request en la consola
  app.use(express.bodyParser());
  app.use(express.methodOverride());  
});

//Routes de la API
require('./app/routes.js')(app);

//Escucha en el puerto 8080 y corre el servidor con node server.js
app.listen(port);
console.log('Escuchando en el puerto http://localhost:' + port)

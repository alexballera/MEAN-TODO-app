//set up
var express         = require('express');
var app             = express();
var mongoose        = require('mongoose'); //Definición del modelo
var port            = process.env.PORT || 8080;
var database        = require('./config/database'); //Base de datos
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

//Configuración

mongoose.connect(database.url); //Conexión con la base de datos


app.use(express.static(__dirname + '/public')); //Localización de los archivos estáticos p.e /public/img --> /img
app.use(morgan('dev')); //Muestra un log de todos los request en la consola
app.use(bodyParser.urlencoded({'extended':true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Routes de la API
require('./app/routes.js')(app);

//Escucha en el puerto 8080 y corre el servidor con node server.js
app.listen(port);
console.log('Escuchando en el puerto http://localhost:' + port)

//Routes de la API

var Todo = require('./models/todo');

module.exports = function(app) {

  //GET de todos los TODOs
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err) 
        {
          res.send(err)
        }
        res.json(todos);
    });
  });

  // POST que crea un TODO y devuelve todos los TODOs
  app.post('/api/todos', function(req, res) {
    Todo.create({
      text  : req.body.text,
      done  : false
    }, function(err, todo) {
      if (err) 
        {
          res.send(err);
        }
      Todo.find(function(err, todos) {
        if (err) {
          res.send(err);
        }
        res.json(todos);
      });

    });
  });

  // DELETE un TODO y devuelve todos los TODOs
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err) 
        {
          res.send(err);
        }
      Todo.find(function(err, todos) {
        if (err) 
          {
            res.send(err)
          }
          res.json(todos);
      });
    });
  });

  //APP HTML donde irá nuestra SPA: Angular Manejará el Frontend
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
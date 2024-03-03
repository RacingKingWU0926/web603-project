module.exports = function(app) {
  var users = require('../controllers/user.controllers.js');

  app.post('/api/users/new', users.createUser);
  app.get('/api/users/:id', users.getUser);
  app.get('/api/users/', users.listUsers);
  app.put('/api/users/:id', users.updateUser);
  app.delete('/api/users/:id', users.deleteUser);
}

// routes.js
var express = require('express');
var router = express.Router();

// TEST ROUTES
router.get('/', function(req, res) {
   res.send("Hello World!");
});
router.get('/hello', function(req, res) {
   res.send("Hello World!");
});

//email route
var EmailCtrl = require('./email/mailCtrl');

router.post('/email', EmailCtrl.sendEmail);

// User routes
var UserController = require('./user/UserController');

router.route('/users')
  .get(UserController.getAllUsers)
  .post(UserController.addUser);

router.route('/users/:id')
  .get(UserController.findById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

// Check "Quiniela" route
var quinielaCtrl = require('./quinielas/quinielaController');

router.get('/quiniela', quinielaCtrl.leerFicheroQuiniela);

// Export routes
module.exports = router;

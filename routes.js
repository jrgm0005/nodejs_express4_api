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

// User routes
var UserController = require('./user/UserController');

router.route('/users')
  .get(UserController.getAllUsers)
  .post(UserController.addUser);

router.route('/users/:id')
  .get(UserController.findById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

// Export routes
module.exports = router;

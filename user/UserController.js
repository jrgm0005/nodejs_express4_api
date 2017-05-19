// UserController.js
var User = require('./User');

// GET - Get all users
exports.getAllUsers = function(req, res) {
    User.find({}, function (err, users){
        console.log('GET /users');
        if(err) return res.status(500).send("There is a problem finding users. " + err.message);
        res.status(200).jsonp(users);
    })
};

// GET - Get a user with specified ID
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There is a problem finding the user. " + err.message);

        console.log('GET /users/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

// POST - Insert a new User in the DB
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });

    user.save(function(err, user) {
        if(err) return res.status(500).send("There is a problem saving the user. " + err.message);
        res.status(200).jsonp(user);
    });
};

// PUT - Update a register already exists
exports.updateUser = function(req, res) {
    console.log('PUT');
    console.log(req.body);

    User.findById(req.params.id, function(err, user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err) {
            if(err) return res.status(500).send("There is a problem updating the user. " + err.message);
            res.status(200).jsonp(user);
        });
    });
};

// DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
    console.log('DELETE');
    console.log(req.params.id);

    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if(err) return res.status(500).send("There is a problem deleting the user. " + err.message);
            res.status(200).send("user deleted: " + req.params.id);
        })
    });
};

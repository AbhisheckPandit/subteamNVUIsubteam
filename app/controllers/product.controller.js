const Customer = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  let User = require('../models/user');

  // Register Form
  router.post('/registration', function(req, res){
    res.render('register');
  });
  
  // Register user
  router.post('/registration', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
   
  
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    
  
    let errors = req.validationErrors();
  
    if(errors){
      res.render('register', {
        errors:errors
      });
    } else {
      let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
      });
  
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function(err){
            if(err){
              console.log(err);
              return;
            } else {
              req.flash('success','You are now registered and can log in');
              res.redirect('/users/login');
            }
          });
        });
      });
    }
  });
  
  // Login Form
  router.get('/login', function(req, res){
    res.render('login');
  });
  
  // Login user
  router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  
// Retrieve all products from the database.
exports.findAll = (req, res) => {
  product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId
        });
      }
    } else res.send(data);
  });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  product.updateById(
    req.params.productId,
    new product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.productId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete product with id " + req.params.productId
        });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};

// Delete all product from the database.
exports.deleteAll = (req, res) => {
  product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};

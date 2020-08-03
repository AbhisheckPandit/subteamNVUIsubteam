


const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

const config = require('./config/database');

//create connection
const db=mysql.createConnection({
  host : 'localhost',
  user : 'root'
  password : '123456'
  database : 'nodesql'

});

//Connect
db.connect((err)=> {
if(err){
  throw err;
}
console.log('my sql connected');
})

// create table
app.get('/createtable',(req,res)=> {
  let sql='CREATE TABLE user(name VARCHAR(100) NOT null,Email VARCHAR(255) NOT null,password INT NOT NULL AUTO_INCREMENT,PRIMARY Key(password))';
  let sql1='CREATE TABLE Product (product -INT NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL,imgUrl VARCHAR(255) NOT NULL,Price VARCHAR(255) NOT NULL,price INT NOT NULL AUTO_INCREMENT,quantities INT NOT NULL AUTO_INCREMENT,primary key(prouductid)';

  
});


// Bring in Models
let Article = require('./models/article');
]
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Home Route
app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title:'Articles',
        articles: articles
      });
    }
  });
});

// Route Files
let product = require('./routes/products');
let users = require('./routes/users');
app.use('/articles', products);
app.use('/users', users);

// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});






module.exports = app => {
  const products = require("../controllers/product.controller.js");
//new user registration
 app.post("/registration",user.registration);
 //login user
 app.post("/login",user.login);
  // Add a new product
  app.put("/products", products.create);

  // Retrieve all products
  app.get("/products", product.findAll);

  // Retrieve a single Product with ProductId
  app.get("/product/:productId", Product.findOne);

  // modify a product with productId
  app.put("/product/:productId", product.update);

  // Delete a product with productId
  app.delete("/product/:productId", products.delete);

  

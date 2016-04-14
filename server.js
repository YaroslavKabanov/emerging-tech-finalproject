process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport')

var db = mongoose();
var app = express();
var passport = passport();


module.exports = app;

app.listen(3000);
console.log('Server Running at localhost:3000/');
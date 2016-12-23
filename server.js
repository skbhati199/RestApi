var express = require("express");
var app = express();
var port = process.env.PORT || 8081;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');


var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database');

// Configuration ==================
mongoose.connect(configDB.url);

// pass passport for configuration
require('./config/passport')(passport); 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// required for passport

require('./app/routes.js')(app,passport);

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.listen(port);
console.log('The magic happen on port', + port);




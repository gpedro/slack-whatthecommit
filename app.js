var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', require('./slack'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next({
      code: 404,
      message: 'Not Found'
    });
  });

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        message: err.message,
        error: err.code
    });
  });

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

// Import the mongoose module
var mongoose = require('mongoose');
//Set up deafautl mongoose connection
var mongoDB = 'mongodb://127.0.0.1/EMD';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event(to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.on('open', function(){ // Stream
    console.log("Conexão ao MongoDB realizada com sucesso...")
})


var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(404).json({erro: err, mensagem: "Pedido não suportado."})
});

module.exports = app;

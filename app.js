(function () {
  'use strict';
  const express = require('express'),
    app = express(),
    path = require('path'),
    config = require('./lib/config').initialize(),
    homeController = require('./routes/homeController').initialize(express);
  let server;
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', homeController);
  app.use('*', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  };
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  app.set('port', process.env.PORT || config.developmentPort);
  server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
}());
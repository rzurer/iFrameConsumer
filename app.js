(function () {
  'use strict';
  const express = require('express'),
    app = express(),
    path = require('path'),
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
  app.set('port', process.env.PORT || 6500);
  server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
}());
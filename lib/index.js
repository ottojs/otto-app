
'use strict';

// Modules
var async    = require('async');
var express  = require('express');
var socketio = require('socket.io');
var config   = require('otto-config');
var response = require('otto-response');

// Export App
module.exports = function (options) {

  if (!options) { options = {}; }

  // New Express App
  var app = express();

  // TODO: Add configuration options
  // Add WebSockets
  var io = socketio();
  app.socketio = io;

  // Global Settings
  config.global(app, process.env, options);

  // TODO: Add configuration option
  // Serve static files before the routes
  if (options.static) {
    app.use(express.static(options.static));
  }

  // Remove Header X-Powered-By
  app.disable('x-powered-by');

  // Ensure req.locals exists
  app.use(function (req, res, next) {
    if (!req.locals) { req.locals = {}; }
    next();
  });

  // Attach Routes Asynchronously
  if (options.routes) {
    if (!Array.isArray(options.routes)) { return new Error('options.routes needs to be an Array'); }
    async.mapSeries(options.routes, function (route, done) {
      route(app, done);
    }, function (error) {

      // Catch-All Route (Not Found)
      app.use(response.not_found);

      // Error Handler
      app.use(response.failure);

    });
  }

  return app;

};

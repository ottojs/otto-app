
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

  // Add WebSockets
  app.socketio = socketio();

  // Global Settings
  config.global(app, process.env, options);

  // Serve static files before the routes
  if (options.static) {
    app.use(express.static(options.static));
  }

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

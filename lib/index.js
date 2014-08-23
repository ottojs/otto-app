
'use strict';

// Modules
var express       = require('express');
var socketio      = require('socket.io');
var config        = require('otto-config');
var error_handler = require('otto-error-handler');

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
  // app.use(express.static(__dirname + '/../public')));

  // Attach Routes
  if (options.routes) {
    if (!Array.isArray(options.routes)) { return new Error('options.routes needs to be an Array'); }
    for (var i = 0; i < options.routes.length; i++) {
      options.routes[i] (app);
    }
  }

  // Handle Errors
  error_handler(app);

  return app;

};

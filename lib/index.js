
'use strict';

// Modules
var express  = require('express');
var socketio = require('socket.io');
var config   = require('otto-config');

function otto () {

  // New Express App
  var app = express();

  // TODO: Add configuration options
  // Add WebSockets
  var io = socketio();
  app.socketio = io;

  // Global Settings
  config.global(app, process.env);

  // TODO: Add configuration option
  // Serve static files before the routes
  // app.use(express.static(__dirname + '/../public')));

  return app;

}

// Export App
module.exports = otto;

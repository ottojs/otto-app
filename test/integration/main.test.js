
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/index.js');

describe('Module', function () {

  it('should be a function', function () {
    subject.should.be.type('function');
  });

  it('should return an Express app object', function () {
    subject().should.have.property('get').and.be.type('function');
  });

  it('should return an error when routes is not an array', function () {
    var error = subject({ routes : {} });
    error.should.have.property('name').and.equal('Error');
    error.should.have.property('message').and.equal('options.routes needs to be an Array');
  });

  it('should attach array of routes', function () {
    subject({
      routes : [
        function (app, done) { done(); },
        function (app, done) { done(); }
      ]
    }).should.have.property('get').and.be.type('function');
  });

});

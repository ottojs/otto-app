
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

});

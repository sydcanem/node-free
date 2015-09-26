'use strict';

const assert = require('assert');
const memory = require('./');

describe('Output', function () {
  it('Expect a number', function () {
    assert.equal(typeof memory.free(), 'number');
    assert.equal(typeof memory.total(), 'number');
    assert.equal(typeof memory.used(), 'number');
  });
});

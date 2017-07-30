'use strict'

const assert = require('assert')
const path = require('path')

const determiner = require(path.join(__dirname, '..', 'lib', 'determiners', 'if.js'))

describe('if', function () {
  it('should return true if userRoles contains any of the roles in roles', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: ['foo']
    }
    assert.equal(true, determiner.shouldRender(input))
  })
  it('should return false if userRoles does not contain any of the roles in roles', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: ['baz']
    }
    assert.equal(false, determiner.shouldRender(input))
  })
  it('should return true if userRoles contains all of the roles in roles and mode is all', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: ['foo', 'bar'],
      mode: 'all'
    }
    assert.equal(true, determiner.shouldRender(input))
  })
  it('should return true if userRoles contains all of the roles in roles (and more) and mode is all', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: ['foo', 'bar', 'baz'],
      mode: 'all'
    }
    assert.equal(true, determiner.shouldRender(input))
  })
  it('should return false if userRoles does not contain all of the roles in roles and mode is all', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: ['foo'],
      mode: 'all'
    }
    assert.equal(false, determiner.shouldRender(input))
  })
  it('should return false if userRoles does not contain any of the roles in roles and mode is all', function () {
    const input = {
      roles: ['foo', 'bar'],
      userRoles: [],
      mode: 'all'
    }
    assert.equal(false, determiner.shouldRender(input))
  })
  it('should return true if userRoles does not contain a role in not', function () {
    const input = {
      not: ['foo', 'bar'],
      userRoles: ['baz']
    }
    assert.equal(true, determiner.shouldRender(input))
  })
  it('should return false if userRoles contains a role in not', function () {
    const input = {
      not: ['foo', 'bar'],
      userRoles: ['foo']
    }
    assert.equal(false, determiner.shouldRender(input))
  })
})
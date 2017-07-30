'use strict'

const _ = require('lodash')

module.exports.shouldRender = function (input) {
  let shouldRender = false
  const {roles, userRoles, not} = input
  if (!userRoles) {
    throw new Error('haa:roles: `userRoles` attribute must be set')
  }
  if (!roles && !not) {
    throw new Error('haa:roles: either the `roles` attribute must be set or the `not` attribute must be set')
  }
  if (roles && userRoles) {
    const intersection = _.intersection(roles, userRoles)
    const any = intersection.length >= 1
    const all = intersection.length === roles.length
    const mode = input.mode || 'any'
    switch (mode) {
      case 'any':
        shouldRender = any
        break
      case 'all':
        shouldRender = all
        break
    }
  }
  if (input.not) {
    shouldRender = !_.intersection(userRoles, input.not).length > 0
  }
  return shouldRender
}
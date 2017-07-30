'use strict'

const path = require('path')

const determiner = require(path.join(__dirname, 'determiners', 'if'))

module.exports.render = function (input, out) {
  const shouldRender = determiner.shouldRender(input)
  shouldRender && input.renderBody(out)
}
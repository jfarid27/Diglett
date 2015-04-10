var init = require('./init.js')
    parser = require('./Parser.js')

var Diglett = init()
    .parser(parser)

module.exports = Diglett

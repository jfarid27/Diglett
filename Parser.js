var events = require('events'),
    util = require('util')

function Parser(_regex){
/*Returns Parser closure.

  Arguments:
  regex (optional) -- a regex to test parse strings on
*/ 

    var _regex = _regex

    var exports = function(parse_string){

        if (!_regex || !parse_string){
            return null
        }

        var output = _regex.parse(parse_string)

        if (!output){
            return null
        }

        return output

    }

    exports.regex = function(){
    /*Getter setter for the regex parse_strings will be matched on

      Arguments:
      regex (optional) -- a regex string to test parse strings on
    */
        if (arguments.length > 0){
            _regex = arguments[0]
            return exports
        }
        return _regex
    }

    return exports

}

function AsyncParser(regex){
/*Returns Async Parser

  Registered Events:
  updateRegex
  parseString

  Emits:
  parsedString
  updateRegexOk
  error

  Arguments:
  regex (optional) -- a regex string to test parse strings on

*/

    var self = this
    events.EventEmitter.call(self)

    var parser = Parser(regex)

    self.on('updateRegex', function(params, callback){
    /*Event to update AsyncParser regex. 

      Emits:
      Emits updateRegexOk if params.regex is not undefined.
      Emits error otherwise.
 
      Callback:
      Returns true in callback if params.regex is not undefined.
      Otherwise false.
    */

        if (!params || !params.regex){
            self.emit('error', {
                message: "ParserEmitter error: Parameter Error.\n" + 
                "params: " + params + "\n", 
                time: new Date()
            })
            callback ? callback(false) : null
            return
        }

        parser.regex(params.regex)
        self.emit('updateRegexOk')
        callback ? callback(true) : null

    })

    self.on('parseString', function(params, callback){
    /*Event to test string with defined regex. 

      Emits:
      Emits parsedString if regex and params.parseString is not undefined.
      Emits error otherwise. 

      Callback:
      Returns response in callback if regex and params.parseString is 
      not undefined. Otherwise false.
    */

        if (!params || !parser.regex() || !params.parseString){
            self.emit('error', {
                message: "ParserEmitter error: Parameter Error.\n" + 
                "parser.regex: " + parser.regex() + "\n" + 
                "params: " + params + "\n", 
                time: new Date()
            })
            callback ? callback(false) : null
            return
        }
        var parsedString = parser(params.parseString)

        self.emit('parsedString', {parsedString: parsedString})
        callback ? callback({parsedString: parsedString}) : null

    })


}
util.inherits(AsyncParser, events.EventEmitter)

module.exports = {
   'sync': Parser,
   'async': AsyncParser,
}

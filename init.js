function Diglett(){

    var _parsingModule
    var exports = function(){

    }


    exports.parser = function(){
        if(arguments.length > 0){
            _parsingModule = arguments[0]
            return exports
        }
        return _parsingModule
    }

    return exports

}

module.exports = Diglett

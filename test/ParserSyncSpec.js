var Parser = require('./../Parser.js'), 
    should = require('should')

describe('Parser Module', function(){

    describe('sync version', function(){

        var parser 
        beforeEach(function(){
            parser = Parser.sync()

        })
        describe('regex method', function(){

            var expected, output

            beforeEach(function(){
                expected = 'foo'
                parser.regex(expected)
                output = parser.regex()
            })

            it('should get/set internal regex with arguments', function(){
                should(output).eql(expected)
            })

        })

        describe('when ran', function(){
            describe('before a regex test is set', function(){
                describe('with an argument', function(){

                    var output, testArg

                    beforeEach(function(){
                        testArg = 'foo'
                        output = parser(testArg)
                    })
                    it('should return null', function(){
                        should(output).not.be.ok
                    })
                })
                describe('without an argument', function(){
                    it('should return null', function(){

                        var output

                        beforeEach(function(){
                            output = parser()
                        })
                        it('should return null', function(){
                            should(output).not.be.ok
                        })

                    })
                })

            })
            describe('after a regex test is set', function(){
                describe('with an argument', function(){

                    var output, testArg, testRegex, observedArg,
                        expected

                    beforeEach(function(){

                        expected = 'bar'

                        testArg = 'foo'

                        testRegex = {
                            'parse': function(arg){
                                observedArg = arg
                                return 'bar'
                            }
                        }

                        parser.regex(testRegex)

                        output = parser(testArg)
                    })

                    it('should call parse method on regex with given string', function(){

                        should(observedArg).eql(testArg)

                    })
                    it('should return output of parse', function(){
                        should(output).eql(expected)
                    })
                })
                describe('without an argument', function(){
                    var output, testArg, testRegex, observedArg,
                        expected

                    beforeEach(function(){

                        testRegex = {
                            'parse': function(arg){
                                observedArg = arg
                                return 'bar'
                            }
                        }

                        parser.regex(testRegex)

                        output = parser()
                    })
                    it('should return null', function(){
                        should(output).not.be.ok
                    })
                })

            })

        })


    })

})

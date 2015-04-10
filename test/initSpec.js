var Diglett = require('./../init.js'),
    should = require('should')

describe('Diglett module', function(){

    describe('on instantiation', function(){

        var mockParser, Dugtrio
        beforeEach(function(){

            mockParser = {
                'sync': function(){
                    return 'foo'
                },
                'async': function(){
                    return 'bar'
                }
            }
            Dugtrio = Diglett()
                .parser(mockParser)
        })

        describe('the parsing module', function(){

            var parsingModule
            beforeEach(function(){

                parsingModule = Dugtrio.parser()

            })

            describe('synchrous property', function(){

                var output, expected
                beforeEach(function(){
                    output = parsingModule.sync()
                    expected = 'foo'
                })

                it('should be defined as the given synchronous parsing module', function(){
                    should(output).eql(expected)
                })
            })
            describe('asynchrous property', function(){
                var output, expected
                beforeEach(function(){
                    output = parsingModule.async()
                    expected = 'bar'
                })
                it('should be defined as the given asynchronous parsing module', function(){
                    should(output).eql(expected)
                })
            })

        })

    })

})

var Parser = require('./../Parser.js'), 
    should = require('should')

describe('Parser Module', function(){

    describe('async version', function(){

        var parserEmitter
        beforeEach(function(){
            parserEmitter = new Parser.async()
        })

        describe('on parseString event', function(){

            describe('if regex was previously set', function(){ 

                beforeEach(function(){

                    parserEmitter.emit('updateRegex', {'regex': 'foo'})

                })

                describe('if not given params', function(){

                    it('should emit error', function(done){
                        parserEmitter.on('error', function(){
                            done()
                        })

                        parserEmitter.emit('updateRegex')

                    })
                    it('should call callback with false', function(done){
                        var cb = function(input){
                            should(input).be.false
                            done()
                        }

                        parserEmitter.on('error', function(){
                            done()
                        })

                        parserEmitter.emit('updateRegex')
                    })

                })
                describe('if given params', function(){

                    var testParams

                    describe('with no parseString property', function(){

                        beforeEach(function(){

                            testParams = {}

                        })
                        it('should emit error', function(done){
                            parserEmitter.on('error', function(){
                                done()
                            })

                            parserEmitter.emit('updateRegex', testParams)

                        })
                        it('should call callback with false', function(done){
                            var cb = function(input){
                                should(input).be.false
                                done()
                            }

                            parserEmitter.on('error', function(){
                                done()
                            })

                            parserEmitter.emit('updateRegex', testParams)
                        })


                    })

                    describe('with valid parseString property', function(){

                        var testParams, expectedArg, expectedOut
                        beforeEach(function(){
                            testParams = {'parseString': 'foo'}
                            expectedArg = 'foo'
                            expectedOut = 'bar'
                        })

                        it('should apply parseString to regex parse method',function(done){
                            var testRegex = { 
                                'parse': function(arg){
                                    should(arg).eql(expectedArg)
                                    done() 
                                }
                            }
                            parserEmitter
                                .emit('updateRegex', {'regex': testRegex})

                            parserEmitter.emit('parseString', testParams)

                        })
                        it('should emit parsedString', function(done){
                            var testRegex = { 
                                'parse': function(arg){
                                    return 'bar'
                                }
                            }
                            parserEmitter
                                .emit('updateRegex', {'regex': testRegex})

                            parserEmitter.on('parsedString', function(event){
                                should(event.parsedString).eql(expectedOut)
                                done()

                            })

                            parserEmitter.emit('parseString', testParams)

                        })

                        it('should emit parsedString event', function(done){
                            var testRegex = { 
                                'parse': function(arg){
                                    return 'bar'
                                }
                            }
                            parserEmitter
                                .emit('updateRegex', {'regex': testRegex})

                            var cb = function(event){
                                should(event.parsedString).eql(expectedOut)
                                done()
                            }

                            parserEmitter.emit('parseString', testParams, cb)


                        })

                    })

                })
            })

            describe('if regex was not previously set', function(){

                var testparams
                beforeEach(function(){
                    testParams = {}
                })

                it('should emit error', function(done){
                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex', testParams)

                })
                it('should call given callback with false', function(done){
                    var cb = function(input){
                        should(input).be.false
                        done()
                    }

                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex', testParams)
                })

                

            })

        })

        describe('on updateRegex event', function(){

            describe('if given params.regex', function(){

                var testParams

                beforeEach(function(){
                    testParams = {'regex': 'foo'}
                }) 
                it('should emit updateRegexOk', function(done){

                    parserEmitter.on('updateRegexOk', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex', testParams)

                })
                it('should call callback with true', function(done){
                    var cb = function(input){
                        should(input).be.true
                        done()
                    }
                    
                    parserEmitter.emit('updateRegex', testParams, cb)
                })

            })

            describe('if not given params.regex', function(){

                var testParams
                beforeEach(function(){
                    testParams = {}
                })

                it('should emit error', function(done){
                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex', testParams)

                })
                it('should call given callback with false', function(done){
                    var cb = function(input){
                        should(input).be.false
                        done()
                    }

                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex', testParams)
                })
            })

            describe('if not given any params', function(){
                it('should emit error', function(done){
                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex')

                })
                it('should call given callback with false', function(done){
                    var cb = function(input){
                        should(input).be.false
                        done()
                    }

                    parserEmitter.on('error', function(){
                        done()
                    })

                    parserEmitter.emit('updateRegex')
                })

            })

        })

    })

})

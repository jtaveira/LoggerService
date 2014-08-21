evoke('odin.logger', [
    'LoggerEnum'
,   'loggerBuffer'
,   'logger'
]

,   function(ns){

    describe('Unit: Testing Controllers', function(){

        var logger
        ,   loggerBuffer
        ,   enums 

        var countVar
        ,   errorVar
        ,   groupVar
        ,   groupCollapsedVar
        ,   infoVar
        ,   logVar
        ,   profileVar
        ,   timeMap
        ,   timeVar
        ,   timeEndVar
        ,   traceVar
        ,   warnVar
        ,   httpBackend
        ,   $rootScope
        ,   createController
        ,   authRequestHandler

        beforeEach(function(){
            
            logger       = ns.i.logger
            loggerBuffer = ns.i.loggerBuffer
            enums        = ns.i.LoggerEnum

            countVar          = 0
            errorVar          = []
            groupVar          = []
            groupCollapsedVar = []
            infoVar           = []
            logVar            = []
            profileVar        = ""
            profileCountVar   = 0
            timeMap           = {}
            timeVar           = ""
            timeEndVar        = ""
            traceVar          = {}
            warnVar           = []

            window.console.clear = function (){

                errorVar          = []
                groupVar          = []
                groupCollapsedVar = []
                infoVar           = []
                logVar            = []
                warnVar           = []
            }

            window.console.count = function (label){

                countVar++
            }

            window.console.error = function (value){

                errorVar.push(value)
            }

            window.console.group = function (value){

                groupVar.push(value)
            }

            window.console.groupCollapsed = function (value){

                groupCollapsedVar.push(value)
            }

            window.console.groupEnd = function (){

                groupVar = []
                groupCollapsedVar = []
            }

            window.console.info = function (value){

                infoVar.push(value)
            }

            window.console.log = function (value){

                logVar.push(value)
            }

            window.console.profile = function (label){

                profileVar = label
                profileCountVar++
            }

            window.console.profileEnd = function(){

                profileVar = ""
                profileCountVar = 0
            }

            window.console.time = function(label){

                if(timeMap[label] == undefined){

                    timeMap[label] = (new Date).getTime()
                    timeVar = label + " : timer started!"
                }
            }

            window.console.timeEnd = function(label){

                if(timeMap[label] != undefined){

                    timeEndVar = label + " : " + ((new Date).getTime() - timeMap[label]) + " ms!"
                    timeMap[label] = undefined
                    delete timeMap[label]
                }
            }

            window.console.warn = function (value){

                warnVar.push(value)
            }
        })

        it('should contain a silent Logger', function() {
              
            logger.silentMode()         
            expect(logger.mode).toBe(enums.MODE.SILENT)
        })

        it('should contain a noisy Logger', function() {
              
            logger.noisyMode()
            expect(logger.mode).toBe(enums.MODE.NOISY)
        })

        it('should contain a silent Logger with component type', function() {
              
            logger.switchLogType(enums.LOGTYPE.COMPONENT)
            expect(logger.logType).toBe(enums.LOGTYPE.COMPONENT)
        })

        it('should contain a silent Logger with Source type', function() {
              
              logger.switchLogType(enums.LOGTYPE.SOURCE)
              expect(logger.logType).toBe(enums.LOGTYPE.SOURCE)
        })

        it('should contain a silent Logger with Performance type', function() {
              
            logger.switchLogType(enums.LOGTYPE.PERFORMANCE)
            expect(logger.logType).toBe(enums.LOGTYPE.PERFORMANCE)
        })

        it('should contain a silent Logger with component type', function() {
              
            logger.switchLogType("foo") //Should not be possible, thus keeping the default value
            expect(logger.logType).toBe(enums.LOGTYPE.COMPONENT)
        })

        it('should contain a noisy Logger with component type', function() {
              
            logger.noisyMode()

            logger.switchLogType(enums.LOGTYPE.COMPONENT)
            expect(logger.logType).toBe(enums.LOGTYPE.COMPONENT)
            expect("component Mode testing enabled!").toBe(logVar[0])
        })

        it('should contain a noisy Logger with Source type', function() {
              
            logger.noisyMode()

            logger.switchLogType(enums.LOGTYPE.SOURCE)
            expect(logger.logType).toBe(enums.LOGTYPE.SOURCE)
            expect("source Mode testing enabled!").toBe(logVar[0])
        })

        it('should contain a noisy Logger with Performance type', function() {
              
            logger.noisyMode()

            logger.switchLogType(enums.LOGTYPE.PERFORMANCE)
            expect(logger.logType).toBe(enums.LOGTYPE.PERFORMANCE)
            expect("performance Mode testing enabled!").toBe(logVar[0])
        })

        it('should contain a silent Logger log', function() {
            
            logger.silentMode()

            logger.log("test.test","component", 2, 3)
            expect().toBe(logVar[0])
            expect(loggerBuffer.bufferLogs[0].msg).toBe("2 3")
        })

        it('should contain a silent Logger info', function() {
            
            logger.silentMode()

            logger.info("test.test","component", 2, 3)
            expect().toBe(logVar[0])
            expect(loggerBuffer.bufferLogs[0].msg).toBe("2 3")
        })

        it('should contain a silent Logger warn', function() {
            
            logger.silentMode()

            logger.warn("test.test","component", 2, 3)
            expect().toBe(logVar[0])
            expect(loggerBuffer.bufferLogs[0].msg).toBe("2 3")
        })

        it('should contain a silent Logger error', function() {
            
            logger.silentMode()

            logger.error("test.test","component", 2, 3) 
            expect().toBe(logVar[0])
            expect(loggerBuffer.bufferLogs[0].msg).toBe("2 3")
        })

        it('should contain a silent Logger time & timeEnd', function() {

            logger.silentMode()

            logger.time("test.test","component","Test Timer")
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Test Timer : timer started!")

            logger.time("test.test","component","Test Timer")
            expect(loggerBuffer.bufferLogs[1].msg).toBe("Test Timer : timer has already been initialized!")

            logger.timeEnd("test.test","component","Test Timer")
            expect(timeEndVar).toBe(timeEndVar)

            logger.timeEnd("test.test","component","Testimer")
            expect(loggerBuffer.bufferLogs[3].msg).toBe("Testimer : timer has not been initialized!") 
        })

        it('should contain a silent Logger trace', function() {
            
            logger.silentMode()

            logger.trace("test.test", "component")
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Stack")
        })

        it('should contain a noisy Logger log & clear', function() {
            
            logger.noisyMode()

            logger.log("test.test","component",1)
            expect(1).toBe(logVar[0])

            logger.clear()
            expect().toBe(logVar[0])
        })

        it('should contain a noisy Logger count', function() {
            
            logger.noisyMode()

            logger.count("test.test","component", "Foo")
            expect(countVar).toBe(1)

            logger.count("test.test","component", "Foo")
            expect(countVar).toBe(2)

            logger.count("test.test","component", "Foo")
            expect(countVar).toBe(3)

            logger.component.count("test.test", "Foo")
            expect(countVar).toBe(4)
        })

        it('should contain a noisy Logger error', function() {

            logger.noisyMode()

            logger.error("test.test","component", "Foo")
            expect("Foo").toBe(errorVar[0])

            logger.component.error("test.test", "Foo")
            expect("Foo").toBe(errorVar[1])
        })

        it('should contain a noisy Logger group', function() {
            
            logger.noisyMode()

            logger.group("test.test","component",1)
            expect(1).toBe(groupVar[0])

            logger.component.group("test.test",1)
            expect(1).toBe(groupVar[1])
        })

        it('should contain a noisy Logger groupCollapsed', function() {
            
            logger.noisyMode()

            logger.groupCollapsed("test.test","component",1)
            expect(1).toBe(groupCollapsedVar[0])

            logger.component.groupCollapsed("test.test",1)
            expect(1).toBe(groupCollapsedVar[0])
        })

        it('should contain a noisy Logger groupEnd', function() {
            
            logger.noisyMode()

            logger.groupCollapsed("test.test","component",1)
            expect(1).toBe(groupCollapsedVar[0])

            logger.group("test.test","component",1)
            expect(1).toBe(groupVar[0])

            logger.groupEnd("test.test","component")
            expect().toBe(groupVar[0])
            expect().toBe(groupCollapsedVar[0])

            logger.groupCollapsed("test.test","component",1)
            expect(1).toBe(groupCollapsedVar[0])

            logger.group("test.test","component",1)
            expect(1).toBe(groupVar[0])

            logger.component.groupEnd("test.test")
            expect().toBe(groupVar[0])
            expect().toBe(groupCollapsedVar[0])
        })

        it('should contain a noisy Logger info', function() {
            
            logger.noisyMode()

            logger.info("test.test","component",1)
            expect(1).toBe(infoVar[0])

            logger.component.info("test.test",1)
            expect(1).toBe(infoVar[1])
        })

        it('should contain a noisy Logger log', function() {
            
            logger.noisyMode()

            logger.component.log("test.test", "Foo")
            //logger.log("test.test","component", "Foo")
            expect("Foo").toBe(logVar[0])
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Foo")
        })

        it('should contain a noisy Logger profile', function() {
            
            logger.noisyMode()

            logger.profile("test.test","component","oh yeah")
            expect(1).toBe(profileCountVar)

            logger.profile("test.test","component","double yeah")
            expect(2).toBe(profileCountVar)

            logger.component.profile("test.test","rtiple yeah")
            expect(3).toBe(profileCountVar)
        })

        it('should contain a noisy Logger profileEnd', function() {
            
            logger.noisyMode()

            logger.profile("test.test","component","oh yeah")
            expect(1).toBe(profileCountVar)

            logger.profileEnd("test.test","component")
            expect(0).toBe(profileCountVar)


            logger.component.profile("test.test","component","oh yeah")
            expect(1).toBe(profileCountVar)

            logger.component.profileEnd("test.test")
            expect(0).toBe(profileCountVar)
        })

        it('should contain a noisy Logger time & timeEnd', function() {
            
            logger.noisyMode()

            logger.time("test.test","component","Test Timer")
            expect("Test Timer : timer started!").toBe(timeVar)
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Test Timer : timer started!")

            logger.component.time("test.test","Test Timer")
            expect(loggerBuffer.bufferLogs[1].msg).toBe("Test Timer : timer has already been initialized!")

            logger.timeEnd("test.test","component","Test Timer")
            expect(loggerBuffer.bufferLogs[2].msg).toBe(timeEndVar)

            logger.component.timeEnd("test.test","Testimer")
            expect(loggerBuffer.bufferLogs[3].msg).toBe("Testimer : timer has not been initialized!")  
        })

        it('should contain a noisy Logger trace', function() {
            
            logger.noisyMode()

            logger.trace("test.test", "component")
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Stack")

            logger.component.trace("test.test")
            expect(loggerBuffer.bufferLogs[1].msg).toBe("Stack")
        })

        it('should contain a noisy Logger warn', function() {
            
            logger.noisyMode()

            logger.warn("test.test","component",1)
            expect(1).toBe(warnVar[0])

            logger.component.warn("test.test",1)
            expect(1).toBe(warnVar[1])
        })

        it('should contain a noisy Logger logId', function() {
            
            logger.noisyMode()

            logger.switchLogId("test.test")

            logger.warn("test.test","component",1)
            expect(1).toBe(warnVar[0])

            logger.warn("beta.test","component",1)
            expect().toBe(warnVar[1])

            logger.switchLogId(undefined)

            logger.warn("beta.test","component",1)
            expect(1).toBe(warnVar[1])
        })

        it('should contain a buffer and buffer logs', function() {

            loggerBuffer._setBufferLimit(1)
            
            expect(0).toBe(loggerBuffer.bufferLogs.length)

            logger.time("test.test","component","Test Timer")
            expect(loggerBuffer.bufferLogs[0].msg).toBe("Test Timer : timer started!")

            expect(1).toBe(loggerBuffer.bufferLogs.length)

            logger.time("test.test","component","Test Timer")
            expect(loggerBuffer.bufferLogs[1]).toBe()

            logger.setLoggerBufferLimit(10)
            expect(1).toBe(loggerBuffer.bufferLogs.length)

            logger.time("test.test","component","Test Timer")
            logger.time("test.test","component","Test Timer")

            logger.noisyMode()

            logger.time("test.test","component","Test Timer")
            logger.time("test.test","component","Test Timer")

            expect(5).toBe(loggerBuffer.bufferLogs.length)

            expect(loggerBuffer._setBufferLimit(1)).toBe(false)
            expect(10).toBe(loggerBuffer.bufferLimit)
            
        })

        it('should contain a battery of tests all together', function() {
          
            logger.noisyMode()

            logger.error("test.test","component", "E-Foo")
            expect("E-Foo").toBe(errorVar[0])

            logger.error("test.test","component", "E-Doo")
            expect("E-Doo").toBe(errorVar[1])

            logger.error("test.test","component", "E-Goo")
            expect("E-Goo").toBe(errorVar[2])

            logger.info("test.test","component", "I-Foo")
            expect("I-Foo").toBe(infoVar[0])

            logger.info("test.test","component", "I-Doo")
            expect("I-Doo").toBe(infoVar[1])

            logger.info("test.test","component", "I-Goo")
            expect("I-Goo").toBe(infoVar[2])

            logger.info("test.test","source", "I-Hoo")
            expect().toBe(infoVar[3])

            logger.switchLogType("source")

            logger.switchLogId("beta.alpha")

            logger.info("beta.alpha","component", "I-Hoo")
            expect().toBe(infoVar[3])

            logger.info("test.test","source", "I-Hoo")
            expect().toBe(infoVar[3])

            logger.info("beta.alpha","source", "I-Hoo")
            expect("I-Hoo").toBe(infoVar[3])

            logger.switchLogType("component")

            logger.switchLogId(undefined)

            logger.group("test.test","component", "G-Foo")
            expect("G-Foo").toBe(groupVar[0])

            logger.group("test.test","component", "G-Doo")
            expect("G-Doo").toBe(groupVar[1])

            logger.group("test.test","component", "G-Goo")
            expect("G-Goo").toBe(groupVar[2])

            logger.groupCollapsed("test.test","component", "GC-Foo")
            expect("GC-Foo").toBe(groupCollapsedVar[0])

            logger.groupCollapsed("test.test","component", "GC-Doo")
            expect("GC-Doo").toBe(groupCollapsedVar[1])

            logger.groupCollapsed("test.test","component", "GC-Goo")
            expect("GC-Goo").toBe(groupCollapsedVar[2])

            logger.log("test.test","component", "L-Foo")
            expect("L-Foo").toBe(logVar[4])

            logger.log("test.test","component", "L-Doo")
            expect("L-Doo").toBe(logVar[5])

            logger.log("test.test","component", "L-Goo")
            expect("L-Goo").toBe(logVar[6])

            logger.warn("test.test","component", "W-Foo")
            expect("W-Foo").toBe(warnVar[0])

            logger.warn("test.test","component", "W-Doo")
            expect("W-Doo").toBe(warnVar[1])

            logger.warn("test.test","component", "W-Goo")
            expect("W-Goo").toBe(warnVar[2])

            logger.clear()

            expect().toBe(errorVar[0])
            expect().toBe(errorVar[1])
            expect().toBe(errorVar[2])

            expect().toBe(infoVar[0])
            expect().toBe(infoVar[1])
            expect().toBe(infoVar[2])
            expect().toBe(infoVar[3])

            expect().toBe(groupVar[0])
            expect().toBe(groupVar[1])
            expect().toBe(groupVar[2])

            expect().toBe(groupCollapsedVar[0])
            expect().toBe(groupCollapsedVar[1])
            expect().toBe(groupCollapsedVar[2])

            expect().toBe(logVar[0])
            expect().toBe(logVar[1])
            expect().toBe(logVar[2])
            expect().toBe(logVar[3])
            expect().toBe(logVar[4])
            expect().toBe(logVar[5])
            expect().toBe(logVar[6])

            expect().toBe(warnVar[0])
            expect().toBe(warnVar[1])
            expect().toBe(warnVar[2])
        })
    })
})
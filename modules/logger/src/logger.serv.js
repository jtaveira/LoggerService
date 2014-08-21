angular.module("odin.logger")

.constant('LoggerEnum', Object.freeze({

    MODE : {
        SILENT : "silent"
    ,   NOISY  : "noisy"
    }

,   LOGTYPE : {
        COMPONENT   : "component"
    ,   SOURCE      : "source"
    ,   PERFORMANCE : "performance"
    }
}))

.factory("logger", [

    "LoggerEnum"
,   "loggerBuffer"

,   function(LoggerEnum, loggerBuffer){

    function Logger(){

        this.mode    = LoggerEnum.MODE.SILENT
        this.logType = LoggerEnum.LOGTYPE.COMPONENT
        this.logId   = undefined
    }

    Logger.prototype = {

        constructor : Logger

    ,   silentMode : function(){

            this.mode = LoggerEnum.MODE.SILENT
        }

    ,   noisyMode : function(){

            this.mode = LoggerEnum.MODE.NOISY
        }

    ,   setLoggerBufferLimit : function(limit){

            loggerBuffer._setBufferLimit(limit)
        }

    ,   switchLogType : function(logType){

            if(logType == "component" 
            || logType == "source" 
            || logType == "performance")
                this.logType = logType

            else
                return

            // istanbul ignore else
            if(this.mode == LoggerEnum.MODE.NOISY)
                console.log(this.logType + " Mode testing enabled!")
        }

    ,   switchLogId : function(logId){

            this.logId = logId

            // istanbul ignore else
            if(this.mode == LoggerEnum.MODE.NOISY)
                console.log(this.logId + " Id testing enabled!")
        }

    ,   isValid : function(logId, type){

            return type == this.logType && (this.logId == undefined || logId == this.logId)
        }

    ,   clear : function(){

            // istanbul ignore else
            if(this.mode == LoggerEnum.MODE.NOISY)
                console.clear()
            return this
        }

    ,   count : function(logId, type, label){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.count(label)
            return this
        }

    ,   error : function(){

            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.error.apply(console, arguments.slice(2))

            loggerBuffer._addToBuffer({
                status  : "Error"
            ,   date    : new Date()
            ,   type    : type
            ,   id      : logId
            ,   msg     : arguments.slice(2).join(" ")
            })

            return this
        }

    ,   group : function(){

            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.group.apply(console, arguments.slice(2))
            return this
        }

    ,   groupCollapsed : function(){

            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.groupCollapsed.apply(console, arguments.slice(2))
            return this
        }

    ,   groupEnd : function(logId, type){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.groupEnd()
            return this
        }

    ,   info : function(){

            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.info.apply(console, arguments.slice(2))

            loggerBuffer._addToBuffer({
                status  : "Info"
            ,   date    : new Date()
            ,   type    : type
            ,   id      : logId
            ,   msg     : arguments.slice(2).join(" ")
            })

            return this
        }

    ,   log : function(){
            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.log.apply(console, arguments.slice(2))

            loggerBuffer._addToBuffer({
                status  : "Log"
            ,   date    : new Date()
            ,   type    : type
            ,   id      : logId
            ,   msg     : arguments.slice(2).join(" ")
            })

            return this
        }

    ,   profile : function(logId, type, label){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.profile(label)
            return this
        }

    ,   profileEnd : function(logId, type){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.profileEnd()
            return this
        }

    ,   time : function(logId, type, label){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.time(label)

            if(loggerBuffer.timeMap[label] == undefined){

                loggerBuffer.timeMap[label] = (new Date).getTime()
                loggerBuffer._addToBuffer({
                    status  : "Time"
                ,   date    : new Date()
                ,   type    : type
                ,   id      : logId
                ,   msg     : label + " : timer started!"
                })
            }

            else
                loggerBuffer._addToBuffer({
                    status  : "Time"
                ,   date    : new Date()
                ,   type    : type
                ,   id      : logId
                ,   msg     : label + " : timer has already been initialized!"
                })

            return this
        }

    ,   timeEnd : function(logId, type, label){

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.timeEnd(label)

            if(loggerBuffer.timeMap[label] != undefined){
                loggerBuffer._addToBuffer({
                    status  : "TimeEnd"
                ,   date    : new Date()
                ,   type    : type
                ,   id      : logId
                ,   msg     : label + " : " + ((new Date).getTime() - loggerBuffer.timeMap[label]) + " ms!"
                })

                loggerBuffer.timeMap[label] = undefined
            }

            else
                loggerBuffer._addToBuffer({
                    status  : "TimeEnd"
                ,   date    : new Date()
                ,   type    : type
                ,   id      : logId
                ,   msg     : label + " : timer has not been initialized!"
                })

            return this
        }

    ,   trace : function(logId, type){

            var getStackTrace = function() {
                var object = {}
                Error.captureStackTrace(object, getStackTrace)
                return object.stack
            }

            loggerBuffer._addToBuffer({
                status  : "Trace"
            ,   date    : new Date()
            ,   type    : type
            ,   id      : logId
            ,   msg     : getStackTrace()
            })

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.trace()
            return this
        }

    ,   warn : function(){

            var arguments = Array.prototype.slice.call(arguments, 0)
            var logId     = arguments[0]
            var type      = arguments[1]

            // istanbul ignore else
            if(this.isValid(logId, type) && this.mode == LoggerEnum.MODE.NOISY)
                console.warn.apply(console, arguments.slice(2))

            loggerBuffer._addToBuffer({
                status  : "Warning"
            ,   date    : new Date()
            ,   type    : type
            ,   id      : logId
            ,   msg     : arguments.slice(2).join(" ")
            })

            return this
        }
    }

    var logger = new Logger()

    for(var key in LoggerEnum.LOGTYPE){

        (function(_ns){

            Logger.prototype[_ns] = {

                count : function(logId, label){

                    logger.count(logId, _ns, label)
                }

            ,   error : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.error.apply(logger, arguments)
                }

            ,   group : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.group.apply(logger, arguments)
                }

            ,   groupCollapsed : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.groupCollapsed.apply(logger, arguments)
                }

            ,   groupEnd : function(logId){

                    logger.groupEnd(logId, _ns)
                }

            ,   info : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.info.apply(logger, arguments)
                }

            ,   log : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.log.apply(logger, arguments)
                }

            ,   profile : function(logId, label){

                    logger.profile(logId, _ns, label)
                }

            ,   profileEnd : function(logId){

                    logger.profileEnd(logId, _ns)
                }

            ,   time : function(logId, label){

                    logger.time(logId, _ns, label)
                }

            ,   timeEnd : function(logId, label){

                    logger.timeEnd(logId, _ns, label)
                }

            ,   trace : function(logId){

                    logger.trace(logId, _ns)
                }

            ,   warn : function(){

                    var arguments = Array.prototype.slice.call(arguments, 0)
                    arguments.splice(1, 0, _ns)
                    Logger.prototype.warn.apply(logger, arguments)
                }   
            }
        })(key.toLowerCase())
    }

    window.logger     = logger
    window.silentMode = logger.silentMode.bind(logger)
    window.noisyMode  = logger.noisyMode.bind(logger)

    // istanbul ignore next
    window.onbeforeunload = function(){

        loggerBuffer._flushBuffer()
    }

    return logger
}])

.factory("loggerBuffer", [

    "$http" 

,   function($http){

    function LoggerBuffer(){

        this.bufferLimit = 100
        this.bufferLogs  = []
        this.timeMap     = {}
    }

    LoggerBuffer.prototype = {
 
        constructor : LoggerBuffer

    ,   _addToBuffer : function(input){

            // istanbul ignore else
            if(this.bufferLogs.length < this.bufferLimit)
                this.bufferLogs.push(input)

            // istanbul ignore else
            if(this.bufferLogs.length == this.bufferLimit)
                this._flushBuffer()

            return true
        }

    ,   _setBufferLimit : function(limit){

            // istanbul ignore else
            if(limit <= 0 || limit <= this.bufferLogs.length)
                return false

            this.bufferLimit = limit
            return true 
        }

    ,   _cleanBuffer : function(){

            this.bufferLogs = []
            return true
        }

    ,   _flushBuffer : function(){

            var model = this

            $http.post('/api/log', this.bufferLogs)

            .success(function(data) {

                //TODO Post to a server
                model._cleanBuffer()
            })
        }   
    }

    return new LoggerBuffer()
}])
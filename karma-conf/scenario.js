if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

Error.captureStackTrace = function(obj, val) {

  obj.stack = "Stack"
  return obj
}

function mapInject(map){

    map = map || []
    map = map.concat([
        '$timeout'
    ,   '$httpBackend'
    ,   '$injector'
    ,   '$controller'
    ,   '$rootScope'
    ])

    var deps = {}
    for(key in map) {

        inject([map[key], function(dep){

            deps[map[key]] = dep
        }])
    }

    return deps
}

var __evokeId = 0
function evoke(modulename, arg1, arg2){

    var deps = []
    ,   callback = angular.noop

    switch(arguments.length) {

        case 2:
            callback = arg1
            break;

        case 3:
            deps = arg1
            callback = arg2
            break;
    }

    describe(['Module', modulename].join(' '), function(ns){

        var ns = {i : {}}

        beforeEach(function(){

            var id = "evoke_" + (++__evokeId)

            angular.module(id, [modulename])

            module(id)
            ns.i = mapInject(deps)

        })

        callback(ns)
    })
}
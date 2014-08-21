
angular.module("odin.logger")

.controller("index", function($scope, logger){

    $scope.noisyButton = function(){

        logger.noisyMode()
    }

    $scope.logButton = function(){

        logger.component.log("test", 1, 2, 3)
    }

    $scope.warnButton = function(){

        logger.component.warn("test", 1, 2, 3)
    }

    $scope.infoButton = function(){

        logger.component.info("test", 1, 2, 3)
    }

    $scope.errorButton = function(){

        logger.component.error("test", 1, 2, 3)
    }

    $scope.timeButton = function(){

        logger.component.time("test", "Button")
    }

    $scope.timeEndButton = function(){

        logger.component.timeEnd("test", "Button")
    }
})
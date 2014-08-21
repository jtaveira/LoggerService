
angular.module("odin.logger")

.controller("MainController", function($scope, logger){
    $scope.inputFirstName = "";
    $scope.inputLastName = "";
    $scope.loggerValue = "Enable";

    $scope.userButton = function(){

    	if($scope.inputFirstName == "" || $scope.inputLastName == ""){
    		alert("One or more fields are empty!");

    		if(loggerEnabled()){
	    		console.warn("One or more fields are empty!");
	    	}
    	}

    	else{
    		alert("User added successfully!");
    		newUser = ObjectFactory($scope.inputFirstName, $scope.inputLastName);

    		if(loggerEnabled()){
	    		console.log("User added successfully!");
	    		console.log("User number " + index + " created. Name: " + firstName + " " + lastName + "!")
	    	}

    		cleanNameValues();
    	}
    }

    $scope.loggerButton = function(){
        
    	if($scope.loggerValue == "Enable"){
    		$scope.loggerValue = "Disable";
    	}

    	else if($scope.loggerValue == "Disable"){
    		$scope.loggerValue = "Enable";
    	}

    	if(loggerEnabled()){
    		console.log("Console log is now operational!");
    	}

    	else{
    		console.log("Console log is disabled!");
    	}	
    }

	cleanNameValues = function(){
		$scope.inputFirstName = "";
    	$scope.inputLastName = "";

    	if(loggerEnabled()){
    		console.log("Fields are now empty!");
    	}
	}

	loggerEnabled = function(){
		if($scope.loggerValue == "Disable"){
			return true;
		}

		else{
			return false;
		}
	}

    

});
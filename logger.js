var index = 0;

function SampleClass(firstName, lastName){

	this.firstName = firstName;
	this.lastName = lastName;
	this.index = index;
	index++;

}

function ObjectFactory(firstName, lastName){

	var testObject = SampleClass(firstName, lastName);

	return testObject;

}

function logger(sampleObject) {

	
    
}

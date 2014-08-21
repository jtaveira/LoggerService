The Logger Service
==================

### Brief Description ###

The Logger Service will take console log testing a step further. You will be able to filter all of your tests and send all the resulting test information to a database, meaning you can keep track of all your testing logs.

### How to use ###

The Logger class has 2 possible modes, the silent(default) mode and the noisy mode. Whatever the mode may be, the resulting test logs will always be sent to your database. However, if the mode is set as noisy, all the testing done, may appear in your browser console. In order to see the information in your browser console, you will need to choose the logType, which can have 1 of 3 of possible types:

  * component (default)
  * source
  * performance

There is also a second layer of filtering which is the logId (undefined as default). The logId can be whatever value the user wants. If the logId remains unchanged, the program will only take into account the logType. On the other hand, both logType and logId must match in order for the test to show on the console.

You may now be wondering why is all this filtering needed. Simple. If you have a lot of test, which is a normal thing, you would flood the console with logs and you would have to filter them yourself, which can sometimes be boring and hard to spot the logs your desire.

With that in mind, let's proceed to the actual usage of the program.

This can be done either directly in the browser's console or hardcoded. There are many commands available, and all of them can be seen simply by opening up the console and typing: 'Logger.'.
This will show all methods avaible. Anyway, here is a list with a simple definition:

  > * 
  > * 
  > * 

![LoggerService tree for better understanding.](http://i.imgur.com/VSH4ncg.jpg "LoggerTree")






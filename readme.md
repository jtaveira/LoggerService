The Logger Service
==================

### Brief Description ###

The Logger Service will take console log testing a step further. You will be able to filter all of your logs and send all the resulting log information to a database, meaning you can keep track of all your testing logs.

### How to use & How it works ###

The Logger class has 2 possible modes, the silent(default) mode and the noisy mode. Whatever the mode may be, the resulting test logs will always be sent to your database. However, if the mode is set as noisy, all the testing done, may appear in your browser console. In order to see the information in your browser console, you will need to choose the logType, which can have 1 of 3 of possible types:

  * component (default)
  * source
  * performance

Note that if you wish to tamper with the source code, and for some reason you want to add more logTypes, just add in the enum.LOGTYPE and the methods for that logType will automatically be available.

There is also a second layer of filtering which is the logId (undefined as default). The logId can be whatever value the user wants. If the logId remains unchanged, the program will only take into account the logType. On the other hand, both logType and logId must match in order for the test to show on the console.

You may now be wondering why is all this filtering needed. Simple. If you have a lot of test, which is a normal thing, you would flood the console with logs and you would have to filter them yourself, which can sometimes be boring and hard to spot the logs your desire.

With that in mind, let's proceed to the actual usage of the program.

This can be done either directly in the browser's console or hardcoded. There are many commands available, and all of them can be seen simply by opening up the console and typing: 'logger.'.
This will show all methods avaible. Anyway, here is a list with a simple definition (logger.):

  * ```silentMode()``` : Turns the mode to silent
  * ```noisyMode()``` : Turns the mode to noisy
  * ```setLoggerBufferLimit(limit)``` : Changes the ammount of logs to save in memory
  * ```switchLogType(logType)``` : Changes the logType to logType if it exists
  * ```switchLogId(logId)``` : Changes the logId to logId

The following functions do the same as the console functions:

  * ```clear()```
  * ```count(logId, type, label)``` or ```type.count(logId, label)```
  * ```error(logId, type, args[])``` or ```type.error(logId, args[])```
  * ```group(logId, type, args[])``` or ```type.group(logId, args[])```
  * ```groupCollapsed(logId, type, args[])``` or ```type.groupCollapsed(logId, args[])```
  * ```groupEnd(logId, type)``` or ```type.groupEnd(logId)```
  * ```info(logId, type, args[])``` or ```type.info(logId, args[])```
  * ```log(logId, type, args[])``` or ```type.log(logId, args[])```
  * ```profile(logId, type, label)``` or ```type.profile(logId, label)```
  * ```profileEnd(logId, type)``` or ```type.profileEnd(logId)```
  * ```time(logId, type, label)``` or ```type.time(logId, label)```
  * ```timeEnd(logId, type, label)``` or ```type.timeEnd(logId, label)```
  * ```trace(logId, type)``` or ```type.trace(logId)```
  * ```warn(logId, type, args[])``` or ```type.warn(logId, args[])```

Example usage:

 * ```logger.noisyMode()``` 
 * If you don't set to noisy, the console won't show you anything.
 * ```logger.log("testId", "component", "testArgument")```
 * Console : testArgument
 * ```logger.component.log("testId", "testArgument")```
 * Console : testArgument
 * For both commands the result is the same.

Regarding the logs sent to the database, there is nothing to worry about. As soon as the buffer reaches the limit, all data will be flushed to the database. But what if I accidentally close my browser before reaching the buffer limit? Nothing to worry. On closure, all data in memory will be sent to the database without taking into account the buffer size and limit, therefore there is no data loss.

### Wrapping Up ###

![LoggerService tree for better understanding.](http://i.imgur.com/VSH4ncg.jpg "LoggerTree")






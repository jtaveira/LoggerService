module.exports = function(config) {
  var conf = {
    basePath: '.',
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,
    
    files : [
      'scenario.js',
      'angular.js',
      'angular-mocks.js',
      'app.js',
      'modules/*/src/*.serv.js',
      'modules/*/spec/*.spec.js'
    ],

    preprocessors : {
      'modules/*/src/*.serv.js': ['coverage']
    },

    coverageReporter : {
      type : 'html',
      dir : 'coverage/'
    }
  }
 
  config.set(conf);
};
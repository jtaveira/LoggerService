module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        connect: {
      all: {
        options:{
          port: 9000,
          hostname: "localhost",
          // No need for keepalive anymore as watch will keep Grunt running
          //keepalive: true,
 
          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options) {
            
            console.log(options)

            return [
 
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
 
              // Serve the project folder
              connect.static(options.base[0])
            ];
          }
        }
      }
    },
 
    // grunt-regarde monitors the files and triggers livereload
    // Surprisingly, livereload complains when you try to use grunt-contrib-watch instead of grunt-regarde 
    regarde: {
      all: {
        // This'll just watch the index.html file, you could add **/*.js or **/*.css
        // to watch Javascript and CSS files too.
        files:['index.html'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
    }
    ,   karma: {
            unit: {
                configFile: 'karma.conf.js'
            ,   autoWatch: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-regarde')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-livereload')

    // Creates the `server` task
    grunt.registerTask('server',['livereload-start','connect','regarde'])

}
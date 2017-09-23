module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            all: ['package/EmberSockets.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        copy: {
            main: {
                files: [
                    { flatten: true, src: ['package/EmberSockets.js'], dest: 'dist/ember-sockets.js' }
                ]
            },
            test: {
                src: 'package/EmberSockets.js',
                dest: 'example/js/vendor/ember-sockets/ember-sockets.js'
            },
            release: {
                src: 'releases/<%= pkg.version %>.zip',
                dest: 'releases/master.zip'
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['copy']);
    grunt.registerTask('default', ['jshint', 'copy']);

};

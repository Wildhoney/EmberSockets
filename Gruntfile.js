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
        
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'package/EmberSockets.js',
                dest: 'dist/<%= pkg.name %>.min.js'
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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['uglify', 'copy']);
    grunt.registerTask('default', ['jshint', 'uglify', 'copy']);

};
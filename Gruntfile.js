module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, { scope: ['devDependencies'] });

    var txtBanner = "// For a readable version please visit my GitHub\n\n";


    // Source of all JS files to be compiled
    var srcBower = 'bower_components/',
        srcJS = [
            srcBower + 'jquery/dist/jquery.js',
            srcBower + 'jquery-waypoints/waypoints.js',
            srcBower + 'jquery.stellar/stellar.jquery.js',
            'js/*.js',
            'js/**/*.js'
        ];


    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            preCompile: ['jshint'],
            development: ['concat', 'sass:development'],
            production: ['uglify', 'sass:production'],
            watch: ['watch:sass', 'watch:concat']
        },

        watch: {
            sass: {
                files: 'sass/**/*',
                tasks: ['sass:development']
            },
            concat: {
                files: ['js/silvercreekit.js'],
                task: ['concat']
            }
        },

        concat: {
            dist: {
                src: srcJS,
                dest: 'docroot/main.js'
            }
        },

        uglify: {
            options: {
                compress: true,
                sourceMap: true,
                sourceMapName: 'js/js.map',
                banner: txtBanner
            },
            build: {
                files: { 'docroot/main.js': srcJS }
            }
        },

        sass: {
            development: {
                options: {
                    unixNewlines: true,
                    style: 'nested',
                    lineNumbers: true,
                    noCache: true,
                    banner: txtBanner
                },
                files: {
                    'docroot/main.css': 'sass/main.sass'
                }
            },
            production: {
                options: {
                    sourcemap: true,
                    unixNewlines: true,
                    style: 'compressed',
                    cacheLocation: 'sass/.cache',
                    banner: txtBanner
                },
                files: {
                    'docroot/main.css': 'sass/main.sass'
                }
            }
        },

        jshint: {
            main: {
                src: ['Gruntfile.js', 'js/*.js', 'js/**/*.js'],
            }
        }

    });


    // Task lists
    grunt.registerTask('default',
        ['concurrent:preCompile', 'concurrent:development']);

    grunt.registerTask('production',
        ['concurrent:preCompile', 'concurrent:production']);

    grunt.registerTask('watcher', ['concurrent:watch']);

};
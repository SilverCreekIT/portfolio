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
            development: ['sass:development', 'concat:css', 'concat:js'],
            production: ['htmlmin', 'uglify', 'sass:production', 'concat:css'],
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
            js: {
                dist: {
                    src: srcJS,
                    dest: 'docroot/main.js'
                }
            },
            css: {
                dist: {
                    src: [
                        srcBower + 'normalize.css/normalize.css',
                        'sass/main.css'
                    ],
                    dest: 'css/main.css'
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                caseSensitive: true,
                minifyJS: true
            },
            files: {
                'docroot/index.html': 'docroot/index.html'
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

        cssmin: {
            minify: {
                expand: true,
                src: ['css/main.css'],
                dest: 'docroot/main.css'
            }
        },

        sass: {
            development: {
                options: {
                    unixNewlines: true,
                    style: 'nested',
                    loadPath: 'sass/main',
                    noCache: true,
                    banner: txtBanner
                },
                files: {
                    'sass/main.css': 'sass/main.sass'
                }
            },
            production: {
                options: {
                    sourcemap: true,
                    unixNewlines: true,
                    style: 'compressed',
                    loadPath: 'sass/main',
                    cacheLocation: 'sass/.cache',
                    banner: txtBanner
                },
                files: {
                    'sass/main.css': 'sass/main.sass'
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
        ['concurrent:preCompile', 'concurrent:production', 'cssmin']);

    grunt.registerTask('watcher', ['concurrent:watch']);

};
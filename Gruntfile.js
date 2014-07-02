module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, { scope: ['devDependencies'] });

    var txtBanner = "// For a readable version please visit my GitHub @ " +
        "https://github.com/SilverCreekIT/portfolio\n";


    // Source of all JS files to be compiled
    var srcBower = 'bower_components/',
        srcJS = [
            srcBower + 'jquery/dist/jquery.js',
            srcBower + 'jquery-waypoints/waypoints.js',
            srcBower + 'jquery.stellar/stellar.jquery.js',
            'js/**/*.js'
        ];


    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            development: ['concat:js', 'concat:css'],
            production_0: ['htmlmin', 'sass:production'],
            production_1: ['uglify', 'cssmin'],
            watch: ['watch:sass', 'watch:concat']
        },

        watch: {
            sass: {
                files: 'sass/**/*',
                tasks: ['sass:development']
            },
            concat: {
                files: 'js/**.js',
                task: ['concat:js']
            }
        },

        concat: {
            js: {
                src: srcJS,
                dest: 'docroot/main.js'
            },
            css: {
                src: [
                    srcBower + 'normalize.css/normalize.css',
                    'sass/main.css'
                ],
                dest: 'docroot/main.css'
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
                'docroot/index.html': 'docroot/index.htm'
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
                src: [
                    srcBower + 'normalize.css/normalize.css',
                    'sass/*.css'
                ],
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
                src: ['Gruntfile.js', 'js/**/*.js'],
            }
        }

    });


    // Task lists
    grunt.registerTask('default',
        ['jshint', 'sass:development', 'concurrent:development']);

    grunt.registerTask('production',
        ['jshint', 'concurrent:production_0', 'concurrent:production:1']);

    grunt.registerTask('watcher', ['concurrent:watch']);

};
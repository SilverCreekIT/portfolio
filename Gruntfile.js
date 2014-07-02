module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, { scope: ['devDependencies'] });

    var txtBanner = "// For a readable version please visit my GitHub @ " +
        "https://github.com/SilverCreekIT/portfolio\n";


    // Source of all JS files to be compiled
    var srcBower = 'bower_components/',
        srcJs = [
            srcBower + 'jquery/dist/jquery.js',
            srcBower + 'jquery-waypoints/waypoints.js',
            srcBower + 'jquery.stellar/stellar.jquery.js',
            'js/**/*.js'
        ];


    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                src: srcJs,
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
            production: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'docroot/index.html': 'html/index.html'
                }
            }
        },

        copy: {
            development: {
                src: 'html/index.html',
                dest: 'docroot/index.html'
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
                files: { 'docroot/main.js': srcJs }
            }
        },

        cssmin: {
            compress: {
                options: {
                    expand: true,
                    banner: txtBanner
                },
                files: {
                    'docroot/main.css': 'sass/*.css'
                }
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
        ['jshint', 'sass:development', 'concat', 'copy']);

    grunt.registerTask('production',
        ['jshint', 'htmlmin', 'sass:production', 'uglify', 'cssmin']);

};

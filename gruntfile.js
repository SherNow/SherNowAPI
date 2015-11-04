'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: defaultAssets.client.views,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: defaultAssets.client.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: {
                src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e),
                options: {
                    jshintrc: true,
                    node: true,
                    mocha: true,
                    jasmine: true
                }
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/application.js': defaultAssets.client.js
                }
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': defaultAssets.client.css
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        mochaTest: {
            src: testAssets.tests.server,
            options: {
                reporter: 'spec'
            }
        },
        mocha_istanbul: {
            coverage: {
                src: testAssets.tests.server,
                options: {
                    print: 'detail',
                    coverage: true,
                    require: 'test.js',
                    coverageFolder: 'coverage',
                    reportFormats: ['cobertura', 'lcovonly'],
                    check: {
                        lines: 40,
                        statements: 40
                    }
                }
            }
        },
        copy: {
            localConfig: {
                src: 'config/env/local.example.js',
                dest: 'config/env/local.js',
                filter: function () {
                    return !fs.existsSync('config/env/local.js');
                }
            }
        }
    });

    grunt.event.on('coverage', function (lcovFileContents, done) {
        require('coveralls').handleInput(lcovFileContents, function (err) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Connect to the MongoDB instance and load the models
    grunt.task.registerTask('mongoose', 'Task that connects to the MongoDB instance and loads the application models.', function () {
        // Get the callback
        var done = this.async();

        // Use mongoose configuration
        var mongoose = require('./config/lib/mongoose.js');

        // Connect to database
        mongoose.connect(function (db) {
            done();
        });
    });

    grunt.task.registerTask('server', 'Starting the server', function () {
        // Get the callback
        var done = this.async();

        var path = require('path');
        var app = require(path.resolve('./config/lib/app'));
        var server = app.start(function () {
            done();
        });
    });

    // Lint CSS and JavaScript files.
    grunt.registerTask('lint', ['jshint']);

    // Lint project files and minify them into two production files.
    grunt.registerTask('build', ['env:dev', 'lint', 'ngAnnotate', 'uglify', 'cssmin']);

    // Run the project tests
    grunt.registerTask('test', ['env:test', 'lint', 'copy:localConfig', 'server', 'mochaTest']);
    grunt.registerTask('test:server', ['env:test', 'lint', 'server', 'mochaTest']);
    grunt.registerTask('test:client', ['env:test', 'lint', 'server']);
    // Run project coverage
    grunt.registerTask('coverage', ['env:test', 'lint', 'mocha_istanbul:coverage']);

    // Run the project in development mode
    grunt.registerTask('default', ['env:dev', 'lint', 'copy:localConfig', 'concurrent:default']);

    // Run the project in debug mode
    grunt.registerTask('debug', ['env:dev', 'lint', 'copy:localConfig', 'concurrent:debug']);

    // Run the project in production mode
    grunt.registerTask('prod', ['build', 'env:prod', 'copy:localConfig', 'concurrent:default']);
};

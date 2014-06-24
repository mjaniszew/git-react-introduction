'use strict';

module.exports = function (grunt) {
    var config = {
        libs: 'bower_components',
        src: 'src',
        tmp: '.tmp'
    };

    grunt.initConfig({
        app: config,
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            jsx: {
                files: ['<%= app.src %>/{,*/}*.js'],
                tasks: ['react']
            },
            html: {
                files: ['<%= app.src %>/{,*/}*.html'],
                tasks: ['copy:dev']
            },
            livereload: {
                options: {
                   livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app.tmp %>/{,*/}*.html',
                    '<%= app.tmp %>/js/{,*/}*.js'
                ]
            }
        },
        react: {
            files: {
                expand: true,
                cwd: '<%= app.src %>',
                src: ['{,*/}*.js'],
                dest: '<%= app.tmp %>',
                ext: '.js'
            }
        },
        jshint: {
            all: ['<%= app.tmp %>/js/{,*/}*.js']
        },
        connect: {
            options: {
                port: 1234,
                open: true,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static(config.tmp),
                            connect().use('/js', connect.static(config.libs))
                        ];
                    }
                }
            }
        },
        clean: {
            dev: '<%= app.tmp %>'
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.src %>',
                    src: '*.html',
                    dest: '<%= app.tmp %>'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'react',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:dev',
        'copy:dev',
        'react',
        'jshint'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);
};

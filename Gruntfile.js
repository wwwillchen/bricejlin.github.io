'use strict';

module.exports = function (grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            vendorcss: {
                src: ['bower_components/normalize-css/normalize.css'],
                dest: '.tmp/css/vendor-combined.css'
            },
            vendorjs: {
                src: ['bower_components/jquery/jquery.js','js/vendor/*.js'],
                dest: '.tmp/js/vendor-combined.js'
            },
            css: {
                src: ['styles/*.css'],
                dest: '.tmp/css/combined.css'
            },
            js: {
                src: ['js/*.js'],
                dest: '.tmp/js/combined.js'
            }
        },

        cssmin: {
            css: {
                src: '.tmp/css/combined.css',
                dest: 'dist/css/combined.min.css'
            },
            vendorcss: {
                src: '.tmp/css/vendor-combined.css',
                dest: 'dist/css/vendor-combined.min.css'
            }
        },

        uglify: {
            js: {
                files: {
                    'dist/js/combined.min.js' : ['.tmp/js/combined.js']
                }
            },
            vendorjs: {
                files: {
                    'dist/js/vendor-combined.min.js' : ['.tmp/js/vendor-combined.js']
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    debugInfo: true,
                    lineNumbers: true,
                },
                expand: true,
                cwd: './styles/sass',
                src: ['*.scss'],
                dest: './styles',
                ext: '.css'
            },
        },

        watch: {
            css: {
                files: ['./styles/sass/*.scss'],
                tasks: ['newer:sass:dev'],
                options: {
                    spawn: false
                }
            }
        },

        imagemin: {
            dynamics: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        }
    });

    grunt.registerTask('default', [ 'watch:css']);
    grunt.registerTask('shrink', [ 'newer:concat', 'newer:cssmin', 'newer:concat', 'newer:uglify' ]);
    grunt.registerTask('imagemin' ['newer:imagemin']);
};
'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // concat: {
        //     css: {
        //         src: ['styles/*.css'],
        //         dest: '.tmp/css/combined.css'
        //     },
        //     js: {
        //         src: ['js/*.js'],
        //         dest: '.tmp/js/combined.js'
        //     }
        // },

        // cssmin: {
        //     css: {
        //         src: '.tmp/css/combined.css',
        //         dest: 'dist/css/combined.min.css'
        //     }
        // },

        // uglify: {
        //     js: {
        //         files: {
        //             'dist/js/combined.min.js' : ['.tmp/js/combined.js']
        //         }
        //     }
        // },

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
                tasks: ['sass:dev'],
                options: {
                    spawn: false
                }
            }
        },

        useminPrepare: {
            options: {
                root: 'bricelinPortfolio',
                dest: 'dist',
            },
            html: '_layouts/default.html'
        },

        usemin: {
            options: {
                assetsDirs: 'dist'
            },
            html: ['dist/index.html'],
            css: ['dist/css/*.css']
        }

        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: {

        //         }
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [ 'watch:css']);
    grunt.registerTask('shrink', [ 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js' ]);
    grunt.registerTask('use', ['useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
};
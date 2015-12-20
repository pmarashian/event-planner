module.exports = function ( grunt ) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    var config = require('./config.grunt.js');

    grunt.initConfig({

        copy: {
            index: {
                files: [
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html',
                        cwd: '.',
                        expand: false
                    }
                ]
            }

        },

        concat: {
            vendorjs: {
                src: config.vendors.js,
                dest: 'temp/vendors.js'
            },
            appjs: {
                src: 'src/app/**/*.js',
                dest: 'temp/app.js'
            },
            buildjs: {
                src: [
                    'temp/vendors.js',
                    'temp/app.js'
                    ],
                dest: 'build/build.js'
            },
            vendorcss: {
                src: [
                    config.vendors.css
                ],
                dest: 'temp/vendors.css'
            },
            buildcss: {
                src: ['temp/vendors.css', 'temp/app.css'],
                dest: 'build/build.css'
            }
        },

        clean: ['temp'],

        less: {
            build: {
                files: {
                    'temp/app.css': 'src/less/main.less'
                }
            }
        }

    });

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', [
        'concat:vendorjs',
        'concat:appjs',
        'concat:buildjs',
        'less:build',
        'concat:vendorcss',
        'concat:buildcss',
        'clean',
        'copy:index'
    ]);




};
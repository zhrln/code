module.exports = function (grunt) {

    // 加载所有grunt模块
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["build/*","release/*"],
        copy : {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            '**/icon*.png',
                            '**/index.html',
                            '**/manifest.json'
                        ],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        uglify: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.js'],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.css'
                    ],
                    dest: 'build/'
                }]
            }
        },
        compress: {
            main: {
                options: {
                    archive: function () {
                        return 'release/latest.zip'
                    },
                    mode: 'zip'
                },
                files: [
                    {expand: true, cwd: 'build/', src: ['**'], dest: ''}
                ]
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy', 'uglify', 'cssmin', 'compress']);
};

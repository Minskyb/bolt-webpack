/**
 * Created by ASUS on 2016/5/19.
 */

module.exports = function(grunt){

    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),
        clean:{
            dist:'bolt/dist',
            build:'dist'
        },
        concat:{
            dist:{
                src:[
                    'bolt/js/**/*.js'
                ],
                dest:'bolt/dist/js/bolt.js'
            }
        },
        uglify:{
            dist:{
                src:'bolt/dist/js/bolt.js',
                dest:'bolt/dist/js/bolt.min.js'
            }
        },
        less:{
            dist:{
                options:{
                    strictMan:true,
                    sourceMap:true,
                    outputSourceFiles:true,
                    sourceMapURL:'bolt.css.map',
                    sourceMapFilename:'bolt/dist/css/bolt.css.map'
                },
                src:'bolt/less/bolt.less',
                dest:'bolt/dist/css/bolt.css'
            }
        },
        cssmin:{
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            dist:{
                src:'bolt/dist/css/bolt.css',
                dest:'bolt/dist/css/bolt.min.css'
            }
        },
        watch:{
            dist:{
                files:[
                    'bolt/less/**/*.less',
                    'bolt/js/**/*.js'
                ],
                tasks:['default']
            }
        },
        copy:{
            fonts:{
                expand:true,
                cwd:'bolt/fonts/',
                src:'**/*.*',
                dest:'bolt/dist/fonts'
            },
            dist:{
                expand:true,
                cwd:'bolt/dist/',
                src:'**/*.*',
                dest:'src/libs/bolt'
            },
            libs:{
                expand:true,
                cwd:'src/libs',
                src:'**/*.*',
                dest:'dist/libs'
            },
            image:{
                expand:true,
                cwd:'src/images',
                src:'**/*.*',
                dest:'dist/images'
            },
            html:{
                expand:true,
                cwd:'src',
                src:'*.html',
                dest:'dist'
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default',[
        'clean:dist',
        'concat:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'copy:fonts',
        'copy:dist',
        'watch'
    ]);

    grunt.registerTask('build',[
        'clean',
        'concat:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'copy',
    ]);
}
/**
 * Created by ASUS on 2016/5/19.
 */

module.exports = function(grunt){

    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),
        clean:{
            dist:'src/bolt/dist',
            build:'dist'
        },
        concat:{
            dist:{
                src:[
                    'src/bolt/js/**/*.js'
                ],
                dest:'src/bolt/dist/js/bolt.js'
            }
        },
        uglify:{
            dist:{
                src:'src/bolt/dist/js/bolt.js',
                dest:'src/bolt/dist/js/bolt.min.js'
            }
        },
        less:{
            dist:{
                options:{
                    strictMan:true,
                    sourceMap:true,
                    outputSourceFiles:true,
                    sourceMapURL:'bolt.css.map',
                    sourceMapFilename:'src/bolt/dist/css/bolt.css.map'
                },
                src:'src/bolt/less/bolt.less',
                dest:'src/bolt/dist/css/bolt.css'
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
                src:'src/bolt/dist/css/bolt.css',
                dest:'src/bolt/dist/css/bolt.min.css'
            }
        },
        watch:{
            dist:{
                files:[
                    'src/bolt/less/**/*.less',
                    'src/bolt/js/**/*.js'
                ],
                tasks:['default']
            }
        },
        copy:{
            dist:{
                expand:true,
                cwd:'src/bolt/dist/',
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
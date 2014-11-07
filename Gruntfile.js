module.exports = function(grunt) {

    "use strict";

    var fs = require('fs'), pkginfo = grunt.file.readJSON("package.json"), bower = grunt.file.readJSON("bower.json"), currentYear = new Date();

    grunt.initConfig({

        pkg: pkginfo,

        bower: bower,

        year: currentYear.getFullYear(),

        meta: {
            banner: "/*! <%= pkg.title %> <%= pkg.version %> | <%= pkg.homepage %> | (c) <%= year %> Secure Storage Solutions | by <%= bower.authors %> | MIT License */"
        },

        less: (function(){

            var lessconf = {
                "app": {
                    options: { paths: ["assets/less"], cleancss: true },
                    files: { "assets/css/app.css": ["assets/less/app.less"] }
                }
            }


            return lessconf;
        })(),

        copy: {
            modernizr: {
                files: [{ src: ["bower_components/modernizr/modernizr.js"], dest: "assets/js/libs/modernizr.js" }]
            }
        },

        // cachebreaker: {
        //     js: {
        //         options: {
        //             match: ['assets/js/app.min.js'],
        //             replacement: 'md5',
        //             src: {
        //                 path: 'assets/js/app.min.js'
        //             }
        //         },
        //         files: {
        //             src: ['index.html']
        //         }
        //     },
        //     css: {
        //         options: {
        //             match: ['assets/css/app.min.css'],
        //             replacement: 'md5',
        //             src: {
        //                 path: 'assets/css/app.min.css'
        //             }
        //         },
        //         files: {
        //             src: ['index.html']
        //         }
        //     }
        // },

        concat: {
            dist: {
                options: {
                    separator: "\n\n"
                },
                src: [
                    // jQuery
                    // "assets/js/vendor/log.js",
                    // "assets/js/lib/navigation-button.js",
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/bootstrap/dist/bootstrap.min.js",
                    "assets/js/app.js"
                ],
                dest: "assets/js/app-compiled.js"
            }
        },


        uglify: {
            distmin: {
                options: {
                    banner: "<%= meta.banner %>\n"
                },
                files: {
                    "assets/js/libs/modernizr.js": ["assets/js/modernizr.min.js"],
                    "assets/js/app.min.js": ["assets/js/app-compiled.js"]
                }
            }
        },

        cssmin: {
          add_banner: {
            options: {
              banner: "<%= meta.banner %>\n"
            },
            files: {
              'assets/css/app.min.css': ['assets/css/app.css']
            }
          }
        },

        watch: {
            grunt: {
                options: {
                    reload: true
                },
                files: ['Gruntfile.js']
            },
            src: {
                files: ["*.less", "assets/less/**/*.less","assets/js/app.js"],
                tasks: ["copy", "less", "concat", "uglify", "cssmin"]
            }
        }

    });



    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks("grunt-banner");
    //grunt.loadNpmTasks("grunt-cache-breaker");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Register grunt tasks
    grunt.registerTask("default", ["watch"]);
    //grunt.registerTask("cachebreaker", ["cachebreaker"]);
};

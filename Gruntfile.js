module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        nodewebkit: {
            options: {
                build_dir: './node-webkit', // build location
                mac: true, //  mac32
                win: false, //  win32
                linux32: false, // linux32
                linux64: false // linux64
            },
            src: ['./app/build/**'] // Your app
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: false,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {}
            },
            test: {
                src: ['app/js/*.js']
            }
        },
        sass: {
            dist: {
                files: {
                    'app/build/app.css': 'app/sass/app.scss'
                }
            }
        },
        copy: {
          configs: {
            files: [
              // includes files within path
              {expand: true,flatten: true, src: ['app/config/*'], dest: 'app/build', filter: 'isFile'},
            ]
          }
        },
        shell: {
            preview: {
                options: {
                    stdout: true
                },
                command: 'mv ./node-webkit/releases/nwfaketop/mac/** ./'
            }
        },
        watch: {
            app: {
                files: './app/**/**',
                tasks: [
                    'jade',
                    'sass',
                    'jshint',
                    'uglify',
                    'copy:configs',
                    'nodewebkit',
                    'clean:build',
                    'shell:preview',
                    'clean:tmp',
                    'notify:success'
                ]
            },
             builds: {
                files: './releases/*',
                tasks: ['clean']
            }
        },
        clean: {
          build: ["./nwfaketop.app/"],
          tmp: ["./app/build"],
        },
        jade: {
          no_options: {
            src: ['app/jade/*.jade'],
            dest: 'app/build',
            options: {
              client: false
            }
          }
        },
        notify: {
            error: {
              options: {
                    title: 'ERROR!',  
                    message: 'Check Console!', 
                }
            },
            success: {
              options: {
                    title: 'SUCCESS!',  
                    message: 'Sucessful Build!', 
                }
            }
        },
      uglify: {
        app_files: {
          files: {
            'app/build/app.js': ['app/js/app.js']
          }
        }
      }
    });
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');   
    grunt.loadNpmTasks('grunt-notify'); 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task.
    grunt.registerTask('default', [
        'jade',
        'sass',
        'jshint',
        'uglify',
        'copy:configs',
        'nodewebkit',
        'clean:build',
        'shell:preview',
        'clean:tmp',
        'notify:success',
        'watch'
    ]);
};

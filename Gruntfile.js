var configFile = require('./nwconfig');
var pkg = require('./app/config/package.json');

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        nodewebkit: {
            options: configFile,
            src: ['./app/build/**'] // Your app
        },
        jshint: {
          options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
          },
            test: {
                src: ['app/js/*.js']
            },
            gruntFile: {
                src: ['./Gruntfile.js']
            }
        },
        copy: {
          configs: {
            files: [
                // includes files within path
                {
                    expand: true,
                    flatten: true,
                    src: ['app/config/*'],
                    dest: 'app/build',
                    filter: 'isFile'
                },
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
                    'jshint',
                    'uglify',
                    'copy:configs',
                    'nodewebkit',
                    'clean:build',
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

    // Default task.
    grunt.registerTask('default', [
        'jade',
        'jshint',
        'uglify',
        'copy:configs',
        'nodewebkit',
        'clean:build',
        'clean:tmp',
        'notify:success',
        'watch'
    ]);
    grunt.registerTask('test', [
        'jshint:gruntFile'
    ]);
};

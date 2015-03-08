module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // WATCH THESE FILES AND RUN
    // TASKS WHEN CHANGED
    watch: {
        options: {
          livereload: true,
        },
        uglify_watch: {
            files: ['js/javascript.js'],
            tasks: ['uglify'],
            options: {
              livereload: true,
              spawn: false,
            },
        },
        sass_watch: {
          files: ['stylesheets/main.scss', 'stylesheets/partials/*.scss', 'stylesheets/vendor/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true
          },
        },
        cssconcat_watch: {
            files: ['style.css', 'css/*.css'],
            tasks: ['concat'],
            options: {
              livereload: true,
            },
        },
        cssmin_watch: {
            files: ['css/concat.css'],
            tasks: ['cssmin'],
            options: {
              livereload: true,
            },
        },
        html_watch: {
            files: ['index.php', '*.php'],
            options: {
              livereload: true,
            },
        },
    },
    // BELOW ARE THE TASKS TO BE RUN
    sass: {
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'css/style.css':'stylesheets/main.scss'
          }
        }
      },
    uglify: {
      build: {
        src: ['js/javascript.js'], // source files mask
            dest: 'js/build/',    // destination folder
            expand: true,    // allow dynamic building
            flatten: true,   // remove all unnecessary nesting
            ext: '.min.js'   // replace .js to .min.js
        }
      },
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: ['css/normalize.css', 'css/foundation.css', 'style.css'],
          dest: 'css/concat.css',
        },
      },
      cssmin: {
          my_target: {
              src: ['css/concat.css'],
              dest: 'css/build/style.min.css'
          }
        }
  });

  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');



  // Default task(s).
  grunt.registerTask('default', ['watch','uglify', 'sass', 'concat', 'cssmin']);

};
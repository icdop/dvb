(function() {
'use strict';

  var gulp = require('gulp');
  var nodemon = require('gulp-nodemon');
  var watch = require('gulp-watch');
  var jshint = require('gulp-jshint');
//var livereload = require('gulp-livereload');
  var refresh = require('gulp-refresh');
  var _paths = ['server/**/*.js', 'client/js/*.js'];

  //register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: 'server/app.js',
      env: {
        'NODE_ENV': 'development'
      }
    })
      .on('restart');
  });

  // Example copy from watch/README.md
  gulp.task('stream', function () {
          // Endless stream mode
      return watch(_paths, { ignoreInitial: false })
          .pipe(gulp.dest('build'));
  });

  gulp.task('callback', function () {
          // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
      return watch(_paths, function () {
          gulp.src(_paths)
              .pipe(gulp.dest('build'));
      });
  });

  // Rerun the task when a file changes (orginal code from fileBrowser)
  gulp.task('watch', function() {
    //livereload.listen();
    refresh.listen();
    
    gulp.src(_paths, {
      read: false
    })
//      .pipe(watch({
//        emit: 'all'
//      }))
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
      //gulp.watch(_paths).on('change', livereload.changed);
      gulp.watch(_paths).on('change', refresh.changed);
  });

  //lint js files
  gulp.task('lint', function() {
    gulp.src(_paths)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });

  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['lint', 'nodemon', 'watch']);
  
}());

// ===================================================
// Settin'
// ===================================================

var gulp            = require('gulp'),
    loadPlugins     = require('gulp-load-plugins'),
    $               = loadPlugins(),
    pump            = require('pump'),
    del             = require('del'),
    merge           = require('merge-stream');

var watchLess = require('gulp-watch-less');
var less = require('gulp-less');
var exec = require('child_process').exec;

$.fs     = require('fs');


// ===================================================
// Configin'
// ===================================================

var asset_dir = {
  site: '.',
  dist: 'dist',
  js: 'custom/page/templates/js',
  css: 'custom/page/templates/css',
  less: 'custom/page/templates/less',
  modules: 'custom/page/sr-templates/sr-assets/pattern-library',
  images: 'img'
};

var path = {
  site: asset_dir.site,
  dist: asset_dir.dist,
  js: asset_dir.site + '/' + asset_dir.js,
  css: asset_dir.site + '/' + asset_dir.css,
};

var glob = {
  html: path.site + '/custom/page/leanlabs-hubl/**/*.html',
  css: path.css + '/*.css',
  js: path.js + '/**/*.js',
  jsdev: path.js + '/dev/**/*.js',
  jslibs : path.js + '/lib/**/*.js'
};


// ===================================================
// HubL Server
// ===================================================

gulp.task('serve', function() {
  exec('../../.././bin/local-hubl-server', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});
function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}
// Client less task
gulp.task('client_less', function () {
    return gulp.src([
        asset_dir.less + '/*.less',
        '!custom/page/templates/less/variables.less'
        ])
        .pipe(less())
        .on('error', swallowError)
        .pipe(gulp.dest(asset_dir.css + '/'))
        .pipe($.livereload());
});

// SR less task
gulp.task('sr_less', function () {
    return gulp.src(asset_dir.modules + '/**/*.less')
        .pipe(less())
        .on('error', swallowError)
        .pipe($.autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
        .pipe($.cssmin())
        .pipe(gulp.dest(function(file) {
          return file.base;
        }))
        .pipe($.livereload());
});

gulp.task('less', ['client_less', 'sr_less']);

// ===================================================
// Custom Shell Commands
// ===================================================

// Copy Custom Modules
gulp.task('cpmods', function() {
  var options = {
    continueOnError: true, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
  };
    // exec('rm ../custom-modules/*.html', options)
    // exec('rm ../custom-modules/*.json', options)
    exec('cp custom-modules/**/*.html ../custom-modules/', options)
    exec('cp custom-modules/*.json ../custom-modules/', options);
});



// ===================================================
// File Watching
// ===================================================

gulp.task('watch', function() {


//  gulp.watch(glob.html).on('change', $.livereload.changed);
  gulp.watch([
    asset_dir.less + '/*.less', 
    asset_dir.modules + '/**/*.less',
    'custom/page/sr-templates/sr-assets/less/*.less'],
    ['less']);
  // gulp.watch([
  //   path.js + '/dev/*.js'
  // ], ['babel']);

  $.livereload.listen();

});


// ===================================================
// Custom Tasks
// ===================================================

gulp.task('default', [ 'less', 'serve', 'watch' ]);
gulp.task('dev', [ 'less', 'serve', 'watch' ]);

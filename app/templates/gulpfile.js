var gulp=require('gulp');
var wiredep = require('wiredep').stream;
var inject=require('gulp-inject');
var minify=require('gulp-minify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var concatCss=require('gulp-concat-css');
var nodemon=require('gulp-nodemon');
var browserSync=require('browser-sync');

gulp.task('bower', function () {
  return gulp.src('./views/index.ejs')
    .pipe(wiredep({
	 'ignorePath': '..',
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./views'));
});

gulp.task('inject',['bower'], function () {
  var target = gulp.src('./views/index.ejs');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./public/**/*Module.js','./public/**/*.js', './public/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./views'));
});

gulp.task('nodemon',['inject'], function(cb){
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('browser-sync',['nodemon'],function(){
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["**"],
        port: 7000,
	});
})

gulp.task('compress-css', function() {
  return gulp.src('public/**/*.css')
   .pipe(concatCss('estilos.css'))
   .pipe(cssmin())
   .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('compress-js', function() {
  return gulp.src('public/**/*.js')
   .pipe(concat('all.js'))
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        }
    }))
   
    .pipe(gulp.dest('dist'))
});

gulp.task('compress',['compress-js','compress-css']);

gulp.task('inject-dist',['compress','bower'],function(){
 var target = gulp.src('./views/index.ejs');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/**/*.min.js', './dist/**/*.min.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./views'));
});

gulp.task('dist',['inject-dist']);


gulp.task('serve',['browser-sync']);



gulp.task('default',['inject']);
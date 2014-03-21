var fs = require('fs');
var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

// Remove old files
gulp.task('clean',function(){
	gulp.src('*.min.js',{read:false})
		.pipe(clean());
});

// Lint
gulp.task('lint',function(){
	/*gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));*/
});

// Minify
gulp.task('minify',function(){
	gulp.src('src/*.js')
		.pipe(uglify());
});

// Concatenate
gulp.task('concatenate',function(){
	gulp.src(['lib/Sheethub*.js','lib/W*.js','src/mediatizr.js'])
		.pipe(concat('mediatizr-'+JSON.parse(fs.readFileSync('bower.json')).version+'.min.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('default',['clean','lint','minify','concatenate']);
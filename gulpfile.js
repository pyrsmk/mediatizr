var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var fs = require('fs');

// Remove old files
gulp.task('clean-old',function(){
	gulp.src('*.min.js',{read:false})
		.pipe(clean());
});

// Compile
gulp.task('compile',function(){
	/*gulp.src('src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));*/
	gulp.src(['lib/Sheethub*.js','lib/W*.js','src/*.js'])
		.pipe(uglify())
		.pipe(concat('mediatizr-'+JSON.parse(fs.readFileSync('bower.json')).version+'.min.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('default',['clean-old','compile']);
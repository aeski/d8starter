var theme = "D8 Starter";
var gulp  = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    lazypipe = require('lazypipe'),
    postcss = require('gulp-postcss'),
    //connect = require('gulp-connect'),
    autoprefixer = require('autoprefixer');
  

var compileTheme = lazypipe()
        .pipe(sourcemaps.init)
        .pipe(function () {
            return sass().on('error', sass.logError);
        })
        .pipe(postcss, [ autoprefixer()])
         .pipe(sourcemaps.write)
         .pipe(rename, {basename: 'style'});
		 var minifyCss = lazypipe()
         .pipe(cleanCss)
         .pipe(rename, {suffix: '.min'});
         




gulp.task('watch', () => {
	gulp.watch('./*.html', (done) => {
        gulp.series(['html'])(done);
    });

    gulp.watch('scss/**/*.scss', (done) => {
        gulp.series(['styles'])(done);
    });

});



//gulp.task('watch', ['default', 'connect'], function () {
//    gulp.watch(['scss/**/*.scss'], ['styles']);
//    gulp.watch(['./*.html'], ['html']);
//});
/*

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 5050
    });
});
*/

/*
gulp.task('connect', () => {
  connect.server({
        livereload: true,
        port: 5050
    });


});
*/
/*
gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});
*/

gulp.task('html', () => {
	
    return gulp.src('./*.html')
    .pipe(connect.reload());
});

// Main task compiling CSS files from SCSS
gulp.task('styles', () => {
    return gulp.src('scss/*.scss')
		.pipe(compileTheme())
//		.pipe(sourcemaps.init)
 //       .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./css'))
        //.pipe(connect.reload());
});

gulp.task('default', gulp.series(['watch']));
//gulp.task('default', gulp.parallel(['connect', 'watch']));
//gulp.task('default', gulp.series(['connect', 'watch']));
//gulp.task('default', gulp.parallel(['styles', 'connect', 'html', 'watch']));

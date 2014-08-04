var gulp = require('gulp'),
    changed = require('gulp-changed'),
    ts = require('gulp-type');

var tsSources = 'Content/js/*.ts';

gulp.task('scripts', function () {
    var tsResult = gulp.src(tsSources)
        .pipe(changed(tsSources))
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            module: 'AMD'
        }));
    tsResult.js.pipe(gulp.dest('./Content/js'));
});

gulp.task('watch', function () {
    gulp.watch(tsSources, ['scripts']);
});
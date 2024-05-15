const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');

gulp.task('serve', function() {
    browserSync.init({
        server: {baseDir: 'dist'}
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('styles', function() {
    return gulp
        .src('src/sass/**/*.+(sass|scss|css)') // From where we import sass to compile to css.
        .pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError)) // compressed output style of css + log error if it happens.
        .pipe(cleanCSS({compatibility : 'ie8'})) // compressor for CSS
        .pipe(gulp.dest('dist/css')) // A destination where compiled css file is placed.
        .pipe(browserSync.stream());
});

gulp.task('checker', function() {
    gulp.watch('src/sass/**/*.+(sass|scss|css)', gulp.parallel('styles')); // ** we track all folders inside ; +(x|y|z) we track 3 file formats inside.
    gulp.watch("src/*.html").on('change', gulp.parallel('html-minimizer')); // on change of html in src we minimize it and place in dist
});

gulp.task('html-minimizer', function() { // minimize the html files
    return gulp.src('src/*.html') // get any html file from the src directory
        .pipe(htmlmin({collapseWhitespace : true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('plugins-mover', function() { // Move all CSS plugins to the dist.
    return gulp.src("src/css/*.css").pipe(gulp.dest('dist/css'))
})

gulp.task('scripts-mover', function() { // move js files.
    return gulp.src('src/js/scripts/*.js') // get the js files from src
        .pipe(gulp.dest('dist/js/scripts'))
});

gulp.task('js-library-mover', function() { // move library js files.
    return gulp.src('src/js/libraries/*.js') // get the js files from src
        .pipe(gulp.dest('dist/js/libraries'))
});

gulp.task('js-compressor', function() {
    return gulp
        .src('src/js/scripts/*.js')
        .pipe(minify())
        .pipe(gulp.dest('dist/js/scripts'))
});

gulp.task('images-mover', function() {
    return gulp
        .src('src/assets/**/*.+(jpg|webp|svg|png)') // get the jpg|webp|svg|png files from src
        .pipe(imagemin()) // minimize images size
        .pipe(gulp.dest('dist/assets')) // move to the dist.
});

gulp.task('fonts-mover', function() {
    return gulp
        .src("src/assets/fonts/*.+(otf|ttf)")
        .pipe(gulp.dest("dist/assets/fonts"))
});


gulp.task("default", gulp.parallel(
    'serve',
    'styles',
    'checker',
    'html-minimizer',
    'plugins-mover',
    'scripts-mover',
    'js-library-mover',
    'js-compressor',
    'images-mover',
    'fonts-mover'
));

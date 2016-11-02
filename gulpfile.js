const gulp   = require('gulp');
const banner = require('gulp-banner');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const umd = require('gulp-umd');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const pkg = require('./package');

const now = new Date();
const note = `/*!
 * ${pkg.name} v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2016-${now.getFullYear()} ${pkg.author.name}<${pkg.author.email}> & contributors
 * Licensed under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */

`;

gulp.task('js', () => {
  return gulp.src('src/js/by-pagination.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(umd({
      dependencies: (file) => {
        return [
          {
            name: 'jQuery',
            amd: 'jquery',
            cjs: 'jquery',
            global: 'jQuery',
            param: '$'
          }
        ];
      },
      exports: (file) => 'Plugin',
      namespace: (file) => 'byPagination'
    }))
    .pipe(banner(note))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(banner(note))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
  return gulp.src('src/scss/by-pagination.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'ie >= 9'],
      cascade: false
    }))
    .pipe(banner(note))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('dist/*.html').on('change', reload);
});

gulp.task('default', ['js', 'css']);

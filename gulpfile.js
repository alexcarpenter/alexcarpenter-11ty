const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const path = require('path')

const root = {
  src: '_assets/',
  dest: 'assets/'
}

gulp.task('styles', () => {
  return gulp.src(`${root.src}/stylesheets/main.scss`)
    .pipe(sass())
    .pipe(autoprefixer(['last 2 versions', '> 5%'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest(`${root.dest}/css`))
    .pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('scripts', () => {
  return gulp.src([
      'node_modules/lazysizes/lazysizes.min.js',
      'node_modules/swiper/dist/js/swiper.min.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest(`${root.dest}/js`))
})

gulp.task('images', () => {
  return gulp.src(`${root.src}/**/*.['jpg', 'png']`)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [
        { cleanupListOfValues: { floatPrecision: 2 } },
        { cleanupNumericValues: { floatPrecision: 2 } },
        { convertPathData: { floatPrecision: 2 } }
      ]
    }))
    .pipe(gulp.dest(`${root.dest}/img`))
})

gulp.task('watch', () => {
  gulp.watch(`${root.src}/stylesheets/**/*.scss`, ['styles'])
  gulp.watch(`${root.src}/images/**/*.['jpg', 'png']`, ['images'])
})

gulp.task('default', ['watch'])

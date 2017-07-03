import gulp from 'gulp'
import gutil from 'gulp-util'
import del from 'del'
import plumber from 'gulp-plumber'
import twig from 'gulp-twig'
import stylelint from 'gulp-stylelint'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import imagemin from 'gulp-imagemin'
import svgstore from 'gulp-svgstore'
import rename from 'gulp-rename'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'

const browserSync = BrowserSync.create()

const paths = {
  templates: {
    entry: './src/templates/index.twig',
    pages: [
      './src/templates/index.twig'
    ],
    glob: './src/templates/**/*.twig',
    dist: './dist'
  },
  styles: {
    entry: './src/stylesheets/main.scss',
    glob: './src/stylesheets/*/**.scss',
    dist: './dist/assets/css'
  },
  scripts: {
    glob: './src/javascripts/**/*.js'
  },
  images: {
    glob: './src/images/*.{svg,png,jpg}',
    dist: './dist/assets/img'
  },
  icons: {
    glob: './src/icons/*.svg',
    dist: './src/templates/_partials'
  },
  fonts: {
    glob: './src/fonts/*',
    dist: './dist/assets/fonts'
  }
}

const clean = () => del([ 'dist' ])
export { clean }

export function templates () {
  gulp.src(paths.templates.pages)
    .pipe(twig({
      data: {
        title: 'Alex Carpenter'
      }
    }))
    .pipe(gulp.dest(paths.templates.dist))
    browserSync.reload()
}

export function styles () {
  gulp.src(paths.styles.entry)
    .pipe(sass())
    .pipe(autoprefixer(['last 2 versions', '> 5%'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.stream())
}

export function scripts () {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    browserSync.reload()
  })
}

export function images () {
  return gulp.src(paths.images.glob)
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
    .pipe(gulp.dest(paths.images.dist))
}

export function icons () {
  return gulp.src(paths.icons.glob)
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
    .pipe(svgstore())
    .pipe(rename(function (path) {
      path.extname = ".twig"
    }))
    .pipe(gulp.dest(paths.icons.dist))
}

export function fonts () {
  return gulp.src(paths.fonts.glob)
    .pipe(gulp.dest(paths.fonts.dist))
}

export function watch () {
  browserSync.init({
    notify: true,
    server: {
      baseDir: 'dist/'
    }
  })
  gulp.watch(paths.templates.glob, templates)
  gulp.watch(paths.styles.glob, styles)
  gulp.watch(paths.scripts.glob, scripts)
}

import gulp from 'gulp'
import cp from 'child_process'
import gutil from 'gulp-util'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssnano from 'gulp-cssnano'
import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'

const browserSync = BrowserSync.create()
const hugoBin = 'hugo'
const defaultArgs = ['-d', '../dist', '-s', 'site', '-v']

gulp.task('hugo', (cb) => buildSite(cb))
gulp.task('hugo-preview', (cb) => buildSite(cb, ['--buildDrafts', '--buildFuture']))

gulp.task('build', ['styles', 'scripts', 'hugo'])
gulp.task('build-preview', ['styles', 'scripts', 'hugo-preview'])

gulp.task('styles', () => (
  gulp.src('./src/stylesheets/main.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 2 versions', '> 5%'], { cascade: true }))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream())
))

gulp.task('scripts', (cb) => {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }))
    browserSync.reload()
    cb()
  })
})

gulp.task('server', ['hugo', 'styles', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('./src/javascripts/**/*.js', ['scripts'])
  gulp.watch('./src/stylesheets/**/*.scss', ['styles'])
  gulp.watch('./site/**/*', ['hugo'])
})

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs

  return cp.spawn(hugoBin, args, {stdio: 'inherit'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload()
      cb()
    } else {
      browserSync.notify('Hugo build failed :(')
      cb('Hugo build failed')
    }
  })
}

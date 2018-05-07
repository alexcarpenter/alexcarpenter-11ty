module.exports = context => ({
  plugins: [
    require('postcss-easy-import'),
    require('postcss-logical')({
      dir: 'ltr'
    }),
    require('postcss-color-mod-function'),
    require('postcss-custom-media'),
    require('postcss-custom-selectors'),
    require('autoprefixer'),
    context.env === 'production' ? require('cssnano')({
      preset: 'default'
    }) : false
  ]
})

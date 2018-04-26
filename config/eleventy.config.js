module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  })

  return {
    templateFormats: ['liquid', 'md'],
    dir: {
      input: 'src',
      output: 'www'
    }
  }
}

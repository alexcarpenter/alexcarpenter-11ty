const { DateTime } = require('luxon')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  eleventyConfig.addCollection('screencasts', collection => {
    return collection.getFilteredByGlob('**/screencasts/**/index.md').reverse()
  })

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  })

  return {
    templateFormats: ['liquid', 'md'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www'
    }
  }
}

const { DateTime } = require('luxon')
const typogr = require('typogr')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  const markdown = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
    .use(require('markdown-it-abbr'))
    .use(require('markdown-it-anchor'), {
      permalink: true,
      permalinkClass: 'permalink',
      permalinkSymbol: '§'
    })
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-table-of-contents'))

  eleventyConfig.setLibrary('md', markdown)

  eleventyConfig.addCollection('screencasts', collection => {
    return collection
      .getFilteredByGlob('**/screencasts/**/!(index)*.md')
      .reverse()
  })

  eleventyConfig.addFilter('jsonify', str => {
    return JSON.stringify(str)
  })

  eleventyConfig.addFilter('typogrify', str => {
    return typogr(str).typogrify()
  })

  eleventyConfig.addFilter('markdownify', str => {
    return markdown.render(str)
  })

  eleventyConfig.addFilter('markdownify_inline', str => {
    return markdown.renderInline(str)
  })

  eleventyConfig.addFilter('permalink', str => {
    return str.replace(/\.html/g, '')
  })

  eleventyConfig.addFilter('strip_html', str => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ''
    )
  })

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  })

  eleventyConfig.addPassthroughCopy('./src/assets/fonts')
  eleventyConfig.addPassthroughCopy('./src/CNAME')

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

const { DateTime } = require('luxon')
const typogr = require('typogr')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginSyntaxHighlight)

  function parseDate(str) {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, { zone: 'utc' })
    return date.toJSDate()
  }

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
      permalinkSymbol: '#'
    })
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-table-of-contents'))

  eleventyConfig.setLibrary('md', markdown)

  eleventyConfig.addCollection('all', collection => {
    return collection
      .getFilteredByGlob('**/+(bookmarks|posts|screencasts)/**/!(index)*.md')
      .reverse()
  })

  eleventyConfig.addCollection('bookmarks', collection => {
    return collection
      .getFilteredByGlob('**/bookmarks/**/!(index)*.md')
      .reverse()
  })

  eleventyConfig.addCollection('posts', collection => {
    return collection
      .getFilteredByGlob('**/posts/**/!(index)*.md')
      .reverse()
  })

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

  eleventyConfig.addFilter('date_to_short_string', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_SHORT)
  })

  eleventyConfig.addFilter('date_to_medium_string', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
  })

  eleventyConfig.addFilter('datetime_to_long_string', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL)
  })

  eleventyConfig.addFilter('datetime_to_iso', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toISO()
  })

  eleventyConfig.setLiquidOptions({
    dynamicPartials: true
  })

  eleventyConfig.addPassthroughCopy('./src/assets/fonts')
  eleventyConfig.addPassthroughCopy('./src/assets/images')
  eleventyConfig.addPassthroughCopy('./src/CNAME')
  eleventyConfig.addPassthroughCopy('./src/apple-touch.png')
  eleventyConfig.addPassthroughCopy('./src/favicon-16x16.png')
  eleventyConfig.addPassthroughCopy('./src/favicon-32x32.png')
  eleventyConfig.addPassthroughCopy('./src/favicon-96x96.png')
  eleventyConfig.addPassthroughCopy('./src/og-image.png')

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

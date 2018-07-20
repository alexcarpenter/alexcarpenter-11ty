const { DateTime } = require('luxon')
const CleanCSS = require('clean-css')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-anchor'), {
    level: [2],
    permalink: false
  })

module.exports = function(eleventyConfig) {
  const parseDate = str => {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, { zone: 'utc' })
    return date.toJSDate()
  }

  eleventyConfig.setLibrary('md', markdown)

  // Filters
  eleventyConfig.addFilter(
    'cssmin',
    code => new CleanCSS({}).minify(code).styles
  )

  eleventyConfig.addFilter('markdownify', str => markdown.render(str))

  eleventyConfig.addFilter('markdownify_inline', str =>
    markdown.renderInline(str)
  )

  eleventyConfig.addFilter('date_to_permalink', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM')
  })

  eleventyConfig.addFilter('date_formatted', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM/dd')
  })

  eleventyConfig.addFilter('permalink', str => {
    return str.replace(/\.html/g, '')
  })

  // Collections
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse()
  })

  // ETC.
  eleventyConfig.addPassthroughCopy('src/assets')

  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: false,
    passthroughFileCopy: true
  }
}

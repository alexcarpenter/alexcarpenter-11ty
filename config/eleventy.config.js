const { DateTime } = require('luxon')
const CleanCSS = require('clean-css')
const htmlmin = require('html-minifier')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false
})

module.exports = eleventyConfig => {
  const parseDate = str => {
    if (str instanceof Date) {
      return str
    }
    const date = DateTime.fromISO(str, { zone: 'utc' })
    return date.toJSDate()
  }

  // Plugins
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.setLibrary('md', markdown)

  // Filters
  eleventyConfig.addFilter(
    'cssmin',
    code => new CleanCSS({}).minify(code).styles
  )

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  eleventyConfig.addFilter('markdownify', str => markdown.render(str))

  eleventyConfig.addFilter('markdownify_inline', str =>
    markdown.renderInline(str)
  )

  eleventyConfig.addFilter('strip_html', str => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ''
    )
  })

  eleventyConfig.addFilter('date_to_permalink', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM')
  })

  eleventyConfig.addFilter('date_formatted', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM/dd')
  })

  eleventyConfig.addFilter('date_to_med', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('MMM yyyy')
  })

  eleventyConfig.addFilter('permalink', str => {
    return str.replace(/\.html/g, '')
  })

  // Collections
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse()
  })

  eleventyConfig.addCollection('latestPosts', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').slice(-5).reverse()
  })

  // Shortcodes
  eleventyConfig.addShortcode('video', (id) => {
    return `<div style="--aspect-ratio: 16/9">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>`
  })

  // ETC.
  eleventyConfig
    .addPassthroughCopy('src/assets')
    .addPassthroughCopy('src/manifest.json')
    .addPassthroughCopy('src/sw.js')

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
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}

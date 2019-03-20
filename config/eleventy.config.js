const { DateTime } = require('luxon')
const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-js')
const htmlmin = require('html-minifier')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const Figure = require('../src/_includes/components/Figure.js')
const Link = require('../src/_includes/components/Link.js')
const Note = require('../src/_includes/components/Note.js')
const Quote = require('../src/_includes/components/Quote.js')
const Stats = require('../src/_includes/components/Stats.js')
const Youtube = require('../src/_includes/components/Youtube.js')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
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
    code => new CleanCSS({}).minify(code).styles,
  )

  eleventyConfig.addFilter('jsmin', code => {
    let minified = UglifyJS.minify(code)
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  })

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  })

  eleventyConfig.addFilter('markdownify', str => markdown.render(str))

  eleventyConfig.addFilter('markdownify_inline', str =>
    markdown.renderInline(str),
  )

  eleventyConfig.addFilter('strip_html', str => {
    return str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      '',
    )
  })

  eleventyConfig.addFilter('date_to_permalink', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM')
  })

  eleventyConfig.addFilter('date_formatted', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('DD')
  })

  eleventyConfig.addFilter('date_time', obj => {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('ff')
  })

  eleventyConfig.addFilter('permalink', str => {
    return str.replace(/\.html/g, '')
  })

  // Collections
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse()
  })

  eleventyConfig.addCollection('notes', collection => {
    return collection.getFilteredByGlob('**/notes/*.md').reverse()
  })

  eleventyConfig.addCollection('screencasts', collection => {
    return collection.getFilteredByGlob('**/screencasts/*.md').reverse()
  })

  eleventyConfig.addCollection('speakingUpcoming', collection => {
    return collection.getFilteredByGlob('**/speaking/*.md').filter(item => {
      const date = new Date(item.date).getTime()
      const now = new Date().getTime()
      return (date > now ? item : false)
    })
  })

  eleventyConfig.addCollection('speakingPrevious', collection => {
    return collection.getFilteredByGlob('**/speaking/*.md').filter(item => {
      const date = new Date(item.date).getTime()
      const now = new Date().getTime()
      return (date < now ? item : false)
    })
  })

  // Shortcodes
  eleventyConfig.addShortcode('Figure', Figure)
  eleventyConfig.addShortcode('Link', Link)
  eleventyConfig.addShortcode('Note', Note)
  eleventyConfig.addShortcode('Quote', Quote)
  eleventyConfig.addShortcode('Stats', Stats)
  eleventyConfig.addShortcode('Youtube', Youtube)

  // ETC.
  eleventyConfig
    .addPassthroughCopy('src/assets')
    .addPassthroughCopy('src/manifest.json')
    .addPassthroughCopy('src/_redirects')

  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
  }
}

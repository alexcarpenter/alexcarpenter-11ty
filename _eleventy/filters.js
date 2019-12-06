const htmlmin = require('html-minifier')
const CleanCSS = require('clean-css')
const R = require('ramda')
const UglifyJS = require('uglify-js')
const { DateTime } = require('luxon')
const markdown = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require('markdown-it-anchor'), {
  level: [2],
  permalink: false,
})

const parseDate = str => {
  if (str instanceof Date) {
    return str
  }
  const date = DateTime.fromISO(str, { zone: 'utc' })
  return date.toJSDate()
}

module.exports = {
  htmlmin: function(content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  },

  cssmin: function(code) {
    return new CleanCSS({}).minify(code).styles
  },

  jsmin: function(code) {
    let minified = UglifyJS.minify(code)
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  },

  markdownify: function(str) {
    return markdown.render(str)
  },

  markdownify_inline: function(str) {
    return markdown.renderInline(str)
  },

  strip_html: function(str) {
    return str.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, '')
  },

  sortByOrder: function(value) {
    return value.sort((a, b) => {
      return parseInt(a.data.order, 10) - parseInt(b.data.order, 10)
    })
  },

  date_to_permalink: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('yyyy/MM')
  },

  date_formatted: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('DD')
  },

  date_time: function(obj) {
    const date = parseDate(obj)
    return DateTime.fromJSDate(date).toFormat('ff')
  },

  permalink: function(str) {
    return str.replace(/\.html/g, '')
  },

  hasTag: function(arr, str) {
    return arr.includes(str);
  },

  head: function(arr, n) {
    if( n < 0 ) {
      return arr.slice(n);
    }
    return arr.slice(0, n);
  },

  favorites: function(arr, n = 5) {
    var favorited = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].data.favorite) {
        favorited.push(arr[i]);
      }
    }
    return favorited.slice(0, n);
  }
}


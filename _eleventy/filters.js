const markdown = require('./utils');
const R = require('ramda');
const htmlmin = require('html-minifier');
const CleanCSS = require('clean-css');
const Terser = require('terser');
const { DateTime } = require('luxon');

const parseDate = str => {
  if (str instanceof Date) {
    return str;
  }
  const date = DateTime.fromISO(str, { zone: 'utc' });
  return date.toJSDate();
};

const isFavorited = R.hasPath(['data', 'favorite']);

module.exports = {
  htmlmin: (content, outputPath) => {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  },

  cssmin: code => new CleanCSS({}).minify(code).styles,

  jsmin: code => {
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  },

  markdownify: str => markdown.render(str),

  markdownify_inline: str => markdown.renderInline(str),

  strip_html: str => str.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, ''),

  date_to_permalink: obj => {
    const date = parseDate(obj);
    return DateTime.fromJSDate(date).toFormat('yyyy/MM');
  },

  date_formatted: obj => {
    const date = parseDate(obj);
    return DateTime.fromJSDate(date).toFormat('DD');
  },

  date_time_formatted: val => {
    const n = parseFloat(val);
    return DateTime.fromSeconds(n).toFormat('DD, t');
  },

  permalink: str => str.replace(/\.html/g, ''),

  take: (arr, n = 1) => R.take(n, arr),

  favorites: (arr, n = 5) => {
    return R.compose(R.take(n), R.filter(isFavorited))(arr);
  },

  newsletterPosts: arr => arr.filter(x => x.data.tags && x.data.tags.includes('newsletter')),

  includes: (x, y) => R.includes(y, x),

  hostname: href => {
    const match = href.match(
      /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
    );
    const hostUrl = match[3];
    return hostUrl.replace(/(?:www\.)?/g, '');
  },

  totalDuration: (arr, key = 'duration') => {
    return arr
            .map(x => parseFloat(x.data[key]))
            .reduce((a, b) => a + b, 0);
  },

  shuffle: (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};

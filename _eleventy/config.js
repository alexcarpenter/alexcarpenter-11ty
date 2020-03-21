const filters = require('./filters');
const shortcodes = require('./shortcodes');
const markdown = require('./utils');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach(shortCodeName => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Collections
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('**/posts/*.md').reverse();
  });

  eleventyConfig.addCollection('bookmarks', collection => {
    return collection.getFilteredByGlob('**/bookmarks/*.md').reverse();
  });

  eleventyConfig.addCollection('screencasts', collection => {
    return collection.getFilteredByGlob('**/screencasts/*.md').reverse();
  });

  eleventyConfig.addCollection('work', collection => {
    return collection.getFilteredByGlob('**/work/*.md').reverse();
  });

  // Transforms
  eleventyConfig.addTransform('htmlmin', filters.htmlmin);

  // Markdown
  eleventyConfig.setLibrary("md", markdown);

  // ETC.
  eleventyConfig
    .addPassthroughCopy('src/assets')
    .addPassthroughCopy('src/manifest.json')
    .addPassthroughCopy('src/_redirects');

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
  };
};

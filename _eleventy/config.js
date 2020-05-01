const filters = require('./filters');
const shortcodes = require('./shortcodes');
const pairedShortcodes = require('./paired-shortcodes');
const markdown = require('./utils');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const caniuse = require('@alexcarpenter/eleventy-plugin-caniuse');

const ENV = require('../src/_data/env.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(caniuse);

  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  // Object.keys(shortcodes).forEach((shortCodeName) => {
  //   eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName]);
  // });

  // Paired shortcodes
  Object.keys(pairedShortcodes).forEach((shortCodeName) => {
    eleventyConfig.addPairedShortcode(shortCodeName, pairedShortcodes[shortCodeName]);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Collections
  eleventyConfig.addCollection('posts', (collection) => {
    const published = (p) =>
      ENV.environment === 'production' ? !p.data.draft : true;
    return [
      ...collection.getFilteredByGlob('**/posts/*.md').filter(published),
    ].reverse();
  });

  eleventyConfig.addCollection('bookmarks', (collection) => {
    return collection.getFilteredByGlob('**/bookmarks/*.md').reverse();
  });

  eleventyConfig.addCollection('screencasts', (collection) => {
    return collection.getFilteredByGlob('**/screencasts/*.md').reverse();
  });

  eleventyConfig.addCollection('work', (collection) => {
    const published = (p) => !p.data.draft;
    return [
      ...collection.getFilteredByGlob('**/work/*.md').filter(published),
    ].reverse();
  });

  eleventyConfig.addCollection("all", function(collection) {
    const published = (p) =>
      ENV.environment === 'production' ? !p.data.draft : true;
    return collection.getFilteredByGlob([
      '**/posts/*.md',
      '**/screencasts/*.md',
      '**/bookmarks/*.md'
    ]).filter(published).reverse();
  });

  // Transforms
  eleventyConfig.addTransform('htmlmin', filters.htmlmin);

  // Markdown
  eleventyConfig.setLibrary('md', markdown);

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

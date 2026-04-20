module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("articles/*.md").reverse();
  });

  eleventyConfig.addCollection("lab", function(collectionApi) {
    return collectionApi.getFilteredByGlob("lab/*.md").sort((a, b) => {
      return (a.data.order || 99) - (b.data.order || 99);
    });
  });

  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("en-NZ", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  eleventyConfig.addFilter("limit", function(array, n) {
    return array ? array.slice(0, n) : [];
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

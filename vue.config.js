const webpack = require("webpack");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: "default",
      globalObject: "typeof self !== 'undefined' ? self : this"
    }
  }
};

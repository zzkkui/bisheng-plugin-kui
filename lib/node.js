"use strict";

var path = require('path');

var processDoc = require('./process-doc');

var processDemo = require('./process-demo');

module.exports = function (markdownData, config) {
  var isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename));
  var noPreview = config.noPreview,
      babelConfig = config.babelConfig,
      pxtorem = config.pxtorem,
      injectProvider = config.injectProvider,
      OUTPUT = config.OUTPUT,
      PUBLIC_PATH = config.PUBLIC_PATH;

  if (isDemo) {
    return processDemo({
      markdownData: markdownData,
      noPreview: noPreview,
      babelConfig: babelConfig && JSON.parse(babelConfig),
      pxtorem: pxtorem,
      injectProvider: injectProvider,
      OUTPUT: OUTPUT,
      PUBLIC_PATH: PUBLIC_PATH
    });
  }

  return processDoc(markdownData);
};
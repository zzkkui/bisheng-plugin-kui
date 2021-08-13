"use strict";

var fs = require('fs');

var path = require('path');

var JsonML = require('jsonml.js/lib/utils');

var nunjucks = require('nunjucks');

var postcss = require('postcss');

var pxtoremPlugin = require('postcss-pxtorem');

var PROD_RM_DEBUG = false;
nunjucks.configure({
  autoescape: true
});
var tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString();

function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0])[0];
}

function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'pre' && ['jsx', 'tsx'].includes(JsonML.getAttributes(node).lang);
  });
} // function getCssCodeIndex(contentChildren) {
//   return contentChildren.findIndex(function (node) {
//     return JsonML.getTagName(node) === 'pre' && ['css'].includes(JsonML.getAttributes(node).lang)
//   })
// }


function getSourceCodeObject(contentChildren, codeIndex) {
  if (codeIndex > -1) {
    return {
      isES6: true,
      code: getCode(contentChildren[codeIndex]),
      lang: JsonML.getAttributes(contentChildren[codeIndex]).lang
    };
  }

  return {
    isTS: true
  };
}

function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

function getStyleNode(contentChildren) {
  return contentChildren.filter(function (node) {
    return isStyleTag(node) || JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css';
  })[0];
}

module.exports = function (_ref) {
  var markdownData = _ref.markdownData,
      noPreview = _ref.noPreview,
      babelConfig = _ref.babelConfig,
      pxtorem = _ref.pxtorem,
      injectProvider = _ref.injectProvider;
  var meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-'); // Should throw debugging demo while publish.

  if (meta.debug && PROD_RM_DEBUG) {
    return {
      meta: {}
    };
  } // Update content of demo.


  var contentChildren = JsonML.getChildren(markdownData.content);
  var codeIndex = getCodeIndex(contentChildren); // const cssCodeIndex = getCssCodeIndex(contentChildren)

  var introEnd = codeIndex === -1 ? contentChildren.length : codeIndex;
  markdownData.content = contentChildren.slice(0, introEnd);
  var sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex);
  markdownData.code = sourceCodeObject.code;
  markdownData.lang = sourceCodeObject.lang;
  var styleNode = getStyleNode(contentChildren);

  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    var styleTag = contentChildren.filter(isStyleTag)[0];
    var originalStyle = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '');

    if (pxtorem) {
      originalStyle = postcss(pxtoremPlugin({
        rootValue: 50,
        propList: ['*']
      })).process(originalStyle).css;
    }

    markdownData.style = originalStyle;
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  if (meta.iframe) {
    var html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      // script: markdownData.code,
      reactRouter: meta.reactRouter === 'react-router' ? 'react-router@3.2.1/umd/ReactRouter' : meta.reactRouter === 'react-router-dom' ? 'react-router-dom@4/umd/react-router-dom' : false,
      injectProvider: !!injectProvider
    });
    var fileName = "demo-".concat(Math.random(), ".html");
    var root = process.env.NODE_ENV !== 'development' ? '/react/' : '/';
    fs.writeFile(path.join(process.cwd(), '_site', fileName), html, function () {});
    markdownData.src = path.join(root, fileName);
  }

  return markdownData;
};
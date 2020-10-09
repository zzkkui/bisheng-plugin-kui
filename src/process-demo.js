const JsonML = require('jsonml.js/lib/utils')

const PROD_RM_DEBUG = false

function getCode (node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0]
  )[0]
}

function getChineseIntroStart (contentChildren) {
  return contentChildren.findIndex((node) => JsonML.getTagName(node) === 'h2' &&
    JsonML.getChildren(node)[0] === 'zh-CN')
}

function getEnglishIntroStart (contentChildren) {
  return contentChildren.findIndex((node) => JsonML.getTagName(node) === 'h2' &&
    JsonML.getChildren(node)[0] === 'en-US')
}

function getCodeIndex (contentChildren) {
  return contentChildren.findIndex((node) => JsonML.getTagName(node) === 'pre' &&
    ['jsx', 'tsx'].includes(JsonML.getAttributes(node).lang))
}

function getSourceCodeObject (contentChildren, codeIndex) {
  if (codeIndex > -1) {
    return {
      isES6: true,
      code: getCode(contentChildren[codeIndex]),
      lang: JsonML.getAttributes(contentChildren[codeIndex]).lang
    }
  }

  return {
    isTS: true
  }
}

module.exports = ({
  markdownData
}) => {
  const { meta } = markdownData
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-')
  // Should throw debugging demo while publish.
  if (meta.debug && PROD_RM_DEBUG) {
    return { meta: {} }
  }

  // Update content of demo.
  const contentChildren = JsonML.getChildren(markdownData.content)
  const chineseIntroStart = getChineseIntroStart(contentChildren)
  const englishIntroStart = getEnglishIntroStart(contentChildren)
  const codeIndex = getCodeIndex(contentChildren)
  const introEnd = codeIndex === -1 ? contentChildren.length : codeIndex
  if (chineseIntroStart > -1 /* equal to englishIntroStart > -1 */) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, introEnd)
    }
  } else {
    markdownData.content = contentChildren.slice(0, introEnd)
  }

  const sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex)

  markdownData.code = sourceCodeObject.code

  return markdownData
}

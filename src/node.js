const path = require('path')
const processDoc = require('./process-doc')
const processDemo = require('./process-demo')

module.exports = (markdownData, config) => {
  const isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename))
  const { noPreview, babelConfig, pxtorem, injectProvider, OUTPUT, PUBLIC_PATH } = config
  if (isDemo) {
    return processDemo({
      markdownData,
      noPreview,
      babelConfig: babelConfig && JSON.parse(babelConfig),
      pxtorem,
      injectProvider,
      OUTPUT,
      PUBLIC_PATH
    })
  }
  return processDoc(markdownData)
}

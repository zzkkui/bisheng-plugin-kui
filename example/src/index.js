const path = require('path')
const contentTmpl = './template/index'
// function pickerGenerator (module) {
//   // eslint-disable-next-line prefer-regex-literals
//   const tester = module ? new RegExp(`^docs/${module}`) : new RegExp('^docs')
//   return (markdownData) => {
//     const { filename } = markdownData.meta
//     if (tester.test(filename)) {
//       return {
//         meta: markdownData.meta
//       }
//     }
//     return null
//   }
// }

module.exports = {
  lazyLoad (nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true
    }
    return nodePath.endsWith('/demo') // 将demo下的所有md合为一个
  },
  pick: {
    docs (markdownData) {
      const { filename } = markdownData.meta
      if (!/^docs/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null
      }
      return {
        meta: markdownData.meta
      }
    }
  },
  plugins: [
    'bisheng-plugin-description', // 抽取markdown文件的中间的description部分
    'bisheng-plugin-toc?maxDepth=2&keepElem', // 产生一个table,和下面的顺序不能换，会报错的！
    path.join(__dirname, '../../')
  ],
  routes: {
    // path: '/',
    // component: contentTmpl
    path: '/docs',
    component: contentTmpl
  }
}

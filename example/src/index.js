const path = require('path')
const contentTmpl = './template/index'

module.exports = {
  lazyLoad (nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true
    }
    return nodePath.endsWith('/demo') // 将demo下的所有md合为一个
  },
  plugins: [
    'bisheng-plugin-description', // 抽取markdown文件的中间的description部分
    `${path.join(__dirname, '../../')}?OUTPUT=dist&PUBLIC_PATH=/` // OUTPUT：bisheng output 设置  PUBLIC_PATH： webpack： publicPath 设置
  ],
  routes: {
    path: '/docs',
    component: contentTmpl
  }
}

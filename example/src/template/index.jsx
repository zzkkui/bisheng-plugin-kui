import React from 'react'
import ReactDOM from 'react-dom'
import collect from 'bisheng/collect'
import 'antd/dist/antd.css'
import Main from './main'

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('../static/style')
  window.IFRAME_CODES = {}
  // Expose to iframe
  window.react = React
  window['react-dom'] = ReactDOM
  // eslint-disable-next-line global-require
  window.antd = require('antd')

  // Error log statistic
  window.addEventListener('error', function onError (e) {
    // Ignore ResizeObserver error
    if (e.message === 'ResizeObserver loop limit exceeded') {
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
  })
}

export default collect(async (nextProps) => {
  const { pathname } = nextProps.location
  const pageDataPath = pathname.split('/')
  const pageData = nextProps.utils.get(nextProps.data, pageDataPath)
  if (!pageData) {
    // eslint-disable-next-line no-throw-literal
    throw 404
  }
  const pageDataPromise = typeof pageData === 'function' ? pageData() : pageData.index()
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo'])
  if (demosFetcher) {
    const [localizedPageData, demos] = await Promise.all([pageDataPromise, demosFetcher()])
    return { localizedPageData, demos }
  }
  return { localizedPageData: await pageDataPromise }
})(Main)

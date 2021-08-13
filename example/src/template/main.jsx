import React from 'react'
import { getChildren } from 'jsonml.js/lib/utils'
import Article from './article'

class Content extends React.Component {
  // 渲染右部锚点导航
  renderToc (props) {
    const { localizedPageData, demos } = props
    const { toc, api } = localizedPageData
    // demo需要生成的右侧导航
    const demosToc = demos
      ? Object.keys(demos)
        // .map((key) => demos[key])
        .sort((a, b) => demos[a].meta.order - demos[b].meta.order)
        .map((key) => {
          const { title, filename } = demos[key].meta
          const id = filename.replace(/\.md$/, '').replace(/\//g, '-')
          return (
            <li key={id} title={title}>
              <a href={`#${id}`}>{title}</a>
            </li>
          )
        })
      : ''
    // 文章需要生成的右侧导航
    const indexToc = getChildren(toc)
      .map((li) => {
        const liMeta = Array.isArray(li) && Array.isArray(li[1]) && li[1][1] ? li[1][1] : {}
        if (!liMeta.href.match(/api/i)) {
          return (
            <li key={liMeta.href} title={liMeta.title}>
              <a href={liMeta.href}>{liMeta.title}</a>
            </li>
          )
        }
      })
      .filter((n) => n)
    return (
      <ul className="toc">
        {indexToc}
        {demosToc}
        {api && (
          <li key="API" title="API">
            <a href="#API">API</a>
          </li>
        )}
      </ul>
    )
  }

  render () {
    console.log(this.props)

    const {
      localizedPageData: {
        meta: { hiddenAnchor }
      }
    } = this.props
    return (
      <div className="body">
        <div className="wapper">
          <div className="main">
            <div className="content">
              <div className="content-wapper">
                <Article {...this.props} />
              </div>
              {hiddenAnchor ? null : <div className="toc-wapper">{this.renderToc(this.props)}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content

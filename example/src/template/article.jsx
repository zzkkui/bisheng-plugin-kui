import React from 'react'
import { getChildren } from 'jsonml.js/lib/utils'
import LiveDemo from './live-demo'

// 渲染文章主体内容
function renderArticle (props) {
  const { localizedPageData, utils, demos } = props
  const {
    meta: { title, subtitle },
    content,
    api
  } = localizedPageData
  return (
    <article>
      <section className="markdown">
        <h1>
          {title}
          <div className="md-subtitle">{subtitle}</div>
        </h1>
      </section>
      {/* 组件入口 md 文档内容 */}
      {utils.toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content)))}
      {/* 组件demo渲染 */}
      {demos && <div className="markdown-demo">{renderDemo(demos, utils)}</div>}
      {/* 组件入口 md API 内容 */}
      {utils.toReactComponent(
        [
          'section',
          {
            className: 'markdown api-container'
          }
        ].concat(getChildren(api || ['placeholder']))
      )}
    </article>
  )
}

// 渲染 组件demo
function renderDemo (demos, utils) {
  const demoValues = Object.keys(demos).map((key) => demos[key])
  return (
    demoValues
      // 根据 order 排序
      .sort((a, b) => a.meta.order - b.meta.order)
      .map((demo) => {
        const {
          meta: { title, filename, iframe },
          content,
          code: es6Code,
          lang,
          src,
          style: styleCode,
          highlightedStyle: highlightedStyleCode
        } = demo
        // console.log(demo)
        // id（锚点）即文件名
        const id = filename.replace(/\.md$/, '').replace(/\//g, '-')
        // console.log(codeText)
        const code = es6Code.trim().replace(/>;$/, '>')

        return (
          <div key={filename} className="demo">
            <LiveDemo
              code={code}
              content={content}
              id={id}
              utils={utils}
              title={title}
              lang={lang}
              iframe={iframe}
              src={src}
              style={styleCode}
              highlightedStyle={highlightedStyleCode}
            />
          </div>
        )
      })
  )
}

function Article (props) {
  return <>{renderArticle(props)}</>
}

export default Article

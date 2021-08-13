/* eslint-disable multiline-ternary */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import github from 'prism-react-renderer/themes/github'
import ts from 'typescript'
import * as antd from 'antd'
import Frame from './frame'
import transformer from './transformerIframeCode'

// 编辑代码错误时样式
const errorCodeStyle = {
  color: '#721c24',
  backgroundColor: '#f8d7da',
  borderColor: '#f5c6cb',
  width: '100%',
  textAlign: 'left',
  padding: '20px'
}

// react-live 需要的环境引入
const allScope = {
  ReactDOM,
  React,
  react: { ...React },
  antd: { ...antd }
}

const transpile = (code) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ES2015,
      noEmitOnError: true
    }
  }).outputText
}

const getDependencies = (code, codeArr) => {
  return code.split('\n').reduce((acc, line) => {
    const matches = line.match(/import (.+?) from "(.+)";$/)
    if (matches) {
      if (matches.input.trim().startsWith('//')) {
        return acc
      }
      let modules = []
      let lib
      if (matches[1]) {
        const module = matches[1].trim()
        if (module.startsWith('{')) {
          modules = module.substring(1, module.length - 1).split(',')
        } else {
          modules = [module]
        }
      }
      if (matches[2]) {
        if (matches[2].indexOf('/')) {
          lib = matches[2].split('/')[0]
        } else {
          lib = matches[2]
        }
      }
      return [
        ...acc,
        ...modules.map((n) => ({
          lib,
          module: n.trim()
        }))
      ]
    } else {
      line && codeArr.push(line)
    }
    return acc
  }, [])
}

function LiveDemo (props) {
  const { code, title, content, id, utils, lang, iframe, src, style, highlightedStyle } = props

  const editorEl = useRef(null)
  const styleEl = useRef(null)
  const [height, setHeight] = useState(0)
  const [liveCode, setLiveCode] = useState()
  const [editCode, setEditCode] = useState()
  const [scope, setScope] = useState()
  const iframeRef = useRef(null)

  function onFocus () {
    setHeight('auto')
  }

  function onBlur () {
    const styleHeight = styleEl.current ? styleEl.current.offsetHeight : 0
    setHeight(editorEl.current.offsetHeight + styleHeight)
  }

  function onCodeChange (code) {
    if (lang === 'tsx') {
      // console.log(transpile(code))
      setLiveCode(transpile(handleCode(code)))
      setEditCode(code)
    } else {
      setLiveCode(handleCode(code))
      setEditCode(code)
    }
  }

  const handleCode = useCallback(
    (code) => {
      const sourceCode = code
      const codeArr = []
      const _dependencies = getDependencies(code, codeArr)
      const scope = {}
      _dependencies.forEach((n) => {
        if (allScope[n.lib]) {
          if (allScope[n.lib][n.module]) {
            scope[n.module] = allScope[n.lib][n.module]
          } else if (n.lib === n.module) {
            scope[n.module] = allScope[n.lib]
          }
        }
      })
      if (iframe) {
        const last = codeArr[codeArr.length - 1]
        codeArr[codeArr.length - 1] = last
          .replace('ReactDOM.render', 'render')
          .replace(',', '')
          .replace('mountNode', '')
        code = codeArr.join('\n')
      } else {
        code = codeArr.join('\n')
      }
      if (code.trim().startsWith(';')) {
        code = code.substring(1)
      }
      let iframeCode
      if (iframe) {
        scope.ReactDOM = ReactDOM
        scope.Frame = Frame
        scope.iframeRef = iframeRef
        scope.iframeSrc = src
        scope.iframeHeight = iframe
        iframeCode = transformer(transpile(sourceCode), { presets: ['env', 'react'] })
        window.IFRAME_CODES[`${src?.substring(1)}`] = iframeCode
      }
      setScope(scope)
      return iframe
        ? `<Frame>
          <iframe
            ref={iframeRef}
            // onLoad={}
            src={iframeSrc}
            height={iframeHeight}
            title="demo"
            className="iframe-demo"
          />
        </Frame>`
        : code
    },
    [iframe, src]
  )

  useEffect(() => {
    if (code) {
      if (lang === 'tsx') {
        setLiveCode(transpile(handleCode(code)))
        setEditCode(code)
      } else {
        setLiveCode(handleCode(code))
        setEditCode(code)
      }
    }
  }, [code, handleCode, lang])

  useEffect(() => {
    if (iframe) {
      const iframeEl = document.getElementById(`${id}-iframe`)
      if (iframeEl && iframeEl.contentWindow) {
        iframeEl.contentWindow.location.reload()
      }
    }
  }, [editCode, iframe])

  // console.log(scope)
  // console.log(liveCode)
  // console.log(editCode)

  return (
    <>
      <div className="preview">
        <div id={id} className="demo-title">
          {title}
        </div>
        {/* 组件demo描述 */}
        <div>{utils.toReactComponent(['div', { className: 'demo-description' }].concat(content))}</div>
        <div className="demo-content">
          {iframe ? (
            <Frame>
              <iframe
                ref={iframeRef}
                id={`${id}-iframe`}
                // onLoad={}
                src={src}
                height={iframe}
                title="demo"
                className="iframe-demo"
              ></iframe>
            </Frame>
          ) : null}
          {!iframe && style ? <style dangerouslySetInnerHTML={{ __html: style }} /> : null}
          {liveCode
            ? (
              <LiveProvider
                scope={{
                  ...scope
                }}
                code={liveCode}
                theme={github}
                noInline={liveCode ? liveCode.includes('render(') : false}
                language={lang}
              >
                {!iframe
                  ? (
                    <div className="demo-component">
                      <LivePreview
                        style={
                          /import { (\w{3,},\s)*(Row|Col|Layout)(,\s\w{3,})* } from 'kui'/g.test(code)
                            ? { width: '100%' }
                            : { width: 'auto' }
                        }
                      />
                    </div>
                    )
                  : null}
                <LiveError style={errorCodeStyle} />
                <div className="code-content" style={{ height: height }}>
                  <div ref={editorEl}>
                    <LiveEditor
                      onChange={onCodeChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      code={editCode}
                      language={lang}
                    />
                  </div>
                  {highlightedStyle
                    ? (
                      <div key="style" className="highlight" ref={styleEl}>
                        <pre>
                          <code className="css" dangerouslySetInnerHTML={{ __html: highlightedStyle }} />
                        </pre>
                      </div>
                      )
                    : null}
                </div>
              </LiveProvider>
              )
            : null}
        </div>
      </div>
    </>
  )
}

export default React.memo(LiveDemo)

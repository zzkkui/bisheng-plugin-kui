import * as types from '@babel/types'
import generator from '@babel/generator'
import { transform } from '@babel/standalone'
import traverse from '@babel/traverse'

export default function transformer (code, parserOpts) {
  const { ast } = transform(code, { ast: true, ...parserOpts })

  const codeAst = ast

  let renderReturn = null
  traverse(codeAst, {
    CallExpression (callPath) {
      const callPathNode = callPath.node
      if (
        callPathNode.callee &&
        callPathNode.callee.object &&
        callPathNode.callee.object.name === 'ReactDOM' &&
        callPathNode.callee.property &&
        callPathNode.callee.property.name === 'render'
      ) {
        renderReturn = types.returnStatement(callPathNode.arguments[0])

        callPath.remove()
      }
    }
  })

  const astProgramBody = codeAst.program.body
  // ReactDOM.render always at the last of preview method
  if (renderReturn) {
    astProgramBody.push(renderReturn)
  }

  const codeBlock = types.BlockStatement(astProgramBody)
  const previewFunction = types.functionDeclaration(types.Identifier('getIframeCode'), [], codeBlock)

  return generator(types.program([previewFunction]), {}, code).code
}


// 严格区分commonJS文件和ES6文件
// https://babel.docschina.org/docs/en/options#sourcetype
// https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
const { ESBuildMinifyPlugin } = require('esbuild-loader')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  source: {
    docs: './docs'
  },
  themeConfig: {
    // 这里为空也要配个空对象，不然报错
  },
  output: './dist',
  hash: true,
  theme: './src',
  htmlTemplate: './src/static/template.html',
  root: '/',
  port: 8003,
  webpackConfig (config) {
    config.externals = {
      'react-router-dom': 'ReactRouterDOM'
    }

    if (isDev) {
      config.devtool = 'source-map'

      // Resolve use react hook fail when yarn link or npm link
      // https://github.com/webpack/webpack/issues/8607#issuecomment-453068938
      config.resolve.alias = {
        ...config.resolve.alias,
        'react/jsx-runtime': require.resolve('react/jsx-runtime'),
        react: require.resolve('react')
      }
    } else if (process.env.ESBUILD) {
      // use esbuild
      config.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true
        })
      ]
    }

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })

    delete config.module.noParse

    return config
  }
}

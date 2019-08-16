const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const MODE = 'development'
const enabledSourceMap = MODE === 'development'

module.exports = [
  {
    mode: MODE,
    entry: './src/app.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, './dist')
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm.js',
        vuex: 'vuex/dist/vuex.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: enabledSourceMap,

                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: enabledSourceMap
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  }
]
import test from 'ava'
import webpack from 'webpack'
import WebpackNightWatchPlugin from '../lib/index'

const webpackConfig = {
  plugins: [
    new WebpackNightWatchPlugin({
      onEmit: true,
      url: './nightwatch.conf.js'
    })
  ]
}

test('webpack', async t => {
  const promise = new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err)
      }
      resolve(typeof stats)
    })
  })
  t.is(await promise, 'object')
})


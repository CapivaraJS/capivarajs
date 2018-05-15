import path from 'path'
import {spawn, spawnSync} from 'child_process'

export default class WebpackNightWatchPlugin {

  constructor(options = {}) {
    const defaultOptions = {
      onEmit: false
    }
    this.options = Object.assign({}, defaultOptions, options)
  }

  apply(compiler) {

    compiler.plugin('compilation', (compilation) => {
      spawnSync('pkill', ['-f', 'selenium'])
    })

    compiler.plugin(this.options.onEmit ? 'emit' : 'done', (compilation, callback) => {
      const env = Object.assign({}, process.env, {LANG: 'en_US.UTF-8'});
      console.log(__dirname)
      const nightwatch = spawn(path.join(__dirname, '../node_modules/.bin/nightwatch'), [
        '-c',
        this.options.url
      ], {env})

      nightwatch.stdout.on('data', data => {
        process.stdout.write(data.toString())
      })

      nightwatch.stderr.on('data', data => {
        process.stdout.write(data.toString())
      })

      nightwatch.on('close', () => {
        if (this.options.onEmit) callback()
        spawnSync('pkill', ['-f', 'selenium'])
      })
    })

  }
}

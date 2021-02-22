import path from 'path'
import flow from 'lodash.flow'
import { get } from '../dc-config'

const glob = require('glob-fs')({ gitignore: true })

interface Plugin {
  type: string
  init: (conifg: Config, files: any) => Promise<void>
}
interface Config {
  include: Array<string>
  styles: Array<string>
  plugins: Array<Plugin>
}

const findPlugin = (key: string) => (plugin: Plugin) => plugin.type === key

export async function build() {
  const config: Config = await get()
  const frameworkPlugins = config.plugins.filter(findPlugin('file'))

  const files = config.include.map((pattern) =>
    glob.readdirSync(path.join(pattern))
  )

  console.log(frameworkPlugins)
  flow(frameworkPlugins.map((plugin) => () => plugin.init(config, files)))()

  console.log(files)
}

import path from 'path'

const FILE_NAME = 'dc-visualization-sdk.config.js'

export async function get() {
  const root = process.cwd()

  const { default: config } = await import(path.join(root, FILE_NAME))

  return config
}

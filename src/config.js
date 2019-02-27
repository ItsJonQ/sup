const fs = require('fs')
const path = require('path')
const { root, readFile, writeFile } = require('./utils')
const mkdirp = require('mkdirp')
const ini = require('ini')

const configDir = path.join(root, '.config/sup')
const configPath = path.join(configDir, 'sup')
const defaultDir = path.join(root, '.sup')
const DIRECTORY = 'dir'
const EDITOR = 'editor'

const defaultConfig = {
  [EDITOR]: 'vim',
}

const setupConfigDir = () => {
  if (fs.existsSync(configDir)) return
  mkdirp.sync(configDir)
}

const readConfig = async () => {
  if (!fs.existsSync(configPath)) {
    await writeFile(configPath, ini.encode(defaultConfig))
  }
  const config = await readFile(configPath)

  return ini.parse(config)
}

exports.get = async () => {
  setupConfigDir()

  const config = await readConfig()

  return config
}

exports.set = async props => {
  const config = await exports.get()

  const nextConfig = ini.encode({
    ...config,
    ...props,
  })

  await writeFile(configPath, nextConfig)

  return nextConfig
}

exports.getDirectory = async () => {
  const config = await exports.get()

  return config[DIRECTORY] || defaultDir
}

exports.getEditor = async () => {
  const config = await exports.get()

  return config[EDITOR] || defaultConfig[EDITOR]
}

exports.setDirectory = async dir => {
  const config = await exports.set({ [DIRECTORY]: dir })

  return config
}

exports.setEditor = async (editor = 'vim') => {
  const config = await exports.set({ [EDITOR]: editor })

  return config
}

exports.configDir = configDir
exports.configPath = configDir
exports.defaultDir = defaultDir

exports.DIRECTORY = DIRECTORY
exports.EDITOR = EDITOR

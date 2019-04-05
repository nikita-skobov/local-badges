const path = require('path')
const fs = require('fs')

const DEFAULT_CONFIG_NAME = 'badgeConfig.js'
const DEFAULT_STATE = {
  format: 'svg',
  color: 'lightgray',
  labelColor: 'gray',
  template: 'flat',
  text: [
    'boring',
    'badge',
  ],
}

const has = Object.prototype.hasOwnProperty


function isFile(filePath) {
  return fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()
}

function loadModule(cliObj) {
  const configPath = cliObj.config
  const currentDirectory = process.cwd()
  const absolutePath = path.isAbsolute(configPath)
    ? configPath
    : path.resolve(currentDirectory, configPath)

  if (isFile(absolutePath)) {
    // eslint-disable-next-line
    return require(absolutePath)
  }

  throw new Error(`unable to resolve configuration file: ${configPath} in directory: ${currentDirectory}`)
}

function hasBadges(configObj) {
  const hasBadgesProp = has.call(configObj, 'badges')
  const badgesIsArray = hasBadges && Array.isArray(configObj.badges)
  const badgeArrayNotEmpty = badgesIsArray && (configObj.badges.length > 0)

  return hasBadgesProp && badgesIsArray && badgeArrayNotEmpty
}

function loadConfig(cliOpts, moduleLoaderFunction = loadModule, badgeRunnerFunc = badgeRunner) {
  const cliObj = { ...cliOpts }

  if (!has.call(cliObj, 'config')) {
    cliObj.config = DEFAULT_CONFIG_NAME
  }

  const configObj = {}
  const userConfig = moduleLoaderFunction(cliObj)

  if (!hasBadges(userConfig)) {
    console.log('No badges found in configuration file. Exiting')
    process.exit(0)
  }

  configObj.badges = userConfig.badges
  configObj.defaults = { ...DEFAULT_STATE }

  if (has.call(userConfig, 'defaults')) {
    // override any default options that the user provided
    Object.keys(userConfig.defaults).forEach((key) => {
      configObj.defaults[key] = userConfig.defaults[key]
    })
  }

  badgeRunnerFunc(configObj, cliObj)
}


module.exports = {
  hasBadges,
  loadConfig,
  loadModule,
  isFile,
  DEFAULT_CONFIG_NAME,
  DEFAULT_STATE,
}

#!/usr/bin/env node

const { loadConfig } = require('../lib/loadConfig')
const {
  parseCommandLineArguments,
  init,
} = require('../lib/cli')

init(process.argv, parseCommandLineArguments, loadConfig)

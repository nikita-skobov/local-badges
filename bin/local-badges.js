#!/usr/bin/env node

const {
  parseCommandLineArguments,
  init,
} = require('../lib/cli')


function main(initFunc, parseFunc, nextFunc) {
  initFunc(process.argv, parseFunc, nextFunc)
}

main(init, parseCommandLineArguments, () => {})

module.exports = main

/* eslint-disable */

const { execSync } = require('child_process')
const fs = require('fs')

describe('the config modules: ', () => {
  // get the name of all config modules in this directory
  // make sure to only grab files that are js modules, not .test.js
  const configModules = []
  const allFiles = fs.readdirSync('./configTests')
  allFiles.forEach((fname) => {
    const dotIndex = fname.indexOf('.')
    const numberOfCharsAfterDot = fname.length - dotIndex
    const extension = fname.substr(dotIndex, numberOfCharsAfterDot)
    if (extension === '.js') {
      configModules.push(fname)
    }
  })

  const len = configModules.length
  for (let i = 0; i < len; i += 1) {
    const fname = configModules[i]
    // for each configuration file, run the local-badges command
    // on that config file, which causes badges to be generated in
    // configTests/temp/**
    // run snapshot test on every single badge from that directory,
    // and then delete the directory recursively, and run the next
    // test on the next configuration file.
    describe(`testing configuration file: ${fname}`, () => {
      beforeAll(() => {
        execSync(`node bin/local-badges.js --config configTests/${fname}`)
      })

      afterAll(() => {
        execSync('rm -r ./configTests/temp/')
      })

      describe('the badge(s): ', () => {
        let badgeFileNames
        let badgeFileNameStr
        beforeAll(() => {
          badgeFileNames = fs.readdirSync('./configTests/temp/')
          for (let j = 0; j < badgeFileNames.length; j += 1) {
            if (!badgeFileNameStr) {
              badgeFileNameStr = `${badgeFileNames[j]}`
            } else {
              badgeFileNameStr = `${badgeFileNameStr}, ${badgeFileNames[j]}`
            }
          }
        })

        it('should match the snapshot(s)', () => {
          const badgeData = []
          badgeFileNames.forEach((badgeName) => {
            badgeData.push({
              fileName: badgeName,
              fileContents: fs.readFileSync(`./configTests/temp/${badgeName}`, { encoding: 'UTF-8' })
            })
          })
          expect(badgeData).toMatchSnapshot()
        })
      })
    })
  }
})

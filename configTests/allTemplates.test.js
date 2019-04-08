/* eslint-disable */

const { execSync } = require('child_process')
const fs = require('fs')

// const configModules = []
// beforeAll(() => {
//   const allFiles = fs.readdirSync('./configTests')
//   allFiles.forEach((fname) => {
//     const dotIndex = fname.indexOf('.')
//     const numberOfCharsAfterDot = fname.length - dotIndex
//     const extension = fname.substr(dotIndex, numberOfCharsAfterDot)
//     console.log(extension)
//     if (extension === '.js') {
//       configModules.push(fname)
//     }
//   })
// })

describe('the config modules: ', () => {
  // get the name of all config modules in this directory
  // make sure to only grab files that are js modules
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
  // configModules.forEach((fname) => {
  //   describe(`testing configuration file: ${fname}`, () => {
  //     it('should be a string', () => {
  //       expect(typeof fname).toBe('string')
  //     })
  //   })
  // })
})

// beforeAll(() => {
//   execSync('node bin/local-badges.js --config configTests/allTemplates.js')
// })

// afterAll(() => {
//   execSync('rm -r ./configTests/temp/')
// })

// it('should create all the badges the same way every time', () => {
//   const fileNames = fs.readdirSync('./configTests/temp/')
//   expect(Array.isArray(fileNames)).toBe(true)
// })

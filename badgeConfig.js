const folder = './badges'
const fs = require('fs')

function getMainMetricSnippet(str) {
  const metricStartsAt = str.indexOf('name="All files"')
  const bufferRoom = 300
  // the line we want probably isnt more than 300 chars
  return str.substr(metricStartsAt, bufferRoom)
}

function grabKeyword(str, keyword) {
  const len = keyword.length
  const keywordStartsAt = str.indexOf(keyword)

  // add 2 because ="
  const valueStartsAt = keywordStartsAt + len + 2
  const valueAndRestOfString = str.substr(valueStartsAt)
  const parenthesesIndex = valueAndRestOfString.indexOf('"')
  return valueAndRestOfString.substr(0, parenthesesIndex)
}

function grabKeywords(str, keywords) {
  return keywords.map(word => parseInt(grabKeyword(str, word), 10))
}

module.exports = {
  badges: [
    {
      name: 'boring-default-badge',
      folder,
    },
    {
      // I made this specifically for the jest clover.xml report
      name: 'coverage',
      folder,
      fn: (cliObj) => {
        const coveragePath = cliObj['coverage-path']
        const cloverData = fs.readFileSync(coveragePath, { encoding: 'UTF-8' })
        const metricSnippet = getMainMetricSnippet(cloverData)

        const [
          statements,
          coveredstatements,
          conditionals,
          coveredconditionals,
          methods,
          coveredmethods,
        ] = grabKeywords(metricSnippet, [
          'statements',
          'coveredstatements',
          'conditionals',
          'coveredconditionals',
          'methods',
          'coveredmethods',
        ])

        const covered = (coveredconditionals + coveredstatements + coveredmethods)
        const all = (conditionals + statements + methods)
        const totalPercentage = Math.floor((covered / all) * 100)

        const returnObj = {
          text: ['coverage', `${totalPercentage}%`],
          colorA: 'grey',
        }

        // you can pick your own range, and colors here
        if (totalPercentage > 85) {
          returnObj.colorB = 'brightgreen'
        } else if (totalPercentage > 60) {
          returnObj.colorB = 'yellow'
        } else {
          returnObj.colorB = 'orange'
        }

        return returnObj
      },
    },
    {
      // build status can just come from a flag
      name: 'build-status',
      folder,
      fn: (cliObj) => {
        const returnObj = {
          text: ['build', 'failing'],
          colorB: 'red',
        }
        if (cliObj['build-status'] && cliObj['build-status'] === 'SUCCESS') {
          returnObj.text[1] = 'passing'
          returnObj.colorB = 'brightgreen'
        }
        return returnObj
      },
    },
  ],
  defaults: {
    colorA: 'grey',
  },
}

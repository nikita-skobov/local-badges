const folder = './badges'
const fs = require('fs')

module.exports = {
  badges: [
    {
      name: 'boring-default-badge',
      folder,
      fn: () => ({
        colorB: 'purple',
        template: 'plastic',
      }),
    },
    {
      name: 'coverage',
      folder,
      fn: (cliObj) => {
        const coveragePath = cliObj['coverage-path']
        const cloverData = fs.readFileSync(coveragePath, { encoding: 'UTF-8' })
        console.log(cloverData)
      },
    },
  ],
  defaults: {
    colorA: 'red',
  },
}

module.exports = {
  badges: [
    {
      name: 'some-badge',
      folder: './',
      fn: (cliObj) => {
        const template = 'plastic'
        const colorB = cliObj.successFlag ? 'green' : 'red'
        const text = ['build', cliObj.successFlag ? 'passing' : 'failing']
        return {
          colorB,
          template,
          text,
        }
      },
    },
  ],
  defaults: {
    colorA: 'red',
  },
}

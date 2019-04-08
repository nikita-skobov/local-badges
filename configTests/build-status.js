const folder = './configTests/temp'

module.exports = {
  badges: [
    {
      // this badge will be different depending on whether or not
      // you pass in a --successFlag option when running local-badges
      name: 'build-status',
      folder,
      fn: (cliObj) => {
        const colorB = cliObj.successFlag ? 'green' : 'red'
        const passOrFail = cliObj.successFlag ? 'passing' : 'failing'
        const text = ['build', passOrFail]
        return {
          colorA: 'gray',
          colorB,
          text,
        }
      },
    },
  ],

  // all badges will have the colorA property be purple unless the individual
  // badge object overrides the colorA property either as a static property
  // eg: boring-badge
  // or if the fn function returns a different colorA property
  // eg: build-status
  defaults: {
    colorA: 'purple',
  },
}

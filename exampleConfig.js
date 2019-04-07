const name = 'some-badge'

module.exports = {
  badges: [
    {
      name,
      folder: './',
      fn: () => {
        return {
          colorB: 'purple',
          template: 'plastic',
        }
      },
    },
  ],
  defaults: {
    colorA: 'red',
  },
}

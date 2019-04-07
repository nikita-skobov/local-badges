const name = 'some-badge'

module.exports = {
  badges: [
    {
      name,
      folder: './',
      fn: () => ({
        colorB: 'purple',
        template: 'plastic',
      }),
    },
  ],
  defaults: {
    colorA: 'red',
  },
}

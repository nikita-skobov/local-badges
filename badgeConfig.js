const name = 'some-badge'

module.exports = {
  badges: [
    {
      name,
      folder: './badges/',
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

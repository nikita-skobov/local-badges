const DEFAULT_CONFIG_NAME = 'badgeConfig.js'
const DEFAULT_STATE = {
  format: 'svg', // can be svg, or png. if png needs to do svg-to-png
  colorA: 'gray', // left side of badge
  colorB: 'lightgray', // right side of badge
  template: 'flat',
  // (default = flat = popout)
  // flat
  // popout
  // default
  // plastic
  // (popout-square = flat-square)
  // popout-square
  // flat-square
  // for-the-badge
  // social (no colors)
  text: [
    'boring', // if first text element is empty string
    'badge', // it makes badge with colorB only
  ],
}

module.exports = {
  DEFAULT_CONFIG_NAME,
  DEFAULT_STATE,
}

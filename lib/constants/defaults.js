const DEFAULT_CONFIG_NAME = 'badgeConfig.js'
const FUNCTION_KEY = 'fn'
const FILE_KEY = 'name'
const FOLDER_KEY = 'folder'

const DEFAULT_STATE = {
  format: 'svg', // can be svg only for now
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

  [FOLDER_KEY]: './',
}

const ALLOWED_TEMPLATES = [
  'default',
  'flat',
  'popout',
  'plastic',
  'popout-square',
  'flat-square',
  'for-the-badge',
  'social',
]

const ALLOWED_FORMATS = [
  'svg',
]

module.exports = {
  DEFAULT_CONFIG_NAME,
  DEFAULT_STATE,
  ALLOWED_FORMATS,
  ALLOWED_TEMPLATES,
  FUNCTION_KEY,
  FILE_KEY,
  FOLDER_KEY,
}

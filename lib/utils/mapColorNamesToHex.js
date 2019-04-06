const { allColorMap } = require('../constants/colorWords')

const has = Object.prototype.hasOwnProperty

function mapColorNamesToHex(state) {
  const colorNameCheck = (name) => {
    const color = state[name]
    if (has.call(allColorMap, color)) {
      return allColorMap[color]
    }

    // it is implied by this point that if the color
    // is not in the color map, that it must be a hex color
    // code (since weve already verified it). So here, if the
    // color does not start with a #, we prepend one
    if (color.charAt(0) !== '#') {
      return `#${color}`
    }

    // otherwise color is already a hex color
    return color
  }

  const colorA = colorNameCheck('colorA')
  const colorB = colorNameCheck('colorB')

  return {
    ...state,
    colorA,
    colorB,
  }
}

module.exports = {
  mapColorNamesToHex,
}

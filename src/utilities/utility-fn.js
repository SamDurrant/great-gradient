export const createBgGradient = (layers) => {
  return layers
    .sort((a, b) => b.index - a.index)
    .map((layer, i) => {
      const stops = layer.thumbValues
        .sort((a, b) => a.stop - b.stop)
        .map(
          (val) => `${makeRgba(hexToRgb(val.color), val.opacity)} ${val.stop}%`
        )
        .join(', ')
      return `linear-gradient(${layer.degrees}deg, ${stops}) ${makePosition(
        layer.position
      )} / ${makeSize(layer.size)} no-repeat${
        i !== layers.length - 1 ? ', ' : ''
      }`
    })
    .join('')
}

export const getPercent = (value, max) => (100 * value) / max
export const getValue = (percent, max) => (max / 100) * percent

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const makeRgba = (color, opacity) => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
}

const makePosition = (positions) => {
  return `${positions.x}${positions.unitX} ${positions.y}${positions.unitY}`
}

const makeSize = (size) => {
  return `${size.x}${size.unitX} ${size.y}${size.unitY}`
}

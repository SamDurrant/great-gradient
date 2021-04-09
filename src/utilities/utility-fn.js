export const createBgGradient = (layers) => {
  return layers
    .sort((a, b) => b.id - a.id)
    .map((layer, i) => {
      const stops = layer.thumbValues
        .sort((a, b) => a.stop - b.stop)
        .map((val) => `${val.color} ${val.stop}%`)
        .join(', ')
      return `linear-gradient(${layer.degrees}deg, ${stops}) ${
        layer.position
      } no-repeat${i !== layers.length - 1 ? ', ' : ''}`
    })
    .join('')
}

export const getPercent = (value, max) => (100 * value) / max
export const getValue = (percent, max) => (max / 100) * percent

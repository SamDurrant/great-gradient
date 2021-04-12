import React from 'react'
import './ColorStopList.css'
import ColorStop from './ColorStop'

export default function ColorStopList({ colorStops }) {
  return (
    <div>
      {colorStops.map((color) => (
        <ColorStop
          color={color}
          colorStopLength={colorStops.length}
          key={color.id}
        />
      ))}
    </div>
  )
}

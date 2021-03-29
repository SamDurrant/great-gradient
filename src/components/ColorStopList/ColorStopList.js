import React, { useContext } from 'react'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import { GradientContext } from '../../context/GradientContext'

export default function ColorStopList({ colorStops }) {
  const { dispatch } = useContext(GradientContext)

  const handleColorValue = (e) => {
    dispatch({
      type: 'UPDATE-COLOR-VAL',
      payload: { colorid: parseInt(e.target.id), color: e.target.value },
    })
  }

  const handleColorStop = (e) => {
    console.log(e.target.value, e.target.id)
    dispatch({
      type: 'UPDATE-COLOR-STOP',
      payload: {
        colorid: parseInt(e.target.id),
        stop: parseInt(e.target.value),
      },
    })
  }

  return (
    <div>
      <h3>Color Stops:</h3>
      {colorStops.map((color) => (
        <div key={color.id} style={{ display: 'flex', alignItems: 'center' }}>
          <InputWithLabel
            id={color.id}
            value={color.color}
            type="color"
            labelText={color.color}
            onInputChange={handleColorValue}
          />
          <InputWithLabel
            id={color.id}
            value={color.stop}
            type="number"
            labelText={'stop'}
            onInputChange={handleColorStop}
            min={0}
            max={100}
          />
        </div>
      ))}
    </div>
  )
}

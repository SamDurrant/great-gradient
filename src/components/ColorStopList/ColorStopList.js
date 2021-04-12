import React, { useContext } from 'react'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import { GradientContext } from '../../context/GradientContext'
import './ColorStopList.css'
import Button from '../Button/Button'

export default function ColorStopList({ colorStops }) {
  const { dispatch } = useContext(GradientContext)

  const handleColorValue = (e, colorid) => {
    dispatch({
      type: 'UPDATE-COLOR-VAL',
      payload: { colorid: colorid, color: e.target.value },
    })
  }

  const handleColorStop = (e, colorid) => {
    dispatch({
      type: 'UPDATE-COLOR-STOP',
      payload: {
        colorid: colorid,
        stop: parseInt(e.target.value),
      },
    })
  }

  const handleRemoveColor = (e, colorid) => {
    dispatch({
      type: 'REMOVE-GRADIENT-FROM-LAYER',
      payload: { colorid: colorid },
    })
  }

  return (
    <div>
      {colorStops.map((color) => (
        <div
          key={color.id}
          className={`color-stop ${
            colorStops.length > 2 ? 'color-stop-animated' : ''
          }`}
        >
          <InputWithLabel
            id="color"
            labelid="color"
            value={color.color}
            type="color"
            labelText={color.color}
            onInputChange={(e) => handleColorValue(e, color.id)}
          />
          <InputWithLabel
            id="stop"
            labelid="stop"
            value={color.stop}
            type="number"
            labelText={'stop'}
            onInputChange={(e) => handleColorStop(e, color.id)}
            min={0}
            max={100}
          />
          <Button
            text="-"
            className="delete-btn"
            onClick={(e) => handleRemoveColor(e, color.id)}
          />
        </div>
      ))}
    </div>
  )
}

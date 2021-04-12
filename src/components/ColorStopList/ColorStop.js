import React, { useContext, useRef } from 'react'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import { GradientContext } from '../../context/GradientContext'
import './ColorStopList.css'
import Button from '../Button/Button'
import { fadeOut } from '../../utilities/animations'

export default function ColorStop({ color, colorStopLength }) {
  const { dispatch } = useContext(GradientContext)
  let gradientColor = useRef(null)

  const handleColorValue = (e) => {
    dispatch({
      type: 'UPDATE-COLOR-VAL',
      payload: { colorid: color.id, color: e.target.value },
    })
  }

  const handleColorStop = (e) => {
    dispatch({
      type: 'UPDATE-COLOR-STOP',
      payload: {
        colorid: color.id,
        stop: parseInt(e.target.value),
      },
    })
  }

  const updateContext = () => {
    dispatch({
      type: 'REMOVE-GRADIENT-FROM-LAYER',
      payload: { colorid: color.id },
    })
  }

  const handleRemoveColor = () => {
    fadeOut(gradientColor, updateContext)
  }

  return (
    <div
      ref={(el) => (gradientColor = el)}
      className={`color-stop ${
        colorStopLength > 2 ? 'color-stop-animated' : ''
      }`}
    >
      <InputWithLabel
        id="color"
        labelid="color"
        value={color.color}
        type="color"
        labelText={color.color}
        onInputChange={(e) => handleColorValue(e)}
      />
      <InputWithLabel
        id="stop"
        labelid="stop"
        value={color.stop}
        type="number"
        labelText={'stop'}
        onInputChange={(e) => handleColorStop(e)}
        min={0}
        max={100}
      />
      <Button text="-" className="delete-btn" onClick={handleRemoveColor} />
    </div>
  )
}

import React, { useContext } from 'react'
import { GradientContext } from '../../context/GradientContext'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import SelectWithLabel from '../SelectWithLabel/SelectWithLabel'
import './PositionControls.css'

export default function PositionControls() {
  let { state, dispatch } = useContext(GradientContext)

  const getActiveLayer = () =>
    state.layers.find((layer) => layer.id === state.activeTab)

  const handlePositionChange = (e) => {
    dispatch({
      type: 'UPDATE-POSITION-VAL',
      payload: { [e.target.id]: e.target.value },
    })
  }

  return (
    <div className="bg-position-wrapper">
      <p>background position</p>
      <div className="flex-wrapper">
        <InputWithLabel
          id="x"
          type="number"
          hideLabel={true}
          value={getActiveLayer().position.x}
          onInputChange={handlePositionChange}
        />
        <SelectWithLabel
          id="unitX"
          options={['px', '%', 'em', 'rem']}
          hideLabel={true}
          value={getActiveLayer().position.unitX}
          onSelectChange={handlePositionChange}
        />
        <InputWithLabel
          id="y"
          type="number"
          hideLabel={true}
          value={getActiveLayer().position.y}
          onInputChange={handlePositionChange}
        />
        <SelectWithLabel
          id="unitY"
          options={['px', '%', 'em', 'rem']}
          hideLabel={true}
          value={getActiveLayer().position.unitY}
          onSelectChange={handlePositionChange}
        />
      </div>
    </div>
  )
}

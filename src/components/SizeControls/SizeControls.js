import React, { useContext } from 'react'
import { GradientContext } from '../../context/GradientContext'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import SelectWithLabel from '../SelectWithLabel/SelectWithLabel'
import './SizeControls.css'

export default function SizeControls() {
  let { state, dispatch } = useContext(GradientContext)

  const getActiveLayer = () =>
    state.layers.find((layer) => layer.id === state.activeTab)

  const handleSizeChange = (e) => {
    dispatch({
      type: 'UPDATE-SIZE-VAL',
      payload: { [e.target.id]: e.target.value },
    })
  }

  return (
    <div className="bg-size-wrapper">
      <p>background size</p>
      <div className="flex-wrapper">
        <InputWithLabel
          id="x"
          type="number"
          hideLabel={true}
          value={getActiveLayer().size.x}
          onInputChange={handleSizeChange}
        />
        <SelectWithLabel
          id="unitX"
          options={['px', '%', 'em', 'rem']}
          hideLabel={true}
          value={getActiveLayer().size.unitX}
          onSelectChange={handleSizeChange}
        />
        <InputWithLabel
          id="y"
          type="number"
          hideLabel={true}
          value={getActiveLayer().size.y}
          onInputChange={handleSizeChange}
        />
        <SelectWithLabel
          id="unitY"
          options={['px', '%', 'em', 'rem']}
          hideLabel={true}
          value={getActiveLayer().size.unitY}
          onSelectChange={handleSizeChange}
        />
      </div>
    </div>
  )
}

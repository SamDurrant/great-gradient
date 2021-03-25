import React, { useContext } from 'react'
import { GradientContext } from '../../context/GradientContext'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import Knob from '../Knob/Knob'
import Slider from '../Slider/Slider'
import './DisplayControls.css'

export default function DisplayControls() {
  let { state, dispatch } = useContext(GradientContext)

  const getActiveLayer = () =>
    state.layers.find((layer) => layer.id === state.activeTab)

  const toggleAllLayers = () => {
    dispatch({
      type: 'TOGGLE-ALL-LAYERS',
    })
  }

  return (
    <div className="display-controls">
      <Slider activeLayer={getActiveLayer()} />
      <Knob activeLayer={getActiveLayer()} />
      <InputWithLabel
        id="show-layers"
        value={state.showAllLayers}
        type="checkbox"
        onInputChange={toggleAllLayers}
        labelText="show all layers"
        name="show-layers"
      />
    </div>
  )
}

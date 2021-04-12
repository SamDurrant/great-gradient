import React, { useContext } from 'react'
import { GradientContext } from '../../context/GradientContext'
import Button from '../Button/Button'
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel'
import ColorStopList from '../ColorStopList/ColorStopList'
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

  const addAStop = () => {
    dispatch({
      type: 'ADD-GRADIENT-TO-LAYER',
      payload: { stop: 50 },
    })
  }

  const handleRemoveLayer = () => {
    dispatch({
      type: 'REMOVE-LAYER',
      payload: { id: getActiveLayer().id },
    })
  }

  return (
    <div className="display-controls">
      <Slider activeLayer={getActiveLayer()} />
      <Button text="add a stop" solid onClick={addAStop} />
      <Knob activeLayer={getActiveLayer()} />
      <div className="flex-wrapper">
        <CheckboxWithLabel
          id="show-layers"
          checked={state.showAllLayers}
          onInputChange={toggleAllLayers}
          labelText="show all layers"
          name="show-layers"
        />
        <Button
          text="remove layer"
          className="btn-margin"
          transparent
          onClick={handleRemoveLayer}
        />
      </div>
      <ColorStopList colorStops={getActiveLayer().thumbValues} />
    </div>
  )
}

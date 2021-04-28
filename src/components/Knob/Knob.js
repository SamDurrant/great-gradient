import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import './Knob.css'
import { GradientContext } from '../../context/GradientContext'
import InputWithLabel from '../InputWithLabel/InputWithLabel'
import { setDragTarget, setDragInstance } from '../../utilities/animations'

const StyledKnob = styled.div`
  background: var(--color-primary);
  border-radius: 50%;
  width: 75px;
  height: 75px;
`

const StyledNotch = styled.div`
  height: 50%;
  width: 3px;
  background: var(--color-light);
  margin: 0 auto;
`

export default function Knob({ activeLayer }) {
  const { dispatch } = useContext(GradientContext)
  const [init, setInit] = useState(true)
  const dragInstance = useRef(null)
  const dragTarget = useRef(null)

  const handleDegreeInput = (e) => {
    let rotation = e.target.value < 0 ? 359 : parseInt(e.target.value % 360, 10)
    setInit(true)
    dispatch({
      type: 'UPDATE-DEGREE-VAL',
      payload: { id: activeLayer.id, new: rotation },
    })
  }

  useEffect(() => {
    if (init) {
      setDragTarget(dragTarget.current, activeLayer.degrees)
      setInit(false)
    }
  }, [activeLayer.degrees, init])

  useEffect(() => {
    setInit(true)
    function handleOnDrag(rotate) {
      let rotation = parseInt(rotate % 360, 10)
      dispatch({
        type: 'UPDATE-DEGREE-VAL',
        payload: { id: activeLayer.id, new: rotation },
      })
    }
    dragInstance.current = setDragInstance(dragTarget.current, handleOnDrag)
  }, [activeLayer.id, dispatch])

  return (
    <div className="knob-container">
      <StyledKnob className="draggable" ref={dragTarget}>
        <StyledNotch></StyledNotch>
      </StyledKnob>
      <div>
        <InputWithLabel
          id="degree-input"
          value={activeLayer.degrees}
          type="number"
          onInputChange={handleDegreeInput}
          hideLabel={true}
          inputMargin="0 0 0 15px"
        />
      </div>
    </div>
  )
}

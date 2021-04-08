import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import './Knob.css'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import { GradientContext } from '../../context/GradientContext'
import InputWithLabel from '../InputWithLabel/InputWithLabel'

const StyledKnob = styled.div`
  background: #3d5a80;
  border-radius: 50%;
  width: 75px;
  height: 75px;
`

const StyledNotch = styled.div`
  height: 50%;
  width: 3px;
  background: #f8f9fa;
  margin: 0 auto;
`

gsap.registerPlugin(Draggable)

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
      gsap.set(dragTarget.current, { rotation: activeLayer.degrees })
      setInit(false)
    }
  }, [activeLayer.degrees, init])

  useEffect(() => {
    setInit(true)
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: 'rotation',
      rotation: 90,
      onDrag: function () {
        let rotation = parseInt(this.rotation % 360, 10)
        dispatch({
          type: 'UPDATE-DEGREE-VAL',
          payload: { id: activeLayer.id, new: rotation },
        })
      },
    })
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

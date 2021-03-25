import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import './Knob.css'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import { GradientContext } from '../../context/GradientContext'

const StyledKnob = styled.div`
  background: var(--color-green);
  border-radius: 50%;
  width: 75px;
  height: 75px;
`

const StyledNotch = styled.div`
  height: 50%;
  width: 3px;
  background: #000;
  margin: 0 auto;
`

const StyledDegrees = styled.div`
  font-size: 20px;
  color: white;
  margin-left: 15px;
`

gsap.registerPlugin(Draggable)

export default function Knob({ activeLayer }) {
  const { dispatch } = useContext(GradientContext)
  const [init, setInit] = useState(true)
  const degrees = useRef(null)
  const dragInstance = useRef(null)
  const dragTarget = useRef(null)

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
        degrees.current.textContent = rotation < 0 ? rotation + 360 : rotation
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
      <StyledDegrees ref={degrees}>{activeLayer.degrees}</StyledDegrees>
    </div>
  )
}

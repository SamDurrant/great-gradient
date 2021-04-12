import { useRef, useContext, useState } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'
import SliderThumb from '../SliderThumb/SliderThumb'
import { getPercent, getValue } from '../../utilities/utility-fn'

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #3d5a80;
  height: 15px;
  width: 90%;
  margin: 0 auto 4rem;
`

function Slider({ activeLayer, formatFn = (num) => num.toFixed(0) }) {
  let { state, dispatch } = useContext(GradientContext)
  let [lastTap, setLastTap] = useState(0)
  const sliderRef = useRef()
  let timeout = null

  const finishAddThumb = (stop) => {
    const newPercentage = getPercent(stop, sliderRef.current.offsetWidth)
    const newValue = getValue(newPercentage, 100)
    dispatch({
      type: 'ADD-GRADIENT-TO-LAYER',
      payload: { stop: formatFn(newValue) },
    })
  }

  const mouseAddThumb = (e) => {
    const stop = e.clientX - sliderRef.current.getBoundingClientRect().left
    finishAddThumb(stop)
  }

  const touchAddThumb = (e) => {
    let currentTime = new Date().getTime()
    let tapLength = currentTime - lastTap
    clearTimeout(timeout)
    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault()
      const stop =
        e.changedTouches[0].clientX -
        sliderRef.current.getBoundingClientRect().left
      finishAddThumb(stop)
    } else {
      timeout = setTimeout(() => clearTimeout(timeout), 500)
    }
    setLastTap(currentTime)
  }

  return (
    <StyledSlider
      ref={sliderRef}
      onDoubleClick={mouseAddThumb}
      onTouchEnd={touchAddThumb}
    >
      {activeLayer.thumbValues
        .sort((a, b) => a.stop - b.stop)
        .map((val) => (
          <SliderThumb
            key={val.id}
            sliderRef={sliderRef}
            formatFn={formatFn}
            initialValue={val.stop}
            color={val.color}
            id={val.id}
            max={state.max}
          />
        ))}
    </StyledSlider>
  )
}

export default Slider

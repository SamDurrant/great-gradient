import { useRef, useContext } from 'react'
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
  const sliderRef = useRef()

  const addThumb = (e) => {
    const stop = e.clientX - sliderRef.current.getBoundingClientRect().left
    const newPercentage = getPercent(stop, sliderRef.current.offsetWidth)
    const newValue = getValue(newPercentage, 100)
    dispatch({
      type: 'ADD-GRADIENT-VAL',
      payload: { stop: formatFn(newValue) },
    })
  }

  return (
    <StyledSlider ref={sliderRef} onDoubleClick={addThumb}>
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

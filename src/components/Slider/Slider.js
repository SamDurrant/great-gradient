import { useRef, useContext } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'
import SliderThumb from '../SliderThumb/SliderThumb'

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #ededed;
  height: 15px;
  width: 90%;
  margin: 0 auto;
`

function Slider({ activeLayer, formatFn = (num) => num.toFixed(0) }) {
  let { state } = useContext(GradientContext)
  const sliderRef = useRef()

  return (
    <StyledSlider ref={sliderRef}>
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

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

function Slider({ formatFn = (num) => num.toFixed(0) }) {
  let { state } = useContext(GradientContext)
  const sliderRef = useRef()

  const getActiveLayer = () =>
    state.layers.find((layer) => layer.id === state.activeTab)

  return (
    <StyledSlider ref={sliderRef}>
      {getActiveLayer()
        .thumbValues.sort((a, b) => a.stop - b.stop)
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

/**
 * clientX - horizontal coordinate relative to the window
 * getBoundingClientRect().left - horizontal coordinate for element starting point relative to window
 * offsetWidth - provides full width of element including borders
 */

import { Fragment, useRef, useContext } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'

const StyledThumb = styled.div`
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: absolute;
  top: -5px;
  border: 2px solid var(--color-green);
  cursor: pointer;
`

const ThumbLabel = styled.span`
  display: block;
  position: absolute;
  top: 30px;
  width: 30px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
`

const getPercent = (value, max) => (100 * value) / max
const getValue = (percent, max) => (max / 100) * percent
const getLeftCss = (percent, offset) => `calc(${percent}% - ${offset}px)`

function SliderThumb({ sliderRef, formatFn, initialValue, color, max, id }) {
  let { dispatch } = useContext(GradientContext)

  const thumbRef = useRef()
  const thumbLabelRef = useRef()
  const diff = useRef()
  const initialPercent = getPercent(initialValue, max)

  const handleMouseMove = (e) => {
    let newThumbX =
      e.clientX - diff.current - sliderRef.current.getBoundingClientRect().left

    // calc start and end of slider range
    const end = sliderRef.current.offsetWidth
    const start = 0

    // check if position is out of slider range
    if (newThumbX < start) {
      newThumbX = 0
    } else if (newThumbX > end) {
      newThumbX = end
    }

    const newPercentage = getPercent(newThumbX, end)
    const newValue = getValue(newPercentage, max)
    dispatch({
      type: 'UPDATE-GRADIENT-VAL',
      payload: { id, new: formatFn(newValue) },
    })
    thumbRef.current.style.left = getLeftCss(newPercentage, 5)
    thumbLabelRef.current.style.left = getLeftCss(newPercentage, 15)
    thumbLabelRef.current.textContent = formatFn(newValue)
  }

  const handleMouseUp = (e) => {
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mousemove', handleMouseMove)
  }

  const handleMouseDown = (e) => {
    diff.current = e.clientX - thumbRef.current.getBoundingClientRect().left
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <Fragment>
      <ThumbLabel
        style={{ left: getLeftCss(initialPercent, 15) }}
        ref={thumbLabelRef}
      >
        {initialValue}
      </ThumbLabel>
      <StyledThumb
        style={{ left: getLeftCss(initialPercent, 5), background: color }}
        ref={thumbRef}
        onMouseDown={handleMouseDown}
      />
    </Fragment>
  )
}

export default SliderThumb

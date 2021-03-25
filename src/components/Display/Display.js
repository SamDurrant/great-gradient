import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'

const StyledDisplay = styled.div`
  border: 2px solid #7ba123;
  width: 90%;
  height: 40vh;
  margin: 2rem auto;
`

function Display() {
  let { state } = useContext(GradientContext)

  const getActiveLayer = () => {
    if (state.activeTab === 'All') return state.layers
    return state.layers.filter((layer) => layer.id === state.activeTab)
  }

  const createBackgroundGradient = (layers) => {
    return layers
      .sort((a, b) => b.id - a.id)
      .map((layer) => {
        const stops = layer.thumbValues
          .map((val) => `${val.color} ${val.stop}%`)
          .join(', ')
        return `linear-gradient(90deg, ${stops}) ${layer.position} no-repeat`
      })
  }

  return (
    <StyledDisplay
      style={{
        background: createBackgroundGradient(getActiveLayer()),
      }}
    ></StyledDisplay>
  )
}

export default Display

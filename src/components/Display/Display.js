import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'
import { createBgGradient } from '../../utilities/utility-fn'

const StyledDisplay = styled.div`
  border: 2px solid var(--color-primary);
  width: 90%;
  height: 40vh;
  margin: 2rem auto;
`

function Display() {
  let { state } = useContext(GradientContext)

  const getActiveLayer = () => {
    if (state.activeTab === 'All' || state.showAllLayers) return state.layers
    return state.layers.filter((layer) => layer.id === state.activeTab)
  }

  return (
    <StyledDisplay
      style={{
        background: createBgGradient(getActiveLayer()),
      }}
    ></StyledDisplay>
  )
}

export default Display

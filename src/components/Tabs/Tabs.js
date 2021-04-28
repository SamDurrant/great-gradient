import React, { Fragment } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { GradientContext } from '../../context/GradientContext'

const StyledUl = styled.ul`
  display: flex;
  align-items: flex-start;
  max-width: 90%;
  overflow: scroll;
`

const StyledTab = styled.li`
  background: ${(props) => (props.active ? 'var(--color-primary)' : 'none')};
  color: ${(props) =>
    props.active ? 'var(--color-light)' : 'var(--color-dark)'};
  padding: 10px 20px;
  font-weight: bold;
  margin: 0 15px;
  cursor: pointer;

  &:nth-of-type(1) {
    margin: 0 15px 0 0;
  }
`

function Tabs() {
  let { state, dispatch } = useContext(GradientContext)

  const changeActiveTab = (id) => {
    dispatch({
      type: 'SET-ACTIVE-LAYER',
      payload: { activeLayer: id },
    })
  }

  const createTabs = (layers) => {
    const userLayers = layers
      .sort((a, b) => a.index - b.index)
      .map((layer, i) => (
        <StyledTab
          key={layer.id}
          active={state.activeTab === layer.id}
          onClick={() => changeActiveTab(layer.id)}
        >
          {i + 1}
        </StyledTab>
      ))
    return (
      <Fragment>
        <StyledTab
          key={'all'}
          active={state.activeTab === 'All'}
          onClick={() => changeActiveTab('All')}
        >
          All
        </StyledTab>
        {userLayers}
      </Fragment>
    )
  }

  return <StyledUl>{createTabs(state.layers)}</StyledUl>
}

export default Tabs

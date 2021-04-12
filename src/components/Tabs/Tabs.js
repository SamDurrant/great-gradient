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
  background: ${(props) => (props.active ? '#3d5a80' : 'none')};
  color: ${(props) => (props.active ? '#f8f9fa' : '#242424')};
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

  const changeActiveTab = (tabIndex) => {
    dispatch({
      type: 'SET-ACTIVE-LAYER',
      payload: { activeTab: tabIndex },
    })
  }

  const createTabs = (tabs) => {
    const userLayers = tabs.map((tab, i) => (
      <StyledTab
        key={i}
        active={state.activeTab === i + 1}
        onClick={() => changeActiveTab(i + 1)}
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

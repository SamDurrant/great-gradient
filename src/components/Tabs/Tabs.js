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
  background: #ffffff;
  background: ${(props) => (props.active ? '#7ba123' : '#ffffff')};
  padding: 5px 10px;
  margin: 0 15px;
  &:nth-of-type(1) {
    margin: 0 15px 0 0;
  }
`

function Tabs() {
  let { state, dispatch } = useContext(GradientContext)

  const changeActiveTab = (tabIndex) => {
    dispatch({
      type: 'SET-ACTIVE-TAB',
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

import { useContext } from 'react'
import { GradientContext } from '../../context/GradientContext'
import Button from '../Button/Button'
import CodeDisplay from '../CodeDisplay/CodeDisplay'
import Display from '../Display/Display'
import DisplayControls from '../DisplayControls/DisplayControls'
import Tabs from '../Tabs/Tabs'
import './App.css'

function App() {
  let { state, dispatch } = useContext(GradientContext)

  const addNewTab = () => {
    dispatch({
      type: 'ADD-NEW-TAB',
    })
  }

  return (
    <div className="App">
      <div className="tab-container">
        <Tabs />
        <Button solid text={'+'} onClick={addNewTab} className="tabs-btn" />
      </div>
      <Display />
      {state.activeTab !== 'All' ? <DisplayControls /> : <CodeDisplay />}
    </div>
  )
}

export default App

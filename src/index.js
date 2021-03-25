import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { GradientProvider } from './context/GradientContext'

ReactDOM.render(
  <React.StrictMode>
    <GradientProvider>
      <App />
    </GradientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()

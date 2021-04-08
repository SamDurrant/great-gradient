import React, { useContext, useRef } from 'react'
import './CodeDisplay.css'
import { GradientContext } from '../../context/GradientContext'
import Button from '../Button/Button'
import { createBgGradient } from '../../utilities/utility-fn'

export default function CodeDisplay() {
  let { state } = useContext(GradientContext)
  const codeRef = useRef()

  const copyCode = () => {
    let codeCopy = codeRef.current.textContent
    navigator.clipboard.writeText(codeCopy)
  }

  return (
    <div className="code-container">
      <Button onClick={copyCode} text="Copy" transparent className="code-btn" />
      <div className="code-display">
        <code ref={codeRef}>background: {createBgGradient(state.layers)};</code>
      </div>
    </div>
  )
}

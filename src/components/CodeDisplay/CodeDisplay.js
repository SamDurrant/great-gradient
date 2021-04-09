import React, { useContext, useEffect, useRef, useState } from 'react'
import './CodeDisplay.css'
import { GradientContext } from '../../context/GradientContext'
import Button from '../Button/Button'
import { createBgGradient } from '../../utilities/utility-fn'

import { textTimeline } from '../../utilities/animations'

export default function CodeDisplay() {
  let { state } = useContext(GradientContext)
  const codeRef = useRef()

  //Create a variable for our dom nodes
  let success = useRef(null)
  let [showSuccess, setShowSuccess] = useState(false)

  const updateSuccess = () => {
    setShowSuccess(false)
  }

  useEffect(() => {
    if (showSuccess) textTimeline(success, updateSuccess)
  }, [showSuccess])

  const copyCode = () => {
    let codeCopy = codeRef.current.textContent
    navigator.clipboard.writeText(codeCopy)
    setShowSuccess(true)
  }

  return (
    <div className="code-container">
      <div className="btn-container">
        <span className="success-message" ref={(el) => (success = el)}>
          success!
        </span>
        <Button
          onClick={copyCode}
          text="Copy"
          transparent
          className="code-btn"
        />
      </div>
      <div className="code-display">
        <code ref={codeRef}>background: {createBgGradient(state.layers)};</code>
      </div>
    </div>
  )
}

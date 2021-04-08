import React from 'react'
import './Button.css'

function Button({ className, text, solid, transparent, ...props }) {
  const classes = [
    'Button',
    solid && 'Button-solid',
    transparent && 'Button-transparent',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <button className={classes} {...props}>
      {text}
    </button>
  )
}

export default Button

import React from 'react'
import './SelectWithLabel.css'

export default function SelectWithLabel({
  id,
  options,
  hideLabel,
  onSelectChange,
  value,
}) {
  return (
    <div className="select-wrapper">
      {!hideLabel && <label htmlFor={id}>unit</label>}
      <div className="select">
        <select id={id} value={value} onChange={onSelectChange}>
          {options.map((option, i) => (
            <option value={option} key={i}>
              {option}
            </option>
          ))}
        </select>
        <span className="focus"></span>
      </div>
    </div>
  )
}

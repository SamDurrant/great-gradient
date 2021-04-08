import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  width: fit-content;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`

const StyledLabel = styled.label`
  width: 4rem;
  color: #242424;
  display: block;
  margin-right: 1rem;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: right;
  cursor: pointer;
`

const StyledInput = styled.input`
  width: 4rem;
  border: none;
  border-bottom: 0.5px solid #3d5a80;
  background: none;
  color: #242424;
  font-size: 1rem;
  text-align: center;
  padding: 2px 6px;
  margin: ${(props) => props.margin};
  font-weight: 500;
  position: relative;

  &:focus {
    outline: none;
    box-shadow: 0px 0px 4px 4px rgba(61, 90, 128, 0.7);
  }

  &::placeholder {
    color: #555;
    letter-spacing: 1px;
  }

  &[type='color'] {
    border: none;
    border-radius: 0;
    background-color: none;
    padding: 0;
    &::before {
      content: '';
      background: ${(props) => props.value};
      width: inherit;
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
  &[type='color']::focus {
    border-radius: none;
  }
  &[type='checkbox'] {
    border: none;
    border-radius: 0;
    padding: 0;
  }
  &[type='checkbox']::focus {
    border-radius: none;
  }
`

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  labelText,
  name,
  placeholderText,
  hideLabel,
  min,
  max,
  inputMargin = `0.3rem auto`,
  ...props
}) => {
  const inputRef = useRef()

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isFocused])

  return (
    <StyledWrapper>
      {!hideLabel && <StyledLabel htmlFor={id}>{labelText}</StyledLabel>}
      <StyledInput
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        name={name}
        placeholder={placeholderText}
        onChange={onInputChange}
        margin={inputMargin}
        min={min}
        max={max}
        {...props}
      />
    </StyledWrapper>
  )
}

export default InputWithLabel

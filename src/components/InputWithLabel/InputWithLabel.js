import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
  width: fit-content;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`

const StyledLabel = styled.label`
  width: 4rem;
  color: var(--color-dark);
  display: block;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  @media (min-width: 600px) {
    text-align: right;
    margin-right: 1rem;
  }
`

const StyledInput = styled.input`
  width: 4rem;
  border: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  border-bottom: 0.5px solid var(--color-primary);
  background: none;
  color: var(--color-dark);
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
    color: var(--color-dark);
    letter-spacing: 1px;
  }

  &[type='color'] {
    width: 2.5rem;
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
    border-radius: 0;
  }

  &[type='checkbox'] {
    border: none;
    border-radius: 0;
    padding: 0;
  }

  &[type='checkbox']::focus {
    border-radius: 0;
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

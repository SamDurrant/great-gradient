import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCheckbox = styled.input`
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`

const StyledDesign = styled.span`
  width: 16px;
  height: 16px;
  border: 1px solid #242424;
  border-radius: 100%;
  margin-right: 16px;
  position: relative;
  box-sizing: content-box;

  &::before,
  &::after {
    content: '';
    display: block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    position: absolute;
    transform: scale(0);
    transform-origin: center center;
  }
  &::before {
    background: #242424;
    opacity: 0;
    transition: 0.3s;
  }
  &::after {
    background: #3d5a80;
    opacity: 0.4;
    transition: 0.6s;
  }
`

const StyledLabelText = styled.span`
  color: #242424;
  font-weight: bold;
  ${StyledCheckbox}:hover & {
    color: #3d5a80;
  }
`

const StyledLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 12px 0;
  cursor: pointer;
  position: relative;

  ${StyledCheckbox}:hover + ${StyledDesign},
  ${StyledCheckbox}:focus + ${StyledDesign} {
    border: 1px solid #3d5a80;

    &::before {
      background: #3d5a80;
    }
    &::after {
      background: #3d5a80;
      opacity: 0.1;
      transform: scale(2.6);
    }
  }

  ${StyledCheckbox}:checked + ${StyledDesign}::before {
    opacity: 1;
    transform: scale(0.6);
  }

  ${StyledCheckbox}:hover ~ ${StyledLabelText} {
    color: #3d5a80;
  }
`

const CheckboxWithLabel = ({ id, checked, onInputChange, labelText, name }) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={id}>
        <StyledCheckbox
          id={id}
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onInputChange}
        />
        <StyledDesign />
        <StyledLabelText>{labelText}</StyledLabelText>
      </StyledLabel>
    </StyledContainer>
  )
}

export default CheckboxWithLabel

import styled, {css} from "styled-components";
import { breakpoints } from "styles/styles";

import {BtnType} from './Button'

const mapTypeToStyle = (btnType: BtnType) => {
  switch(btnType) {
    case 'solid':
      return SolidStyles
      case 'hollow':
        return HollowStyles
      default:
        return null
  }
}

export const baseBtnStyle = css`
  background-color: #5C2C7C;
  color: white;
  border: solid 2px #5C2C7C;
`;

export const invertedBtnStyle = css`
  background-color: transparent;
  color: #5C2C7C;
  border: solid 2px #5C2C7C;
`;

const SolidStyles = css`
  ${baseBtnStyle};

  &:disabled {
    background: grey;
    border: 1px solid grey;
  }
`

const HollowStyles = css`
  ${invertedBtnStyle};

  &:disabled {
    background: grey;
    border: 1px solid grey;
  }
`

const ButtonStyles = (btnType: BtnType) => css`
  font-family: inherit;
  font-weight: inherit;
  font-size: 1.2rem;
  padding: 4px 32px;
  text-transform: uppercase;
  z-index: 999999;
  cursor: pointer;
  text: center;
  min-width: 128px;

  @media (min-width: ${breakpoints.m}px) {
    overflow: hidden;
  }

  ${mapTypeToStyle(btnType)}
`

export const Button = styled.button<{btnType: BtnType}>`
  ${({btnType}) => ButtonStyles(btnType)}
`
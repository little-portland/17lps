import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const Grid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: auto auto auto;
  z-index: 1;
  pointer-events: none;
`

export const Middle = styled.div`

  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  max-height: 80vh;

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 50vw;
    max-height: 70vh;

    @media (max-width: ${breakpoints.m}px) {
      max-width: 80vw;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const BG = styled.div`
  // background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  height: 100vw;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 0;
`;

export const Close = styled.button`
  background: none;
  cursor: pointer;
  border: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  position: absolute;
  right 60px;
  top: 60px;

  &::before,
  &::after {
    background: #0519ce;
    content: "";
    position: absolute;
    height: 33px;
    width: 2px;
    left: 15px;
    top: 0;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  @media (max-width: ${breakpoints.m}px) {
    right: 30px;
    top: 30px;
  }
`;


export const CloserStyle = styled.div`
  opacity: 1;
  transition: all 0.2s linear;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: block;

  &:hover {
    opacity: 0.5;
  }
`
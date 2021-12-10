import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 60px;
  /* max-width: 800px; */
  /* width: calc(100vw - 60px); */
  z-index: 9999 !important;
  // pointer-events: none;

  @media (max-width: 700px) {
    padding: 30px;
    /* width: calc(100vw - 30px); */
  }
`;

export const BG = styled.div`
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 100vw;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
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

import styled, {css}  from "styled-components";
import { breakpoints } from "styles/styles";

export const FlyerGridContainer = styled.div<{ elements?: number }>`
    position: absolute;
    overflow-y: scroll;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
    grid-template-columns: repeat(${p => p.elements}, ${p => (p.elements <= 3  ? '1fr' : '30vw')});
    // grid-template-columns: repeat(3, 50vw);
    grid-auto-flow: column;
    // grid-template-rows: minmax(150px, 1fr);
    overflow-x: scroll;

    // grid-template-columns: 1fr 1fr;
    // grid-gap: 0;
    // grid-template-rows: auto;
  
    div {
      .image, span {
        max-height: 60vh;
        object-fit: contain;
        cursor: pointer;

      }
    }

    @media (max-width: ${breakpoints.m}px) {
      grid-template-columns: 1fr;
      grid-auto-flow: row;
      grid-gap: 8%;
      padding: 64px;
      margin-bottom: 64px;
      align-content: start;
      padding

      div {
        .image, span {
          max-height: 40vh;
          object-fit: contain;
          cursor: pointer;
        }
      }
    } 
`;

export const Text = styled.h2`
  display: block;
  position: absolute;
  top: -32px;
  text-transform: uppercase;
  overflow: hidden;
  white-space:nowrap;

  left: 50%;
  transform: translate(-50%, 0);

  @media (max-width: ${breakpoints.m}px) { 
    top: -24px;
    font-size: 0.8rem;
  }
`

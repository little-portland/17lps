import styled, {css} from "styled-components";

export const Button = styled.button`
  font-family: inherit;
  font-weight: inherit;
  background: #e8bac9;
  height: 36px;
  padding: 0;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.4;

  &:hover {
      opacity: 0.8;
  }
`;
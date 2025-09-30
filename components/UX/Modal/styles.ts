import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const Grid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw;
  display: grid;
  grid-template-rows: auto auto auto;
  z-index: 1;

  @media (max-width: ${breakpoints.m}px) {
    grid-template-rows: 0 auto auto;
  }
`;

export const Top = styled.div`
  position: absolute;
  z-index: 9999999999999999;
  // top: -20px;
  right: -44px;
  display: flex;

  @media (max-width: ${breakpoints.m}px) {
    right: 0;
    top: -44px;
  }
`;

export const Middle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  // overflow: scroll;
  max-height: 80vh;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  img {
    display: block;
    width: auto;
    height: auto;
    max-width: 50vw;

    //Change to 70
    max-height: 70vh;

    @media (max-width: ${breakpoints.m}px) {
      max-width: 80vw;
    }
  }

  object {
    height: 400px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100vw;
  height: fit-content;
  justify-content: center;
  //flex-wrap: wrap;

  @media (min-width: ${breakpoints.m}px) {
    align-items: center;
    flex-direction: column;
    gap: 16px;
  }

  a {
    height: fit-content;
    display: block;
  }

  button {
    // margin: 0 20px;
    width: 350px;
    margin: 0 16px;

    @media (max-width: ${breakpoints.m}px) {
      width: 140px;
      font-size: .9rem!important;
      // min-width: 100px;
    }
  }

  .double-btn a {
    display: inline-block!important; 
}

.double-btn .left-btn {
  margin-right: 5px!important; 
}

.double-btn .right-btn {
  margin-left: 5px!important; 
}

.double-btn button {
    width: 170px!important;
    margin: 0!important; 
    padding: 4px 0!important; 
}

@media (max-width: 768px) {
    .double-btn button {
        width: 140px!important;
        font-size: .9rem!important;
    }

    .left-btn {
      margin-right: 5px!important; 
    }

    .right-btn {
      margin-left: 5px!important; 
    }

    .left-btn button, 
    .right-btn button {
      margin: 0!important; 
    }
}

`;


export const FirstButtonWrapper = styled.div`
  height: fit-content;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;

  button {
    width: 350px !important;

    @media (max-width: ${breakpoints.m}px) {
      width: 140px !important;
    }
  }

  @media (min-width: ${breakpoints.m}px) {
    margin: 0;
  }
`;

export const BG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(10px);
  cursor: pointer;
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
`;

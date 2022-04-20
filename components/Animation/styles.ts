import styled from "styled-components";
import { breakpoints } from "styles/styles";

export const SvgContainer = styled.div`
    div {
        height: 100%;
        // height: calc(var(--vh, 1vh) * 100);
        width: 100vw;
        position: absolute;
        top: 50%;  
        left: 50%; 
        transform: translate(-50%, -50%);  
    }
`;
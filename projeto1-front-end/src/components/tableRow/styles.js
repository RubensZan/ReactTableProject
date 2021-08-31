import styled from 'styled-components';

export const Row = styled.tr`
    background-color: ${props => props.index % 2 === 0 ? "#fff" : "#00f752"};
    &:hover{
        background-color: #ffff8f; 
    }
    height: 
    ${props => props.windowWidth > 1200 ? "25px" 
        : props.windowWidth > 845 ? 
            "48px" 
            : "71px" 
        }
`;
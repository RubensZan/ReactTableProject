import styled from 'styled-components';

export const ControlButton = styled.button`
    background-color: ${props => props.able ? "#fff" : "#a5a5a5"};
    &:hover{
        background-color: ${props => props.able ? "#ffff8f" : "#a5a5a5"}; 
    }
    cursor: ${props => props.able ? "pointer" : "not-allowed" }
`;

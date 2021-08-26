import styled from 'styled-components';

export const Row = styled.tr`
    background-color: ${props => props.index % 2 === 0 ? "#fff" : "#00f752"};
    &:hover{
        background-color: #ffff8f; 
    }
`;
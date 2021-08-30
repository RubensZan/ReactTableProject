import styled from 'styled-components';

export const ControlButton = styled.button`
    background-color: ${props => props.able ? "#fff" : "#a5a5a5"};
    &:hover{
        background-color: ${props => props.able ? "#ffff8f" : "#a5a5a5"}; 
    }
    cursor: ${props => props.able ? "pointer" : "not-allowed" }
`;

export const ViewModal = styled.button`
    background-image: linear-gradient(to right, rgba(255,0,0,0), #b5b5b5);
    color: #000000;
    cursor: pointer;
    border: 2px solid #919191;
`;


import styled from "styled-components";
import { screen } from '@testing-library/react';


export const Close = styled.div`
    position: absolute;
    top:64px;
    right:60px;
    cursor: pointer;
`

export const Button = styled.button`
background-color: inherit;
border: none;
margin: 10px;
`

export const Background = styled.div`
background-color: rgba(45, 43, 42, 1);
height: 96vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px;
font-family: 'MaruBuri-Regular';

`;

export const ViewerContainer = styled.div`
display: flex;
background-color: rgba(45, 43, 42, 1);
`;

export const Page = styled.div`
@media only screen and (max-width:1700px ){
    height: 500px;
    width: 400px;
}
cursor: pointer;
background-color: white;
font-size: ${({ fontSize }) => `${fontSize}px`};
line-height: ${({ lineHeight }) => lineHeight};
height: 700px;
width: 430px;
overflow: hidden;
flex: 1;
padding: 60px;
${({ borderRight }) => borderRight && `border-right: 1px solid black;`}
`;

export const ControlPanel = styled.div`
display: flex;
font-size: 14px;
background-color: rgba(45, 43, 42, 1);
color: white;
align-items: center;
justify-content: space-between;
width: 1100px;
margin-top: 10px;
`;

export const NovelTitle = styled.div`
width: 500px;
`

export const PageInput = styled.input`
width: 25px;
height: 20px;
border-radius: 5px;
border: 1px solid white;
margin-right: 5px;
background-color: inherit;
font-size: 12px;
text-align: center;
color: rgba(255, 239, 155, 1);
`;

export const ScrollBar = styled.input`
width: 380px;
margin: 10px;
margin-left: 30px;
`;

export const PageButtons = styled.div`
font-size: 12px;
width: 150Wpx;
display: flex;
justify-content: space-between;
align-items: center;
`

export const ControlPanelRight = styled.div`
position: absolute;
right: 50px;
bottom: 127px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
font-size: 12px;
`

export const RoundBorder = styled.div`
display: flex;
flex-direction: column;
border: 1px solid white;
border-radius: 25px;
text-align: center;
justify-content: space-between;
align-items: center;
width: 38px;
height: 117px;
`

export const PannelIcon = styled.div`
margin: 10px;
`
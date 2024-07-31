import styled from "styled-components";

export const Button = styled.button`
background-color: inherit;
border: none;
margin: 10px;
`

export const Background = styled.div`
background-color: rgba(45, 43, 42, 1);
height: 94.6vh;
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
cursor: pointer;
background-color: white;
font-size: ${({ fontSize }) => `${fontSize}px`};
line-height: ${({ lineHeight }) => lineHeight};
height: 550px;
width: 380px;
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

export const PageInput = styled.input`
width: 30px;
border: none;
margin-right: 5px;
background-color: inherit;
font-size: 12px;
text-align: right;
color: rgba(255, 239, 155, 1);
`;

export const ScrollBar = styled.input`
width: 410px;
margin: 10px;
margin-left: 230px;
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
bottom: 100px;
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
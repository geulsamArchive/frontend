import styled from "styled-components";

export const MobileRecentWorkContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
    position: fixed;
    bottom: 0;
    width: 100dvw;
    background-color: rgba(234, 233, 227, 1);
font-family: 'MaruBuri-Regular';
font-weight: 700;
font-size: 16px;
text-align: center;
color: rgba(129, 128, 127, 1);
height:45px ;
cursor: pointer;
`

export const MobileRecentsWorkFull = styled.div`
    width: 100dvw;
    height: 100dvh;
    position: fixed ;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: black;
`

export const MobileRecentWorkTop = styled.div`
    display: flex;
align-items: center;
justify-content: space-between  ;
    position: fixed;
    top: 0;
    width: 100dvw;
    background-color: rgba(234, 233, 227, 1);
font-family: 'MaruBuri-Regular';
font-weight: 700;
font-size: 16px;
color: rgba(129, 128, 127, 1);
height:45px ;
`

export const CloseSVG = styled.div`
    margin-right: 20px;
    cursor: pointer;
`

export const MobileRecentWorksContainer = styled.div`
overflow-y: auto;
max-height: calc(100dvh - 45px);
width: 100dvw;
position: absolute;
top: 50px;
&::-webkit-scrollbar{
    display: none;
}
`

export const GrayTexts = styled.div`
    color: rgba(129, 128, 127, 1);
    font-size: 14px;
`
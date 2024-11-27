import { Page } from "react-pdf";
import styled from "styled-components";

export const Button = styled.button`
    background-color: inherit;
    border: none;
    cursor: pointer;
`

export const PageInput = styled.input`
font-family: 'MaruBuri-Regular';
width: 25px;
height: 20px;
border: none;
border-bottom: 1px solid  rgba(255, 96, 88, 1);
margin-right: 5px;
background-color: inherit;
font-size: 15px;
text-align: center;
color: rgba(255, 96, 88, 1);
`;

export const PDFViewerContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 50dvw;
`


export const MobilePDFViewerContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 80dvw;

`


export const Spaceb = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
`

export const MobilePdfPage = styled(Page)`
     canvas {
        width: 80dvw !important; /* PDF 페이지의 너비를 80dvw로 설정 */
        height: auto !important; /* 높이는 자동 조정 */
    }
    .react-pdf__Page__textContent {
        width: 100% !important; /* Canvas와 같은 너비 */
        height: 100% !important; /* Canvas와 같은 높이 */
        position: absolute; /* Canvas 위에 위치 */
        top: 0;
        left: 0;
    }
`

export const SpaceBot = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    color: rgba(249, 249, 246, 1);
`

import { Link } from "react-router-dom";
import styled from "styled-components";

export const WorkLink = styled(Link)`
    color:black;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    &:hover{
        background-color: rgba(255, 239, 155, 1);
    }
`

export const WorkTopBorder = styled.div`
width: 100%;
border-bottom:1px solid black;
padding-bottom: 18px;
`

export const WorkInfo = styled.div`
    width: 78dvw;
    font-size: 14px;
    border-bottom: 1px solid black;
padding-bottom: 14px;
padding-top:14px ;
display: flex;
justify-content: space-between;
`
export const WorkTitleType = styled.div`
    display: flex;
    justify-content: ;
    width: 200px;
    align-items: center;
    text-align: left;
`
export const WorkType = styled.div`
    width: 100px;
    color: rgba(171, 170, 170, 1);
`

export const WorkInfoContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 90%;
margin-left: 4%;
padding-top: 20px;
background-color: rgba(249, 249, 246, 1);
`
export const WorkButtons = styled.div`
 height: 100dvh;
width: auto;
border-left: 1px solid black;   
`

export const WorkSentenceContainer = styled.div`
    width: 956px;
    height: 352px;
    background-color: white;
    border-radius: 15px;
    margin-top: 30px;
    font-weight: 700;
    font-size: 27px;
    line-height: 170%;
    color: rgba(171, 170, 170, 1);
    padding: 30px;
    display: flex;
    justify-content: space-between;

`

export const WorkAwards = styled.span`
border: 1px solid rgba(255, 96, 88, 1);
border-top: none;
    border-radius:0 0  10px 10px;
    color: rgba(255, 96, 88, 1);
    padding: 5px 12px 5px 12px;
    font-size: 12px;
    margin-right: 50px;
position: relative;
top: -9px;
`


export const WorkSentence = styled.div`
    width: 608px;
    height: 268px;
`

export const WorkReaderLink = styled(Link)`
margin-top: 270px;
width:234px;
height: 63px;
font-weight: 600;
text-decoration: none;
color: rgba(45, 43, 42, 1);
border: 1.5px solid rgba(45, 43, 42, 1);
border-radius: 50px;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
padding-left: 20px;
padding-right: 20px;
    
`
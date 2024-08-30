import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 83dvh;
font-family: 'MaruBuri-Regular';

`
export const Info404 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 430px;
    height: 300px;
    line-height: 1.7;
    text-align: center;
`
export const InfoTitle = styled.div`
    font-size: 27px;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 20px;
`
export const Info = styled.div`
    font-size: 16px;
margin-bottom: 20px;
`
export const Button = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:93px;
height: 36px;
color: rgba(249, 249, 246, 1);
background-color: 'rgba(87, 86, 85, 1)';
cursor: pointer;
`;

export const MainLink = styled(Link)`
    
`
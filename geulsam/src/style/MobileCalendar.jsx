import styled from "styled-components";

export const MobileCalendarContainer = styled.div`
font-family: 'MaruBuri-Regular';
height: 90dvh;
width: 90%;
margin-left: 0;
padding: 5dvw;
padding-top: 30px;
background-color: rgba(249, 249, 246, 1);
`


export const CalendarContainer = styled.div`
    background-color: white;
    border: 4.5px;
    filter: drop-shadow(0 4px 12px rgba(38, 38, 38, 0.04));
    width: 90dvw;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CalendarTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
    width: 80dvw;
`

export const CalendarBottom = styled.div`
    width: 100%;
    display: flex;
flex-direction: column;
align-items: center;
`

export const CalendarInfo = styled.div`
    border-top: 1px solid rgba(171, 170, 170, 1);
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 1.7;
    width: 80dvw;
    padding-top: 20px;
    padding-bottom: 20px;
    color: rgba(87, 86, 85, 1);
`

export const Left = styled.div`
    text-align: left;
`

export const Right = styled.div`
text-align: right;
`
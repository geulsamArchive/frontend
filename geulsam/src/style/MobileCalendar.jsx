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

export const CriticTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    margin-top: 25px;
    margin-bottom: 10px;
`
export const CriticContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CriticDayes = styled.div`
    background-color: white;
    border-radius: 4.5px;
    width: 90dvw;
    filter: drop-shadow(0 4px 12px rgba(38, 38, 38, 0.04));
    padding: 15px;
    margin: 15px 0 15px 0;
`

export const CriticInfoTop = styled.div`
    border-bottom: 1px solid rgba(213, 213, 212, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.7;
`
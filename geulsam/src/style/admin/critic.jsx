import styled from "styled-components";

export const CriticContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 90%;
margin-left: 4%;
padding-top: 50px;
background-color: rgba(249, 249, 246, 1);
box-sizing: border-box;
padding-bottom: 50px;

`

export const EditCalendarTop = styled.div`
    display: flex;
    justify-content: space-between;
`

export const EditCalendarTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    color: rgba(87, 86, 85, 1);
    line-height: 2;
    width: 380px;
    height: 39px;
    border-bottom: 1.5px solid rgba(87, 86, 85, 1) ;
`
export const EditCalendarInfo = styled.div`
margin-top: 15px;
margin-bottom: 40px;
    font-weight: 400;
    font-size: 14px;
    color: rgba(87, 86, 85, 1);
    line-height: 1.8;
`


export const SliderContainer = styled.div`
width: 100%;
`

export const Slide = styled.div`
    width: 408px;
    height: 599px;
    background-color:white;
    border-radius: 8.62px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;

`

export const Content = styled.div`
width: 408px;
height: 538px;
background-color: white;
border-radius: 8.62px;
display: flex;
flex-direction: column;
align-items: center;
`

export const CriticLogUploads = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    gap: 30px;
    line-height: 1.7;
`
export const CriticLogUploadsSecondLine = styled.div`
    display: flex;
    gap: 30px;
    @media only screen and (max-width: 1024px) {
    flex-direction:column;
    }

`

export const ContentsInfo = styled.div`
    border-bottom: 1px solid rgba(171, 170, 170, 1);
    color: rgba(87, 86, 85, 1);
    line-height: 1.7;
    font-size: 11px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    &:first-child{
        border-top: 1px solid rgba(171, 170, 170, 1);
    }
    padding: 10px;
`

export const ContentRightText = styled.div`
    text-align: right;
`

export const AddButton = styled.button`
font-family: 'MaruBuri-Regular';
font-size: 14px;
    font-weight: 700;
    line-height: 1.7;
    border: none;
    background-color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 50px;
    &:hover{
        background-color: gray;
        color: white;
        border-radius: 8px;
    }
`

export const AddForm = styled.div`
 @media only screen and (max-width: 1023px) {
    width: 90dvw; /* 작은 화면에서 더 작은 너비 */
    height: 102dvw; /* 작은 화면에서 더 작은 높이 */
  }
font-family: 'MaruBuri-Regular';

background-color: white;
  border-radius: 8.6px;
  text-align: center;
  width: 408px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25));
`
export const AddInputs = styled.div`
    text-align: left;
    margin-top: 20px;
`
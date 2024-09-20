import styled from "styled-components";

export const CriticContainer = styled.div`
background-color: rgba(249, 249, 246, 1);
font-family: 'MaruBuri-Regular';

`
export const Critics = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-top: 0.68px solid black;
    width: 350px;
    &:last-child{
    border-bottom: 0.68px solid black;
    }
    margin-left: 25px;
`
export const CriticDay = styled.div`
    border-top: 0.68px solid rgba(171, 170, 170, 1);
    height:25px;
    width: 270px;
    padding-top: 12px;
    &:first-child {
        border-top: none;
    }
`

export const Right = styled.div`
    
`

export const Conditions = styled.div`
    width: 75px;
    text-align: right;
`

export const OrderAndTime = styled.span`
    width: 113px;
`
export const Dates = styled.div`
    width: 80px;
    height: 64px;
    padding-top: 12px;
`
export const NameGenre = styled.div`
text-align: left;
width: 70px;
`
export const CriticInfos = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: ${props => {
        switch (props.condition) {
            case 'FIXED':
                return 'black';
            case 'UNFIXED':
                return 'rgba(129, 128, 127, 1)';
            default:
                return 'black'; // 기본 색상
        }
    }};
`

export const CriticButton = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 12px;
border-radius: 21px;
width: 70px;
display: flex;
justify-content: center;
align-items: center;
color:rgba(249, 249, 246, 1) ;
background-color: rgba(87, 86, 85, 1);
cursor: pointer;
    `

export const Notice = styled.div`
    font-size: 14px;
    color: rgba(129, 128, 127, 1);
    margin-bottom: 50px;
`

export const ModalBottom = styled.div`
background-color: rgba(234, 234, 234, 1);
width: 350px;
height: 43px;
display: flex;
justify-content: right;
align-items: center;
`
export const ModalTop = styled.div`
    width: 350px;
    height: 157px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'MaruBuri-Regular';
    font-size: 14px;
`
export const Modalcontent = styled.div`
    display: flex;
    flex-direction: column;
`

export const GenreButton = styled.button`
    width: 85px;
    height: 36px;
    background-color: white;
    border: 1px solid rgba(171, 170, 170, 1);
    border-radius: 30px;
    color: rgba(171, 170, 170, 1);
    font-size: 17px;
    font-family: 'MaruBuri-Regular';
    cursor: pointer;
`

export const CloseButton = styled.button`
    width: 75px;
    height: 24px;
    background-color:rgba(87, 86, 85, 1);
    border-radius: 30px;
    color: rgba(249, 249, 246, 1);
    font-size: 11px;
    font-weight: 700;
    font-family: 'MaruBuri-Regular';
    margin-right: 10px;
    cursor: pointer;
`

export const CriticLogContainer = styled.div`
    width: 90dvw;
`

export const MarginRight = styled.div`
    margin-right: 5dvw;
`

export const CriticLogsContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 50px;
`

export const LogType = styled.div`
    width: 100px;
        color: rgba(171, 170, 170, 1);
        font-size: 14px;
`
export const LogTitle = styled.div`
    color: rgba(249, 249, 246, 1);
        font-size: 14px;
        width: 500px;
`

export const Logs = styled.div`
&:first-child{
    border-top: 1px solid rgba(249, 249, 246, 1);
}
    display: flex;
    font-size: 14px;
    padding-bottom: 12px;
padding-top:12px ;
justify-content: space-between;
    border-bottom: 1px solid rgba(249, 249, 246, 1);
`

export const LogSearchFailed = styled.div`
   &:first-child{
    border-top: 1px solid rgba(249, 249, 246, 1);
} display: flex;
    font-size: 14px;
    padding-bottom: 12px;
padding-top:12px ;
    border-bottom: 1px solid rgba(249, 249, 246, 1);
 
`

export const LogName = styled.div`
    color: rgba(249, 249, 246, 1);
    width: 90px;

`

export const LogDate = styled.div`
    color: rgba(249, 249, 246, 1);
    width: 125px;
`

export const LogPassword = styled.div`
    width: 75px;
`

export const LogURL = styled.a`
    width: 114px;
    font-size: 11px;
    background-color: rgba(87, 86, 85, 1);
    border-radius: 20px;
    text-align: center;
    text-decoration: none;
    color: rgba(249, 249, 246, 1);
    
`

export const LogLeft = styled.div`
    display: flex;
    align-items: center;
`

export const LogRight = styled.div`
    display: flex;
`
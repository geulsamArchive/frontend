import styled from "styled-components";

export const Margin = styled.div`
  margin-bottom: 50px;
  margin-left:50px;
`;

export const CriticContainer = styled.div`
background-color: rgba(249, 249, 246, 1);
font-family: 'MaruBuri-Regular';

`
export const Critics = styled.div`
@media only screen and (max-width:1500px ){
width: 250px;
margin-left: 0px;
font-size: 10px;
}
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

@media only screen and (max-width:1500px ){
width: 200px;
padding-top: 8px;

}

@media only screen and (max-width:1023px ){
width: 90dvw;
padding-top: 25px;
padding-bottom: 10px;
border-top: none;
border-bottom: 1px solid rgba(213, 213, 212, 1);
&:last-child{
    border-bottom: none;
    padding-bottom: 0px;
}
}

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
 @media only screen and (max-width:1500px ){
width: 50px;
}
    width: 75px;
    text-align: right;
`

export const OrderAndTime = styled.span`
 @media only screen and (max-width:1500px ){
width: 80px;
}
@media only screen and (max-width:1023px ){
width: auto
}
 width: 113px;
    
`
export const Dates = styled.div`
@media only screen and (max-width:1500px ){
width: 50px;
height: 40px;
padding-top: 8px;

}
    width: 80px;
    height: 64px;
    padding-top: 12px;
`
export const NameGenre = styled.div`

@media only screen and (max-width:1500px ){
width: 50px;
}
@media only screen and (max-width:1023px ){
width: auto
}
text-align: left;
width: 70px;
`
export const CriticInfos = styled.div`
@media only screen and (max-width:1023px ){
width: 90dvw
}
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

export const CriticButton = styled.div`
@media only screen and (max-width:1023px ){
height: 28px;
width: 82px;
font-weight: 700;
font-size: 14px;
}
font-family: 'MaruBuri-Regular';
border: none;
font-size: 12px;
border-radius: 21px;
width: 70px;
height: 15px;
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
    margin-top: 100px;
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
    width: 88dvw;
    color:black;
`

export const MarginRight = styled.div`
    margin-right: 5dvw;
`
export const MarginLeft = styled.div`
    margin-left: 5dvw;
`
export const CriticLogsContainer = styled.div`
margin-top: 30px;
  margin-bottom: 50px;
    margin-left: 5dvw;
    width: 88dvw;
`;

export const MobileCriticLogsContainer = styled.div`
  @media only screen and (max-width: 1023px) {
    display: flex 
    margin-top: 30px;
    margin-bottom: 50px;
    margin-left: 60px;
    width: 90dvw;
  }  
    display:none;
`;


export const LogType = styled.div`
    width: 100px;
        color: rgba(171, 170, 170, 1);
        font-size: 14px;

`
export const LogTitle = styled.div`
    color: rgba(29, 28, 28, 1);
        font-size: 14px;
        width: 500px;
    font-family: 'MaruBuri-Regular';
    @media only screen and (max-width:1023px ){
        color: rgba(249, 249, 246, 1);
        width: 40dvw;
        font-size:16px;
        font-weight:bold;
}

`

export const Logs = styled.div`
    @media only screen and (max-width:1023px ){
    &:first-child{
    border-top: 1px solid rgba(87, 86, 85, 1);
}
    }
    padding-top:15px;
    display:flex;
    position:relative;
    padding-bottom:50px;
    
    border-top : 1px solid rgba(87, 86, 85, 1);
        border-bottom : 1px solid rgba(87, 86, 85, 1);
    }

&:first-child{
    border-top: 1px solid rgba(29, 28, 28, 1);
}
    display: flex;
    font-size: 14px;
    padding-bottom: 12px;
padding-top:12px ;
justify-content: space-between;
    border-bottom: 1px solid rgba(29, 28, 28, 1);
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
    color: rgba(29, 28, 28, 1);
    width: 90px;
    font-family: 'MaruBuri-Regular';

`
export const MobileLogName = styled.div`
    @media only screen and (max-width:1500px ){
    color:  rgba(213, 213, 212, 1);
      font-size: 14px;
  width: 100px;
  font-weight:bold;
      font-family: 'MaruBuri-Regular';
    }

`
export const LogDate = styled.div`
    color: rgba(29, 28, 28, 1);
    width: 125px;
    font-family: 'MaruBuri-Regular';
  @media only screen and (max-width: 1023px) {
    color:  rgba(213, 213, 212, 1);
    font-size:10px;
    position:absolute;
    bottom: 3dvw;
    right:1px;
    width:20dvw;
    }
`

export const LogPassword = styled.div`
    width: 75px;
    font-family: 'MaruBuri-Regular';
    color:rgba(171, 170, 170, 1);
  @media only screen and (max-width: 1023px) {
        width:8dvw;
        font-size:10px;
        margin-right:4dvw;
}
`

export const LogURL = styled.a`
    width: 114px;
    font-size: 11px;
    font-weight: bold; /* 글자를 굵게 */
    padding: 8px 0; /* 위아래 여백 추가 */
    display:inline-block;
    background-color: rgba(234, 233, 227, 1);
    border-radius: 20px;
    text-align: center;
    text-decoration: none;
    font-family: 'MaruBuri-Regular';
    color: rgba(29, 28, 28, 1);
    
    /* 기본 텍스트 */
    &:not(:only-child)::after {
        content: '합평기록 바로가기';
    }

    /* 미디어 쿼리에서 텍스트 변경 */
    @media only screen and (max-width: 1023px) {
        &:not(:only-child)::after {
        content: '합평기록';
    }
        font-size: 10px; /* 모바일에서 글자 크기 줄이기 */
        width: 13dvw; /* 모바일에서는 너비를 자동으로 설정하여 텍스트에 맞게 조정 */
        height:10px;
        left-margin:2px;
    }
`;


// export const LogURLMobile = styled.a`
// display:block;
//   @media only screen and (max-width: 1023px) {
//   display:block;
//     width: 114px;
//     font-size: 11px;
//     font-weight: bold; /* 글자를 굵게 */
//     padding: 4px 0; /* 위아래 여백 추가 */
//     background-color: rgba(234, 233, 227, 1);
//     border-radius: 20px;
//     text-align: center;
//     text-decoration: none;
//     font-family: 'MaruBuri-Regular';
//     color: rgba(29, 28, 28, 1);
// }
// `;
export const LogLeft = styled.div`
    display: flex;
    align-items: center;
`

export const LogRight = styled.div`
    display: flex;
    align-items: center;

`
import { Page } from "react-pdf";
import { Link } from "react-router-dom";
import styled from "styled-components";


//Container와 Wrapper의 차이
//Container는 여러 요소를 감싸는 요소
//Wrapper는 단일 요소를 감싸는 요소
export const Container = styled.div`
`;

export const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
font-family: 'MaruBuri-Regular';
`;

//입력 폼 관련 요소
export const Title = styled.div`
font-size: 20px;
margin: 50px;
`;

export const Form = styled.div`
background-color: white;
border-radius: 8.6px;
text-align: center;
width:408px;
height: 486px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

export const Inputs = styled.div`
text-align: left;
margin-bottom: 100px;
`;

export const InputTitle = styled.div`
margin-top: 10px;
margin-bottom: 5px;

`
export const Input = styled.input`
border: none;
border-bottom:1px solid rgba(171, 170, 170 , 1);
padding: 5px;
width: 315px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
text-align: center;
margin-bottom: 20px;
`;

export const IntroductionTextarea = styled.textarea`
border: none;
width: 350px;
height: 190px;
font-family: 'MaruBuri-Regular';
line-height: 200%;
font-size: 16px;
resize: none;
outline: none;
padding: 25px;
&::placeholder{
  line-height: 200%;
}
`

export const Buttons = styled.div`
background-color: rgba(234, 234, 234, 1);
width: 100%;
height:75px ;
display: flex;
align-items: center;
justify-content:right ;
border-bottom-left-radius: 8.6px;
border-bottom-right-radius: 8.6px;

`
export const Button = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:93px;
height: 36px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
margin-right: 23px;
`;

export const Back = styled.div`
background-color: gray;
min-height: 100vh;
`

export const NextButton = styled.button`
border: none;
font-size: 17px;
border-radius: 30px;
width:93px;
height: 36px;
color:rgba(249, 249, 246, 1);
background-color: rgba(87, 86, 85, 1);
font-family: 'MaruBuri-Regular';
cursor: pointer;
margin-right: 23px;
`

export const Checkbox = styled.input`
`

//URL복사, 다운로드 관련 버튼
export const URLButton = styled.button`
border-top-right-radius:30px;
border-bottom-right-radius:30px;
border: 1px solid black;
border-left: none;
background-color:transparent;
width: 84px;
height: 52px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`




//NavBar, Footer 관련 요소

export const Navs = styled.div`
font-family: 'MaruBuri-Regular';
position: relative;
top: 0;
left: 0;
width: 100%;
height: 85px;
background-color:  rgba(45, 43, 42, 1);

ul{
    display: flex;
    list-style: none;

}
li+li{
    margin-left: 25px;
}`;
export const NavContent = styled.div`
display: flex;
justify-content: center;
width: 96%;
align-items: flex-start;
height: 100%;
padding-top: 50px;
`;

export const NavLink = styled(Link)`
color:white;
text-decoration: none;
border: 1.8px solid white;
padding: 20px 30px;
border-radius: 15px 15px 0 0;
margin-top: 15px;
font-size: 17px;
`





export const Footers = styled.footer`
font-family: 'MaruBuri-Regular';
background-color: rgba(234, 233, 227, 1);
height: 57px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 20px;
`;

export const Left = styled.div`
margin-left: 80px;
`;

export const Right = styled.div`
margin-right: 80px;
`;

export const Icons = styled.img`
margin: 10px;
`

//Sidebar 관련 요소
export const Sidebars = styled.div`
position: fixed;
right: 0px;
bottom: 10%;
text-align:right;
z-index: 1;
`;
export const SideBox = styled.div`
margin-bottom: 44px;
`
export const SideLink = styled(Link)`
font-family: 'MaruBuri-Regular';
color: white;
text-decoration: none;
border: 1px solid rgba(171, 170, 170, 1);
border-right: none;
border-radius: 43px 0 0 43px;
padding: 20px 30px;
padding-right: 85px;
background-color: black;
`


//Calenar 관련 요소
export const Calendars = styled.div`
width: 100%;
background-color: none;
font-family: 'MaruBuri-Regular';
height: 838px;
`;

export const CalendarTitle = styled.div`
color: rgba(87, 86, 85, 1);
margin: 86px;
border-bottom: 1.5px solid rgba(87, 86, 85, 1);
padding-bottom:10px ;
padding-top: 10px;
font-size: 22px;
font-weight: 700;
`

//최근 공개된 작품 관련 요소
export const RecentWorks = styled.div`
width: 100%;
height: 1400px;
background-color: rgba(45, 43, 42, 1);
font-family: 'MaruBuri-Regular';
color: white;
`;

export const RecentTitle = styled.div`
margin:86px ;
border-bottom: 1.5px solid white;
padding-bottom: 10px;
padding-top: 10px;
font-size: 22px;
text-shadow: 0 4px 4px black;
`


//아카이브 상단 버튼
export const ArchiveButtonContainer = styled.div`
display: flex;
margin-top: 77px;
justify-content: center;
`


//문집 페이지
export const BookInfoContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 90%;
margin-left: 4%;
margin-top: 100px;
`

export const BookTitle = styled.div`
font-size: 27px;
width: 100%;
border-bottom:2px solid black;
padding-bottom: 18px;
`
export const BookInfos = styled.div`
width: 75dvw;
font-size: 14px;
border-bottom: 1px solid black;
padding-bottom: 14px;
padding-top:14px ;
`
export const BookInfoContents = styled.div`
display: flex;
flex-direction: column;
`
export const BookInfoAndButton = styled.div`
display: flex;
justify-content: space-between;
align-items: stretch;
height: auto;
`
export const BookButtons = styled.div`
height: 150dvh;
width: auto;
border-left: 1px solid black;
`
//문집페이지 뷰어와 링크
export const ViewerAndLinks = styled.div`
height: 100%;
`

//PDF 뷰어 관련
export const PDFPage = styled(Page)`
`
export const PageRow = styled.div`
display: flex;
justify-content: left;
margin-top: 20px;
`


//포스터 관련
export const Posters = styled.img`
 position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
  margin: 50px;
`;

export const GridItems = styled.div`
  width: 100%;
  padding-bottom: 135%;
  position: relative;
`;

//이미지 모달
export const ModalOverlay = styled.div`
position: fixed;
top:0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.85);
display: flex;
justify-content: center;
align-items: center;
font-family: 'MaruBuri-Regular';
z-index: 2;

`

export const ModalContent = styled.div`
position: relative;
background-color:none;
display: flex;
flex-direction: column;
align-items: flex-end; 
`

export const ModalImg = styled.img`
max-height:85dvh ;
`

export const ModalButton = styled.button`
position: absolute;
top :30px;
right:30px;
cursor: pointer;
width: 26px;
height: 26px;
`

export const ModalButtonImg = styled.img`
position: absolute;
top :30px;
right:30px;
cursor: pointer;
width: 26px;
height: 26px;
`

export const ModalDesigner = styled.div`
border: 1px solid rgba(213, 213, 212, 1);
color: rgba(213, 213, 212, 1);
border-radius: 0 0 10px 10px;
width: 90px;
height: 25px;
font-size: 11px;
display: flex;
justify-content: center;
align-items: center;

`
export const ModalYear = styled.div`
border: 1px solid rgba(255, 96, 88, 1);
color: rgba(255, 96, 88, 1);
border-radius: 0 0 10px 10px;
height: 25px;
width: 50px;
font-size: 11px;
display: flex;
justify-content: center;
align-items: center;
margin-left: 10px;
`

export const ModalInfo = styled.div`
display: flex;
justify-content: space-between;
`

//배경색 관련
export const PageContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
background-image: linear-gradient(to bottom, #ffffff 150px,rgba(45, 43, 42, 1)100px);

`
export const PageTop = styled.div`
position: absolute;
top:0;
left: 0;
width: 100%;
height: 325px;
background-color: none;
`
export const PageBottom = styled.div`
position: absolute;
top:0;
left: 0;
width: 100%;
height: 325px;
background-color: none;
`


//글자색 관련

export const Red = styled.span`
color:rgba(255, 96, 88, 1);
`
export const Silver = styled.span`
color: rgba(171, 170, 170, 1);
margin-right: 190px;
`
//밑줄 관련

export const Highlight = styled.span`
background: linear-gradient(to bottom, transparent 50%, rgba(255, 239, 155, 1) 50%);;
`
//회원가입 폼
export const Small = styled.div`
font-size: 12px;
line-height: 150%;
`
export const TitleBold = styled.div`
font-weight: 700;
font-size: 20px;

`
export const Welcome = styled.div`
font-size: 16px;
font-weight: 700;
line-height: 200%;
`
export const WhiteButton = styled.button`
color: rgba(171, 170, 170, 1);
font-family: 'MaruBuri-Regular';
cursor: pointer;
padding: 7px;
background-color: transparent;
border-radius: 21px;
border: 1px solid rgba(171, 170, 170, 1);
font-size: 12px;
`

export const LeftAlign = styled.div`
text-align: left;
`
//회원가입시 내 작품 소개 키워드 할때 쓰는 인풋
export const WordInput = styled.input`
border: 1px solid rgba(129, 128, 127, 1);
font-family: 'MaruBuri-Regular';
text-align: center;
font-size: 18px;
width: 180px;
height: 41px;
border-radius:0 0 10px 10px ;
`

//회원가입 폼 상단
export const FormTop = styled.div`
width: 408px;
height: 57px;
border-radius: 8.6px 8.6px 0 0;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 5px 1px 3px rgba(0,0,0, 0.1);
`

export const BackButton = styled.img`
margin-left: 24px;
width: 10px;
height: auto;
cursor: pointer;
`
export const FormTopGray = styled.div`
width: 408px;
height: 57px;
border-radius: 8.6px 8.6px 0 0;
background-color:rgba(234, 234, 234, 1) ;
`


//회원가입 폼 하단
export const WhiteButtons = styled.div`
background-color: white;
width: 100%;
height:75px ;
display: flex;
align-items: center;
justify-content:right;
border-bottom-left-radius: 8.6px;
border-bottom-right-radius: 8.6px;
`
//글자수 세기
export const TextCounter = styled.div`
margin-right: 200px;
font-size: 18px;
color: ${props => props.length === 0 ? 'rgba(213, 213, 212, 1)' : 'black'};
`

export const MarginLeft = styled.div`
margin-left: 20px;
`

//
export const FlexCenter = styled.div`
display: flex;
align-items: center;
`
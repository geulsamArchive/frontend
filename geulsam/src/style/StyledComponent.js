import { Page } from "react-pdf";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Calendar from './../pages/main/calendar/Calendar';


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
margin-bottom: 10px;

`
export const Input = styled.input`
border: none;
border-bottom:1px solid rgba(171, 170, 170cd , 1);
padding: 10px;
width: 315px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
`;
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
background-color: black;

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
  width: 100%;
  height: 100%;
`
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px; /* 이미지들 사이의 간격 조정 */
  padding: 20px; /* 그리드 전체의 패딩 */
  margin: 50px;
`;

export const GridItems = styled.div`
  width: 100%;
  padding-bottom: 100%; /* 정사각형을 만들기 위해 비율 유지 */
  position: relative; /* 자식 요소의 절대 위치를 설정하기 위해 필요 */
`;
import { Page } from "react-pdf";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Notes from '../assets/images/notes.svg';

//메인 페이지 로고 위치 조정
export const Centering = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const MarginBottom = styled.div`
margin-bottom: 75px;

`


//Container와 Wrapper의 차이
//Container는 여러 요소를 감싸는 요소
//Wrapper는 단일 요소를 감싸는 요소
export const Container = styled.div`
`;

export const Wrapper = styled.div`
background-image: url(${Notes});
background-color: rgba(29, 28, 28, 1);
background-position: center;
background-repeat: no-repeat;
display: flex;
justify-content: center;
align-items: center;
height: 100dvh;
width: 100dvw;
font-family: 'MaruBuri-Regular';
`;

//입력 폼 관련 요소
export const RightSubmit = styled.div`
  @media only screen and (max-width: 1023px) {
    align-items:center;
    padding-right:50px;
  }
display: flex;
justify-content: right;
`
export const PosterUploadRightSubmit = styled.div`
  @media only screen and (max-width: 1023px) {
    align-items:center;
    padding-right:100px;
  }
display: flex;
justify-content: right;
`
export const InputUploads = styled.div`
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
    padding-up:30px;
    padding-down:30px;
    flex-direction: column; /* 1023px 이하에서 세로 배열 */
  }
display: flex;
flex-direction: row;
gap: 20px;
`
export const Title = styled.div`
font-size: 20px;
margin: 50px;
font-weight: 700;
`;

export const Form = styled.div`

  background-color: white;
  border-radius: 8.6px;
  text-align: center;
  width: 408px;
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25));

  @media only screen and (max-width: 1023px) {
    width: 300px; /* 작은 화면에서 더 작은 너비 */
    height: 357px; /* 작은 화면에서 더 작은 높이 */
  }
`;


export const Inputs = styled.div`
  @media only screen and (max-width:1023px) {
  width: 90dvw;
  display: flex; /* 기본 가로 배열 */
  flex-direction: column;
}
text-align: left;
margin-bottom: 100px;
`;

export const InputTitle = styled.div`
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
    flex-direction: column; /* 1023px 이하에서 세로 배열 */
    padding-left:10px;
  }
margin-top: 10px;
margin-bottom: 5px;
font-weight:bold;
`

export const Grayp = styled.p`
color : gray;
display:flex;
`
export const FlexContainer = styled.div`
  display: flex;
  gap: 10px; /* 요소 사이의 간격 조절 */
`;
export const LoginForm = styled.div`
 @media only screen and (max-width: 1023px) {
    width: 90dvw; /* 작은 화면에서 더 작은 너비 */
    height: 102dvw; /* 작은 화면에서 더 작은 높이 */
  }
background-color: white;
  border-radius: 8.6px;
  text-align: center;
  width: 408px;
  height: 486px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25));
`


export const LoginInputs = styled.div`
  @media only screen and (max-width:1023px) {
    margin-bottom: 40px;
}
text-align: left;
margin-bottom: 100px;
`

export const LoginInputTitle = styled.div`
 @media only screen and (max-width: 1023px) {
  
  }
margin-top: 10px;
margin-bottom: 5px;
`

export const LoginInput = styled.input`
 @media only screen and (max-width: 1023px) {
    width:  75dvw;
    /* margin-left: 7.5dvw; */
  }
border: none;
border-bottom:1px solid rgba(171, 170, 170 , 1);
padding: 5px;
width: 315px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
text-align: center;
background-color:inherit;
margin-bottom: 10px;
`

export const Input = styled.input`
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
    flex-direction: column; /* 1023px 이하에서 세로 배열 */
    overflow:hidden;
    max-width: 80dvw;
    z-index : 0; 
    margin-left:15px;
  }
border: none;
border-bottom:1px solid rgba(171, 170, 170 , 1);
padding: 5px;
width: 315px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
text-align: center;
margin-bottom: 10px;
background-color:inherit;
`;
export const TableInput = styled.input`
  @media only screen and (max-width: 1023px) {
    width: 90dvw;
    flex-direction: column; /* 1023px 이하에서 세로 배열 */
    overflow:hidden;
    max-width: 80dvw;
    z-index : 0; 
    margin-left:15px;
  }
border: none;
border-bottom:1px solid rgba(171, 170, 170 , 1);
padding: 5px;
width: 315px;
font-family: 'Grandpa_sharing';
font-size: 18px;
text-align: center;
margin-bottom: 10px;
background-color:inherit;
`;
export const Bookp = styled.p`
color:black;
border-bottom:black solid 1px;
`
export const SmallTableInput = styled(TableInput)`
  width: 5vw; // vw 단위를 사용하여 너비 설정
`

export const InputShort = styled.input`
border: none;
border-bottom:1px solid rgba(171, 170, 170 , 1);
padding: 5px;
width: 250px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
text-align: center;
margin-bottom: 10px;
margin-right: 20px;
`;


export const IntroductionTextarea = styled.textarea`
 @media only screen and (max-width:1023px) {
 width: 75dvw;
}
border: none;
width: 350px;
height: 190px;
font-family: 'MaruBuri-Regular';
line-height: 200%;
font-size: 16px;
resize: none;
outline: none;
padding: 25px;
&::-webkit-scrollbar{
  width: 0;
  height: 0;
}
&::-webkit-scrollbar-thumb{
  background-color: transparent;
}
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
export const ArchiveButton = styled.button`
 @media only screen and (max-width:1023px) {
 height: 31px;
 font-size: 14px;
 font-weight: 700;
 width: 106px;
margin-right: 0px;
margin: 5px;
}
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:93px;
height: 36px;
color:${props => (props.disabled ? 'rgba(249, 249, 246, 1)' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(87, 86, 85, 1)' : 'rgba(213, 213, 212, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
margin-right: 23px;
`;

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

export const ButtonForPassword = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:180px;
height: 36px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
margin-right: 23px;
`;

export const Option = styled.option`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:180px;
height: 36px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
margin-right: 23px;
`;

export const ButtonForMember = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width:93px;
height: 36px;
color:${props => (props.isActive ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.isActive ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.isActive ? 'none' : 'auto')};
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
@media only screen and (max-width:1023px) {
  border: 1px solid rgba(87, 86, 85, 1);
  border-radius: 30px;
  height: 40px;
  color: rgba(87, 86, 85, 1);
  width: 90dvw;
font-family: 'MaruBuri-Regular';
font-weight: 700;
margin-bottom: 16px;
font-size: 16px;
}
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
height: 76px;
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
padding-top: 43px;
`;

export const NavLink = styled(Link)`
color:white;
text-decoration: none;
border: 1.8px solid rgba(249, 249, 246, 1);
padding: 15px 21px;
border-radius: 15px 15px 0 0;
margin-top: 15px;
font-size: 17px;
&:hover{
text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
background-color: rgba(249, 249, 246, 1);
}
`

export const ActiveNavLink = styled(Link)`
color:white;
background-color: rgba(249, 249, 246, 1);
text-decoration: none;
border: 1.8px solid   rgba(249, 249, 246, 1);
text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
padding: 15px 20px;
border-radius: 15px 15px 0 0;
margin-top: 15px;
font-size: 17px;
`


export const Footborder = styled.div`
border-radius:0 0 16px 16px;
background-color: rgba(249, 249, 246, 1);
height: 34px;
width: 100dvw;
border: none;
`

export const Footers = styled.footer`
@media only screen and (max-width:1023px){
background-color: rgba(29, 28, 28, 1);
width: 100dvw;
font-size: 11px;
color: rgba(129, 128, 127, 1);
height: 150px;
text-align: center;
display: block;
}
font-family: 'MaruBuri-Regular';
background-color: rgba(234, 233, 227, 1);
height: 41px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 16px;
color: rgba(87, 86, 85, 1)  ;
a{
  text-decoration: none;
color: rgba(87, 86, 85, 1)  ;
  margin-right:45px;
}
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

@media only screen and (max-width: 1024px) {
  display: none;
  
}
`;

export const SideBox = styled.div`
margin-bottom: 40px;
`
export const SideButton = styled.button`
font-family: 'MaruBuri-Regular';
color: white;
text-decoration: none;
border: 1px solid rgba(171, 170, 170, 1);
border-right: none;
border-radius: 43px 0 0 43px;
padding: 20px 30px;
padding-right: 85px;
background-color: rgba(45, 43, 42, 1);
&:hover{
  background-color: rgba(171, 170, 170, 1);
}
`
export const SideLink = styled(Link)`
font-family: 'MaruBuri-Regular';
color: white;
text-decoration: none;
border: 1px solid rgba(171, 170, 170, 1);
border-right: none;
border-radius: 43px 0 0 43px;
padding: 18px 25px;
padding-right: 70px;
font-size: 18px;

background-color: rgba(45, 43, 42, 1);
&:hover{
  background-color:  rgba(171, 170, 170, 1);
}
`

export const SideLink2 = styled(Link)`
font-family: 'MaruBuri-Regular';
color: rgba(87, 86, 85, 1);
text-decoration: none;
border: 1px solid rgba(171, 170, 170, 1);
border-right: none;
border-radius: 43px 0 0 43px;
padding: 18px 25px;
padding-right: 70px;
font-size: 18px;
background-color: rgba(234, 233, 227, 1);
&:hover{
  background-color:  rgba(171, 170, 170, 1);
}
`



//main페이지

export const MainBackground = styled.div`
background: linear-gradient(to bottom, rgba(249, 249, 246, 1) 12%,  rgba(45, 43, 42, 1) 12%,  rgba(45, 43, 42, 1) 100%);
`


//Calenar 관련 요소
export const Calendars = styled.div`
width: 100%;
background-color: none;
font-family: 'MaruBuri-Regular';
height: 800px;
`;

export const CalendarTitle = styled.div`
color: rgba(87, 86, 85, 1);
font-family: 'MaruBuri-Regular';
margin-left: 86px;
margin-right: 86px;
border-bottom: 1.5px solid rgba(87, 86, 85, 1);
padding-bottom:10px ;
padding-top: 50px;
font-size: 22px;
font-weight: 700;
background-color: rgba(249, 249, 246, 1);

`
export const CalendarSelectContainer = styled.div`
display: flex;
justify-content: right;
margin-right: 86px;
`

//최근 공개된 작품 관련 요소
export const RecentWorks = styled.div`
width: 100%;
height: 1150px;
background-color: rgba(45, 43, 42, 1);
font-family: 'MaruBuri-Regular';
color: white;
`;

export const RecentTitle = styled.div`
margin:86px ;
border-bottom: 1.5px solid white;
padding-bottom: 10px;
padding-top: 10px;
font-weight: 700;
font-size: 22px;
`
export const Recents = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
`


export const RecentWorkText = styled.div`
@media only screen and (max-width:1023px) {
 font-size: 16px;
}
width: 90%;
height: 40%;
opacity: 1;
transition: opacity 0.3s ease;
font-size: 20px;
line-height: 180%;
padding-top: 33px;
padding-bottom: 33px;
padding-left: 28px;
padding-right: 28px;
word-break: break-all;
color: rgba(171, 170, 170, 1);
overflow: hidden;
`
export const RecentWorkOverlay = styled.div`
position: absolute;
top: 0;
left: 0;
opacity: 0;
width: 100%;
height: 100%;
border-radius: inherit;
transition: opacity 0.3s ease;
background-color: rgba(234, 233, 227, 1);
color: black;
`
export const RecentWorkOverlayText = styled.div`
@media only screen and (max-width:1023px) {
 align-items: center;
 justify-content: center;
 text-align: center;
}
padding-top: 33px;
padding-bottom: 33px;
padding-left: 28px;
padding-right: 28px;
display: flex;
justify-content: space-between;
overflow: hidden;
flex-direction: column;
`

export const TextOverflow = styled.span`
@media only screen and (max-width:1023px) {
 font-size: 18px;
}
overflow: hidden;
`
export const RecentWorkContainer = styled.div`
@media only screen and (max-width:1500px) {
  width: 600px;
  height: 174px;
}
@media only screen and (max-width:1300px) {
  width: 500px;
  height: 174px;
}
@media only screen and (max-width:1023px) {
  width: 90dvw;
  height: 51dvw;
margin: none;
  
  line-height: 1.6;
}
font-family: 'MaruBuri-Regular';
width: 700px;
height: 174px;
margin: 14px;
border-radius: 11px;
background-color: rgba(87, 86, 85, 1);
position: relative;
cursor: pointer;

&:hover ${RecentWorkOverlay}{
  opacity: 0.92;
}
`



//아카이브 상단 버튼
export const ArchiveButtonContainer = styled.div`
 @media only screen and (max-width:1023px) {
padding-top: 30px;
}
   display: flex;
padding-top: 50px;
justify-content: center;
background-color: rgba(249, 249, 246, 1);

`


//문집 페이지
export const BookInfoContainer = styled.div`
  @media only screen and (max-width:1023px) {
  width: 100dvw;
  flex-direction :column;
  margin-left: 0;
  padding-top: 30px;
  padding-left: 5dvw;
  padding-right: 5dvw;
  
}
font-family: 'MaruBuri-Regular';
width: 90%;
margin-left: 4%;
padding-top: 100px;
background-color: rgba(249, 249, 246, 1);
box-sizing: border-box;

`
export const PosterTitle = styled.div`
@media only screen and (max-width:1023px) {
    font-size: 18px;
    padding-bottom: 15px;
    padding-left:18px;
}
   
font-size: 27px;
font-weight: 700;
width: 100%;
border-bottom:2px solid black;
padding-bottom: 18px;
`

export const BookTitle = styled.div`
@media only screen and (max-width:1023px) {
    font-size: 18px;
    padding-bottom: 15px;
    padding-left:10px;
    border-bottom : 2px black solid;
}
font-size: 27px;
font-weight: 700;
width: 100%;
border-bottom:2px solid black;
padding-bottom: 18px;
`
export const BookInfos = styled.div`
@media only screen and (max-width:1023px) {
    width: 90dvw;
border-bottom: 1px solid rgba(87, 86, 85, 1);
color: rgba(87, 86, 85, 1);
}
width: 75dvw;
font-size: 14px;
border-bottom: 1px solid black;
padding-bottom: 14px;
padding-top:14px ;
&:hover{
  background-color: rgba(255, 239, 155, 1);
}
`
export const NoneLinkBookInfos = styled.div`
@media only screen and (max-width:1023px) {
    width: 90dvw;
border-bottom: 1px solid rgba(87, 86, 85, 1);
color: rgba(87, 86, 85, 1);
}
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
  width: inherit;
  height: inherit;
  object-fit: cover;
  cursor: pointer;
  border-radius: inherit;
`
export const GridContainer = styled.div`
 // display: grid;
  //grid-template-columns: repeat(3, 1fr);
 @media only screen and (max-width:1023px) {
  margin: 0;
 }
  display: flex;
  flex-wrap: wrap; /* 그리드 아이템이 줄 바꿈되도록 설정 */
  justify-content: center; /* 가로 방향 가운데 정렬 */
  gap: 30px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 50px;
background-color: rgba(249, 249, 246, 1);
  
`;

export const PosterMargin = styled.div`
padding-left: 5%;
background-color:rgba(45, 43, 42, 1) ;
`

export const PosterGridContainer = styled.div`
@media only screen and (max-width:1023px) {
  
  padding: 0;
  margin: 0;
  margin-top: 30px;
  margin-bottom: 30px;
  background-image: none;
}
background-image: linear-gradient(to bottom, #ffffff 150px,rgba(45, 43, 42, 1)100px);

 // display: grid;
  //grid-template-columns: repeat(3, 1fr);
  display: flex;
  flex-wrap: wrap; /* 그리드 아이템이 줄 바꿈되도록 설정 */
  justify-content: center; /* 가로 방향 가운데 정렬 */
  gap: 35px;
  justify-content: center;
  align-items: center;
  padding: 20px;

`;
export const PotserGridItems = styled.div`
  @media only screen and (max-width:1023px) {
  width: 90dvw;
  
}
  width: 401px;
  height: 568px;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
  
`;

//포스터 수정하는 페이지
export const PotserModifyGridItems = styled.div`
  @media only screen and (max-width:1023px) {
  width: 90dvw;
  
}
  width: 401px;
  height: 568px;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
  
  position: relative;
  cursor: pointer;
    
    &:hover img {
        opacity: 0.5;
    }

    &:hover button {
        display: block;
    }
`;

//Poster 링크 처리 하려고
export const PosterLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
    width: 401px;
  height: 568px;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
  
  position: relative;
  cursor: pointer;
`;


// 문집 
export const GridItems = styled.div`

  width: 380px;
  height: 380px;
  background-color: rgba(45, 43, 42, 1);
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
`;

export const BigBold = styled.span`
font-weight: 700;
font-size: 20px;
`

export const HideBookInfo = styled.div`
 display: none; 
  position: absolute; 
  top: 50%;
  font-size: 14px;
font-family: 'MaruBuri-Regular';
  color: white;
  left: 50%; 
  line-height: 1.7;
  transform: translate(-50%, -50%); 
`

// 문집 수정
export const ModifyGridItems = styled.div`
 @media only screen and (max-width:1023px) {
  width: 90dvw;
  height: 90dvw;
} width: 380px;
  height: 380px;
  background-color: rgba(29, 28, 28, 1);
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;   
  position: relative;
cursor: pointer;
  
  &:hover img {
      opacity: 0.3;
  }

  &:hover button {
      display: block;
  }

  &:hover div {
      display: block;
  }
`;
export const HiddenButton = styled(Button)`
  display: none; 
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
`;

//포스터 페이징 관련
export const Paging = styled.div`
@media only screen and (max-width:1023px) {
    margin-left:0px;
    display: flex;
    border-radius: 0 0 16px 16px;
    justify-content: center;
    padding-bottom: 30px;
}
margin-left: ${({ isDark }) => (isDark ? '-0.5vw' : '5vw')};
padding-bottom: 50px;
background-color:${({ isDark }) => (isDark ? 'rgba(45, 43, 42, 1)' : ' rgba(249, 249, 246, 1)')};;
`

export const PageButton = styled.button`
cursor: pointer;
background-color: transparent;
font-family: 'MaruBuri-Regular';
font-size: 17px;
font-weight: 700;
margin: 5px;
border: none;
color:${props => (props.disabled ? 'rgba(87, 86, 85, 1)' : 'rgba(153, 153, 153, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`
//북커버 관련
export const Bookcover = styled(Link)`
 display: flex;
  justify-content: center;
  align-items: center;
`
export const BookcoverImg = styled.img`
max-width: 50%;
height: auto;
`

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
z-index: 5;

`

export const ModalContent = styled.div`
position: relative;
background-color:none;
display: flex;
flex-direction: column;
align-items: flex-start; 
`

export const ModalImg = styled.img`
 @media only screen and (max-width:1023px) {
max-width : 90dvw;
}
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
justify-content: space-between\;
`

//배경색 관련
export const PageContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color:rgba(249, 249, 246, 1);
border-radius: 0 0 16px 16px;


//background-image: linear-gradient(to bottom, #ffffff 150px,rgba(45, 43, 42, 1)100px);

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
//글자 크기
export const S = styled.span`
font-size: 13px;
`
export const L = styled.span`
font-size: 27px;
`
export const B = styled.span`
font-weight: 700;
`
//글자색 관련

export const Red = styled.span`
color:rgba(255, 96, 88, 1);
`
export const Silver = styled.span`
@media only screen and (max-width: 1023px) {
    width: 90dvw; /* 작은 화면에서 더 작은 너비 */
margin-right: 5dvw;

  }
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
@media only screen and (max-width:1500px ){
  font-size: 18px;
}
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
@media only screen and (max-width: 1023px) {
    width: 90dvw; /* 작은 화면에서 더 작은 너비 */
  }
width: 408px;
height: 57px;
border-radius: 8.6px 8.6px 0 0;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 5px 1px 3px rgba(0,0,0, 0.1);
`
export const FormTopGray = styled.div`
@media only screen and (max-width: 1023px) {
    width: 90dvw; /* 작은 화면에서 더 작은 너비 */
  }
width: 408px;
height: 57px;
border-radius: 8.6px 8.6px 0 0;
background-color:rgba(234, 234, 234, 1) ;
`


//회원가입 폼 하단
export const WhiteButtons = styled.div`
background-color: rgba(234, 234, 234, 1);
width: 100%;
height:75px ;
display: flex;
align-items: center;
justify-content:right;
border-bottom-left-radius: 8.6px;
border-bottom-right-radius: 8.6px;

`
export const RealWhiteButtons = styled.div`
background-color: inherit;
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

// 문집 등록 페이지 
export const InputRow = styled.div`
    display: flex;
    gap: 20px; // 각 입력 필드 사이의 간격을 설정합니다.;
`;

export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// 회원가입 에러 메시지
export const ErrorMessage = styled.p`
    color: red;
    font-size: 10px;
    text-align: right;
    font-weight: 400;
`;

export const TextalignLeft = styled.div`
text-align: left;
`

// 학번 중복 확인용 작은 버튼
export const ButtonSmall = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 10px;
border-radius: 30px;
width:50px;
height: 20px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
`;


export const ButtonContainer = styled.div`
padding-bottom: 100px;
`;

export const BackButtonAtMyInfoModify = styled(Button)`
@media only screen and (max-width:1023px) {
    margin-left:60px;
}
    background-color: #f0f0f0;
    color: #333;
`;

export const EditButton = styled(Button)`
 @media only screen and (max-width: 1023px) {
    margin-left:15px;
  }
    color: white;
    margin-right:10px;
    font-weight: 700;
    font-size: 11.5px;
`;

export const SaveButton = styled(Button)`
    color: white;
    margin-right : 500%;
`;

//뒤로가기
export const BackButton = styled.img`
margin-left: 24px;
width: 10px;
height: auto;
cursor: pointer;
`

//회원 정보 수정 에러메시지
export const ErrorMessageInfo = styled.p`
    color: red;
    font-size: 12px;
    margin-left: 10px; // 메시지와 입력 필드 사이의 간격 조정
    display: inline-block; // 메시지를 입력 필드와 같은 라인에 배치
    vertical-align: middle; // 메시지와 입력 필드가 수직으로 정렬되도록 설정
`;

export const PassWordStyle = styled.p`
  color : black;
  margin-right:700%;
  margin-top : 50px;
  font-size:20px;
`;


//회원 정보 수정 조건부 수정 할 때 css 값들
export const Text = styled.p`
border: none;
padding: 5px;
width: 315px;
font-family: 'MaruBuri-Regular';
font-size: 18px;
text-align: center;
margin-bottom: 20px;
`;
export const PasswordText = styled.button`
border: none;
font-family: 'MaruBuri-Regular';
font-size: 14px;
text-align: left;
color: rgba(129, 128, 127, 1);
background-color: inherit;
text-decoration : underline;
text-underline-offset : 8px;
cursor: pointer;
`;


// memberModiify에서 테이블 style
export const MemberTitle = styled.div`
@media only screen and (max-width:1023px) {
    font-size: 18px;
    padding-bottom: 15px;
}
   
font-size: 27px;
font-weight: 700;
margin-right : 20px;
width: 100%;
border-top:2px solid black;
padding-bottom: 18px;
padding-top:10px;
flex-direction:row;
`
export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const BookStyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  /* 입력 필드를 테이블 헤더 아래에 배치하기 위해 각 행을 열 구조로 변경 */
@media only screen and (max-width: 1023px) {
    th, td {
      display: block; /* 각 헤더와 데이터 셀이 세로로 쌓이게 설정 */
      width: 100%; /* 블록 요소로 설정하여 너비 100% 차지 */
    }

    th {
      margin-top: 20px; /* 헤더 간의 간격 조정 */
    }
  }
`;

export const BookIndex = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
border-radius: 30px;
width: auto; /* 글자 수에 따라 크기가 조절됨 */
  white-space: nowrap; /* 글자가 줄 바꿈되지 않도록 설정 */height: 36px;
background-color: rgba(234, 233, 227, 1);
&:hover{
  background-color: rgba(255, 239, 155, 255);
}
  color: black;pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
margin-right: 23px;
margin-bottom:10px;
`;


export const BookIndexList = styled.div`
  flex: 1; /* 인덱스가 차지하는 비율 */
  display: flex;
  position:absolute;
  top:48%;
  right:20%;
  flex-direction: column;
  align-items: flex-start; /* 인덱스를 더 오른쪽으로 정렬 */
  max-height: 100dvh; /* 뷰포트 높이에 맞게 설정 */
  overflow-y: auto; /* 긴 내용은 스크롤 가능 */
  padding: 10px;
  margin-left: auto; /* 여유 공간을 왼쪽에 두어 요소가 더 오른쪽으로 이동 */
`;

export const TableHeader = styled.th`
    background-color: inherit;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid black;
    border-top:2px solid black;
    border-right:1px solid black;
    font-weight : bold;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: inherit;
    }
`;

export const TableCell = styled.td`
    padding: 12px;
    background-color:inherit;
    border-bottom: 1px solid black;
        border-right: 1px solid black;  /* 오른쪽 경계 추가 */

    /* 마지막 셀에 오른쪽 경계 제거 */
    &:last-child {
        border-right: none;
    }
`;
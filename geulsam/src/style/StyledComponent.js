import { Link } from "react-router-dom";
import styled from "styled-components";


//Container와 Wrapper의 차이
//Container는 여러 요소를 감싸는 요소
//Wrapper는 단일 요소를 감싸는 요소
export const Container = styled.div`
`;
export const Wrapper = styled.div`
`;

//입력 폼 관련 요소
export const Title = styled.div`
`;
export const Form = styled.div`
`;
export const Inputs = styled.div`
`;
export const Input = styled.input`
`;
export const Button = styled.button`
`;









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
border: 1px solid white;
padding: 20px 30px;
border-radius: 43px 43px 0 0;
margin-top: 15px;
`





export const Footers = styled.footer`
background-color: rgba(234, 233, 227, 1);
height: 57px;
`;

export const Left = styled.div`
`;

export const Right = styled.div`
`;

//Sidebar 관련 요소
export const Sidebars = styled.div`
position: fixed;
background-color: darkgray;
right: 10px;
bottom: 10%;
`;



//Calenar 관련 요소
export const Calendars = styled.div`
width: 100%;
background-color: none;
height: 838px;
`;


//최근 공개된 작품 관련 요소
export const RecentWorks = styled.div`
width: 100%;
height: 1400px;
background-color: black;
`;
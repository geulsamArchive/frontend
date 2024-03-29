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
position: relative;
top: 0;
left: 0;
width: 100%;
height: 100px;
background-color: yellow;
ul{
    display: flex;
    list-style: none;
}
li+li{
    margin-left: 30px;
}`;
export const NavContent = styled.div`
display: flex;
justify-content: space-between;
width: 96%;
align-items: center;
height: 100%;
margin: 0 auto;
`;
export const Footers = styled.footer`
background-color: rgba(234, 233, 227, 1);
`;

export const Left = styled.div`
`;

export const Right = styled.div`
`;

//Sidebar 관련 요소
export const Sidebars = styled.div`
position: fixed;
right: 10px;
bottom: 10%;
`;
import styled from "styled-components";


export const Contents = styled.div`
font-size: 50px;
overflow-x: scroll;
&::-webkit-scrollbar{
  width: 0;
  height: 0;
}
&::-webkit-scrollbar-thumb{
  background-color: transparent;
}
`

export const Slide = styled.div`
background-color: white;
border-radius: 8.6px;
text-align: center;
width:408px;
height: 486px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transform: scale(0.9);
cursor: pointer;
transition: transform 300ms, box-shadow 300ms;
filter: blur(5px);  

&.active{
transform: scale(1);
filter: none;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
`

export const SliderContainer = styled.div`
    width: 100%;
    overflow:hidden;
    height: auto;
    
`
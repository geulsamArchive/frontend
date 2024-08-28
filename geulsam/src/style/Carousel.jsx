import styled from "styled-components";

export const DisplayNone = styled.span`
display: ${(props) => (props.past ? 'none' : '')};
`

export const Left = styled.div`
  text-align: left;
`
export const Right = styled.div`
  text-align: right;
`
export const Gray = styled.span`
  color: rgba(171, 170, 170, 1);
`
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-left: 10px;
padding-right: 10px;
background-color: ${(props) => (props.past ? 'rgba(234, 234, 234, 1)' : 'none')};

margin-bottom: 10px;
`
export const Eventlist = styled.div`
line-height: 170%;
width: 312px;
font-size: 12px;
margin-left: 48px;
margin-right: 48px;
font-weight: 500;
border-bottom: 0.7px solid black;
color: ${(props) => (props.past ? 'rgba(129, 128, 127, 1)' : 'black')};
`

export const Contents = styled.div`
margin-top: 30px;
overflow: scroll;
height: 350px;
width: 408px;
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
transform: scale(0.7);
cursor: pointer;
transition: transform 300ms, box-shadow 300ms;
filter: blur(5px);  
z-index: 10;

&.active{
transform: scale(0.9);
filter: none;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
z-index: 1;
}
`

export const SliderContainer = styled.div`
    width: 100%;
    overflow:hidden;
    height: auto;
    
`

export const criticEvent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const Button = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 14px;
border-radius: 21px;
width: 75px;
height: 25px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
cursor: pointer;
`;
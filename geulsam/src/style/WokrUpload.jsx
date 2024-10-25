import styled from "styled-components";
import arrow from '../assets/images/arrowup.svg'

export const Container = styled.div`
background-color: rgba(249, 249, 246, 1);
margin-left:86px;
`

export const TitleInput = styled.input`
    border: none;
    height: 56px;
    background-color: inherit;
font-family: 'MaruBuri-Regular';
    font-size: 27px;
    outline: none;
    font-weight: 700;
    width: 80%;
`
export const TitleContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px Solid rgba(87, 86, 85, 1);
    
`
export const VisibleSelect = styled.select`
font-family: 'MaruBuri-Regular';
-moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  font-size: 16px;
  color:  rgba(87, 86, 85, 1);
  border: none;
  outline: none;
  background-color: rgba(87, 86, 85, 1);
  border-radius: 8px;
  padding: 0.6em 1.4em 0.5em 0.8em;
  height: 40px;
  margin: 0;
  cursor: pointer;
  background:url(${arrow}) no-repeat 100% 55%/15px auto;
  /* &:hover{
    color: rgba(87, 86, 85, 1);
  } */
  &:disabled{
    opacity: 0.5;
  }
`

export const GenreContainer = styled.div`
margin-top: 50px;
font-family: 'MaruBuri-Regular';
font-size: 14px;
width: 80%;
border-bottom: 1px solid rgba(129, 128, 127, 1);
`
export const GenreButton = styled.button`
border: 1px solid ${props => (props.disabled ? 'rgba(87, 86, 85, 1)' : 'rgba(171, 170, 170, 1);')};
color:${props => (props.disabled ? 'rgba(87, 86, 85, 1)' : 'rgba(171, 170, 170, 1);')};
background-color: inherit;
font-family: 'MaruBuri-Regular';
width: 75px;
height: 24px;
border-radius: 21px;
margin-right: 15px;
margin-top: 30px;
margin-bottom: 30px;
`

export const FileInput = styled.button`
width: 75px;
font-family: 'MaruBuri-Regular';
height: 24px;
color: rgba(249, 249, 246, 1);
font-size: 11px;
font-weight: 700;
border: none;
background-color: rgba(87, 86, 85, 1);
border-radius: 21px;
margin-top: 30px;
margin-bottom: 30px;
margin-right: 15px;
`
export const SentenceContainer = styled.div`
    width: 80%;
    background-color: rgba(234, 234, 234, 1);
    border-radius: 11px;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'RIDIBatang';
    margin-top: 50px;
    filter: drop-shadow(0 2px 24px rgba(182, 182, 182, 0.15));

`
export const SentenceInput = styled.textarea`
width: 70%;
background-color:inherit;
border: none;
font-family: 'RIDIBatang';
font-size: 14px;
line-height: 200%;
resize: none;
outline: none;
height: 100px;
overflow: visible;
&::-webkit-scrollbar{
    display: none;
}
&::-webkit-scrollbar-thumb{
    display: none;
}
`

export const EditorContainer = styled.div`
     width: 80%;
    background-color: white;
    border-radius: 11px;
    height: 850px;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 2px 24px rgba(182, 182, 182, 0.15));
    font-family: 'RIDIBatang';
    margin-top: 50px;
`

export const UploadButton = styled.button`
font-family: 'MaruBuri-Regular';
border: none;
font-size: 17px;
font-weight: 700;
border-radius: 21px;
width: 106px;
height: 36px;
color:${props => (props.disabled ? '' : 'rgba(249, 249, 246, 1)')};
background-color: ${props => (props.disabled ? 'rgba(213, 213, 212, 1)' : 'rgba(87, 86, 85, 1)')};
cursor: pointer;  
margin-left: 72%;
margin-top: 30px;
margin-bottom: 50px;
`
import styled from "styled-components";

export const Container = styled.div`
background-color: rgba(249, 249, 246, 1);
margin-left:86px;
`

export const TitleInput = styled.input`
    border: none;
    border-bottom: 1px Solid rgba(87, 86, 85, 1);
    height: 56px;
    width: 80%;
    background-color: inherit;
font-family: 'MaruBuri-Regular';
    font-size: 27px;
    outline: none;
    font-weight: 700;
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
overflow: hidden;
`

export const EditorContainer = styled.div`
     width: 80%;
    background-color: white;
    border-radius: 11px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'RIDIBatang';
    margin-top: 50px;
`
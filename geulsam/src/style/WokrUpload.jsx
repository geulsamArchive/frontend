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
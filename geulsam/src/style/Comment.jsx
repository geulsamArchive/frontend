import styled from "styled-components";

export const CommentInput = styled.input`
width: 996px;
height: 85px;
border:none;
font-family: 'Grandpa_sharing';
border-top-right-radius: 11px;
border-top-left-radius: 11px;
outline: none;
padding-left: 30px;
padding-right: 30px;
font-size: 27px;
overflow: scroll;
`

export const CommentInputBottom = styled.div`
    width: 1056px;
font-family: 'Grandpa_sharing';
    height: 75px;
    background-color: rgba(234, 234, 234, 1);
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    display: flex;
    justify-content: right;
    align-items: center;
`

export const CommentInputContainer = styled.div`
filter: drop-shadow(0 10px 30 rgba(152, 147, 142, 0.25));
margin-top: 50px;
`

export const TextCounter = styled.div`
font-size: 18px;
margin-right: 20px;
color: ${props => props.length === 0 ? 'rgba(213, 213, 212, 1)' : 'black'};
`


export const CommentContainer = styled.div`
font-family: 'MaruBuri-Regular';
width: 978px;
    background-color: rgba(57, 55, 53, 1);
    border-radius:11px;
    line-height: 1.7;
    color: rgba(234, 233, 227, 1);
  //  rgba(171, 170, 170, 1);
  padding: 40px;
  margin-top: 25px;
  &:last-child{
    margin-bottom: 50px;
  }
  
`

export const CommentTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const CommentWriter = styled.div`
    font-size: 18px;
`

export const CommentWriting = styled.div`
    font-size: 16px;
`

export const CommentCreatedAt = styled.div`
    color: rgba(129, 128, 127, 1);
    font-size: 12px;
`

export const CommentDelete = styled.button`
    border: none;
    background-color: inherit;
    cursor: pointer;
    
`

import styled from "styled-components";

export const UserInfos = styled.div`
    font-size: 14px;
    display: flex;
`

export const Left = styled.div`
 @media only screen and (max-width: 1023px) {
    margin-left:10px;
  }
    width: 100px;
    height: 30px;
    padding-top: 5px;
    font-weight: 700;

`

export const Right = styled.div`
width: 200px;
    height: 30px;
    padding-top: 5px;
`

export const Input = styled.input`
    background-color: inherit;
    border: none;
    border-bottom: 1px solid rgba(171, 170, 170, 1);
    text-align: left;
    height: 25px;
    font-family: 'MaruBuri-Regular';
    width: 300px;

`
export const ErrorMessageInfo = styled.p`
    color: red;
    font-size: 12px;
    margin-left: 10px; // 메시지와 입력 필드 사이의 간격 조정
    display: inline-block; // 메시지를 입력 필드와 같은 라인에 배치
    vertical-align: middle; // 메시지와 입력 필드가 수직으로 정렬되도록 설정
    padding-top: 5px;
`;
export const AuthorIntroduceInputContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: end;
    width: 1056px;
    height: 114px;
    background-color: rgba(249, 249, 246, 1);
    filter: drop-shadow(0 2px 24px rgba(182, 182, 182, 0.15));
    border-radius: 11px;
@media only screen and (max-width:1023px) {
    align-items:center;
    justify-content:center;
}
`
export const AuthorIntroduceInput = styled.textarea`
background-color: inherit;
border: none;
font-family: 'MaruBuri-Regular';
border-radius: 11px;
outline: none;
height: 74px;
font-size: 14px;
padding: 20px;
width: 1000px;
    @media only screen and (max-width:1023px) {
    width:45dvw;
    }
`
export const TextCounter = styled.div`
font-size: 18px;
color: ${props => props.length === 0 ? 'rgba(213, 213, 212, 1)' : 'black'};
`
export const TextCounterContainer = styled.div`
    padding: 20px;
`
export const AuthorKewordInput = styled.input`
border-radius: 0 0 10px 10px ;
width: 90px;
height: 32px;
text-align: center;
font-family: 'MaruBuri-Regular';
font-size: 14px;
border:1.5px solid rgba(129, 128, 127, 1);
    margin-right: 10px;
    @media only screen and (max-width:1023px) {
    margin-bottom:3dvw;
    }
`

export const AuthorContainer = styled.div`
    display: flex;
    margin-top: 30px;
`
export const AuthorKewordContainer = styled.div`
    margin-top: 10px;
    @media only screen and (max-width:1023px) {
    width:5dvw;
    }
`
export const LeftWord = styled.div`
    width: 120px;
    font-size: 14px;
    margin-top: 20px;
`
import styled from "styled-components";

export const UserInfos = styled.div`
    font-size: 14px;
    display: flex;
`

export const Left = styled.div`
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
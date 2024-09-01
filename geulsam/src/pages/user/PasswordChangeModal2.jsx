import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../apis/LoginApi';
import { normalAPI } from '../../apis/Api';
import { ErrorMessage, Wrapper, Title, Form, Input, Inputs, Button, InputTitle, Buttons } from '../../style/StyledComponent';

const Logins = () => {
    const [pw, onChangePw] = useForms();

    const [pwError, setPwError] = useState('');

    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$|^[A-Za-z]\d{6,}$/; // 비밀번호 유효성 검사 정규식

    //8자리 이상 문자 알파벳, 숫자 하나씩 포함.

    const redirect = useNavigate();
    const onClick = async () => {
        let valid = true;
        if (!pwRegex.test(pwRegex)) {
            setPwError('올바른 비밀번호를 입력해주세요');
            valid = false;
        }
        else {
            setPwError('');
        }
        if (valid) {
            const result = await normalAPI.put(`/user/password?search=${pw}`);

        }
    }
    return (
        <Wrapper>
            <Form>
                <Title>비밀번호 변경</Title>
                <Inputs>
                    <InputTitle>
                        새 비밀번호
                    </InputTitle>
                    <Input type='password' value={pw} onChange={onChangePw} />
                    {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                </Inputs>
                <Inputs>
                    <InputTitle>
                        비밀번호 확인하기
                    </InputTitle>
                    <Input type='password' value={pw} onChange={onChangePw} />
                    {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                </Inputs>
                <Buttons>
                    <Button onClick={onClick}>변경하기</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default Logins;
import React, { useState } from 'react';
import { useForms } from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../apis/LoginApi';
import { ErrorMessage, Wrapper, Title, Form, Input, Inputs, Button, InputTitle, Buttons } from '../style/StyledComponent';
import { useAuth } from '../store/Auth';

const Logins = () => {
    const [id, onChangeId] = useForms();
    const [pw, onChangePw] = useForms();

    const [idError, setIdError] = useState('');
    const [pwError, setPwError] = useState('');

    const idRegex = /^[a-zA-Z]\d{6}$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$|^[A-Za-z]\d{6,}$/; // 비밀번호 유효성 검사 정규식
    //8자리 이상 문자 알파벳, 숫자 하나씩 포함.

    const { login } = useAuth();

    const redirect = useNavigate();
    const onClick = async () => {
        let valid = true;
        if (!idRegex.test(id)) {
            setIdError('올바른 아이디(학번)를 입력해주세요');
            valid = false;
        }
        else {
            setIdError('');
        }
        // if (!pwRegex.test(id)) {
        //     setPwError('올바른 비밀번호를 입력해주세요');
        //     valid = false;
        // }
        // else {
        //     setPwError('');
        // }
        if (valid) {
            try {
                const result = await LoginApi(id, pw);
                const { accessToken, refreshToken } = result.data.data;

                login(accessToken, refreshToken);

                const prevpath = localStorage.getItem('prevpath');
                redirect(prevpath || '/'); // 이전 경로로 리다이렉트, 없으면 홈으로 이동
                localStorage.removeItem('prevpath');
            } catch (error) {
                console.error('Login Error:', error);
                setPwError('아이디와 비밀번호를 확인해주세요.');
            }
        }
    }
    return (
        <Wrapper>
            <Form>
                <Title>회원 로그인</Title>
                <Inputs>
                    <InputTitle>
                        학번
                    </InputTitle>
                    <Input value={id} onChange={onChangeId} />
                    {idError && <ErrorMessage>{idError}</ErrorMessage>}
                    <br />
                    <br />
                    <br />
                    <InputTitle>
                        비밀번호
                    </InputTitle>
                    <Input type='password' value={pw} onChange={onChangePw} />
                    {pwError ? (<ErrorMessage>{pwError}</ErrorMessage>) : (<p>&nbsp;</p>)}
                </Inputs>
                <Buttons>
                    <Button onClick={onClick}>로그인</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default Logins;

import React from 'react';
import { useForms } from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../apis/LoginApi';
import { Wrapper, Title, Form, Input, Inputs, Button } from '../style/StyledComponent';

const Login = () => {
    const [id, onChangeId] = useForms();
    const [pw, onChangePw] = useForms();
    const redirect = useNavigate();
    const onClick = async () => {
        const result = await LoginApi(id, pw);
        const { accessToken, refreshToken } = result;
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        redirect('/main');
    }
    return (
        <Wrapper>
            <Title>로그인하세요</Title>
            <Form>
                <Inputs>
                    <Input placeholder='ID' value={id} onChange={onChangeId} />
                    <Input placeholder='Password' type='password' value={pw} onChange={onChangePw} />
                </Inputs>
                <Button onClick={onClick}>로그인</Button>
            </Form>
        </Wrapper>
    );
};

export default Login;

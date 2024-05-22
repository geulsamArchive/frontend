import React from 'react';
import { useForms } from '../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../apis/LoginApi';
import { Wrapper, Title, Form, Input, Inputs, Button, InputTitle, Buttons } from '../style/StyledComponent';

const Logins = () => {
    const [id, onChangeId] = useForms();
    const [pw, onChangePw] = useForms();
    const redirect = useNavigate();
    const onClick = async () => {
        const result = await LoginApi(id, pw);
        const { accessToken, refreshToken } = result.data;
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
        console.log(result)
        redirect('/main');
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
                    <InputTitle>
                        비밀번호
                    </InputTitle>
                    <Input type='password' value={pw} onChange={onChangePw} />
                </Inputs>
                <Buttons>
                    <Button onClick={onClick}>로그인</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default Logins;

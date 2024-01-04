import React from 'react';
import styled from 'styled-components'
import { useForms } from '../hooks/useForms';

const Login = () => {
    const [id, onChangeId] = useForms();
    const [pw, onChangePw] = useForms();
    const onClick = () => {
        //api 내놔
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

const Wrapper = styled.div`
display:flex;

`;
const Title = styled.div`
`;
const Form = styled.div`
`;
const Inputs = styled.div`
`;
const Input = styled.input`
`;
const Button = styled.button`
`;
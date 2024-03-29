import React from 'react';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Title, Form, Input, Inputs, Button } from '../../style/StyledComponent';
import { SignUpApi } from '../../apis/SignUpApi';

const SignUp = () => {
    const [schoolNum, onChangeSchoolNum] = useForms();
    const [phone, onChangePhone] = useForms();
    const [name, onChangeName] = useForms();
    const redirect = useNavigate();
    const onClick = async (name, schoolNum, phone) => {
        const result = await SignUpApi(name, schoolNum, phone);
        console.log('success', result)
        redirect('/main');
    }
    return (
        <Wrapper>
            <Title>회원가입 페이지</Title>
            <Form>
                <Inputs>
                    <Input placeholder='학번' type='text' value={schoolNum} onChange={onChangeSchoolNum} />
                    <Input placeholder='전화번호' type='text' value={phone} onChange={onChangePhone} />
                    <Input placeholder='이름' type='text' value={name} onChange={onChangeName} />
                </Inputs>
                <Button onClick={onClick}>회원가입</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;

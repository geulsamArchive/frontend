import React, { useEffect } from 'react';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Form, Input, Inputs, Button, InputTitle } from '../../style/StyledComponent';
import { SignUpApi } from '../../apis/SignUpApi';

const SignUp = () => {
    const [schoolNum, onChangeSchoolNum] = useForms();
    const [phone, onChangePhone] = useForms();
    const [name, onChangeName] = useForms();
    const [email, onChangeEmail] = useForms();
    const [joinedAt, onChangeJoinedAt] = useForms();
    const [birthDay, onChangeBirthDay] = useForms();
    const redirect = useNavigate();

    const onClick =
        async () => {
            const result = await SignUpApi(
                name, schoolNum, phone, email, joinedAt, birthDay);
            console.log(result)
            redirect('/main');
        }

    return (
        <Wrapper>
            <Form>
                <Inputs>
                    <InputTitle>
                        이름
                    </InputTitle>
                    <Input placeholder='이름' type='text' value={name} onChange={onChangeName} />
                    <InputTitle>
                        학번
                    </InputTitle>
                    <Input placeholder='예) C012345' type='text' value={schoolNum} onChange={onChangeSchoolNum} />
                    <InputTitle>
                        생년월일
                    </InputTitle>
                    <Input placeholder='예) 2000.12.31' type='text' value={birthDay} onChange={onChangeBirthDay} />
                    <InputTitle>
                        글샘 가입연도
                    </InputTitle>
                    <Input placeholder='예) 2024' type='text' value={joinedAt} onChange={onChangeJoinedAt} />
                </Inputs>
                <Button onClick={onClick}>다음</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
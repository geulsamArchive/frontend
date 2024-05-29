import React, { useEffect } from 'react';
import { useForms } from '../../hooks/useForms';
import { Wrapper, Form, Input, Inputs, Button, InputTitle, FormTop, Silver, BackButton, LeftAlign, WhiteButtons } from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png'

const SignUp = ({ prevStep, nextStep }) => {
    const [name, onChangeName] = useForms();
    const [schoolNum, onChangeSchoolNum] = useForms();
    const [birthDay, onChangeBirthDay] = useForms();
    const [joinedAt, onChangeJoinedAt] = useForms();

    const handleNext = () => {
        nextStep({ name, schoolNum, birthDay, joinedAt });
    };

    return (
        <Wrapper>
            <Form>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        1/4
                    </Silver>
                </FormTop>
                <LeftAlign>
                    <InputTitle>
                        이름
                    </InputTitle>
                    <Input type='text' value={name} onChange={onChangeName} />
                    <InputTitle>
                        학번
                    </InputTitle>
                    <Input placeholder='예) C012345' type='text' value={schoolNum} onChange={onChangeSchoolNum} />
                    <InputTitle>
                        생년월일
                    </InputTitle>
                    <Input placeholder='예) 2000.12.31' type='date' value={birthDay} onChange={onChangeBirthDay} />
                    <InputTitle>
                        글샘 가입연도
                    </InputTitle>
                    <Input placeholder='예) 2024' type='text' value={joinedAt} onChange={onChangeJoinedAt} />
                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
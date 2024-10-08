import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { Wrapper, Form, Input, Button, InputTitle, Silver, FormTop, BackButton, WhiteButtons, LeftAlign, ErrorMessage } from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png';

const Signup3 = ({ prevStep, nextStep }) => {

    const [email, onChangeEmail] = useForms();
    const [phone, onChangePhone] = useForms();

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // 이메일과 전화번호 정규 표현식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/;
    const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

    const handleNext = () => {
        let valid = true;

        // 이메일 유효성 검사
        if (!emailRegex.test(email)) {
            setEmailError('올바른 이메일 형식을 입력하세요. (예: abcd@gmail.com)');
            valid = false;
        } else {
            setEmailError('');
        }

        // 전화번호 유효성 검사
        if (!phoneRegex.test(phone)) {
            setPhoneError('올바른 전화번호 형식을 입력하세요. (예: 010-1234-5678)');
            valid = false;
        } else {
            setPhoneError('');
        }

        if (valid) {
            nextStep({ email, phone });
        }
    }

    return (
        <Wrapper>
            <Form>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        2/4
                    </Silver>
                </FormTop>
                <LeftAlign>
                    <InputTitle>
                        이메일
                    </InputTitle>
                    <Input
                        placeholder='예) abcd@gmail.com'
                        type='text'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {emailError ? <ErrorMessage>{emailError}</ErrorMessage> : <ErrorMessage>&nbsp;</ErrorMessage>}

                    <InputTitle>
                        전화번호
                    </InputTitle>
                    <Input
                        placeholder='예) 010-1234-5678'
                        type='text'
                        value={phone}
                        onChange={onChangePhone}
                    />
                    {phoneError ? <ErrorMessage>{phoneError}</ErrorMessage> : <ErrorMessage>&nbsp;</ErrorMessage>}
                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </Form>
        </Wrapper>
    );
};

export default Signup3;

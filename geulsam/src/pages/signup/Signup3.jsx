import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { Red, RedSignMobile, ModalMobilep, ModalDiv, Modalp, CenterAlign, RedSign, Wrapper, Form, Input, Button, InputTitle, Silver, FormTop, BackButton, WhiteButtons, LeftAlign, ErrorMessage, LoginForm, LoginInputTitle, LoginInput } from '../../style/StyledComponent';
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

        if (valid) {
            nextStep({ email });
        }
    }

    return (
        <Wrapper>
            <LoginForm>
                <FormTop>
                    <BackButton src={Left} onClick={prevStep} />
                    <Silver>
                        2/4
                    </Silver>
                </FormTop>
                <LeftAlign>
                    <ModalDiv>
                        <Modalp>&nbsp;&nbsp;가입승인이 완료되면 이메일로 임시 비밀번호를<br />&nbsp;&nbsp;보내드리고 있습니다. 메일을 받을 주소를 입력해<br />&nbsp;&nbsp;주세요.</Modalp>
                        <ModalMobilep>&nbsp;&nbsp;가입승인이 완료되면 이메일로 임시 비<br />&nbsp;&nbsp;밀번호를 보내드리고 있습니다. 메일을<br />&nbsp; 받을 주소를 입력해주세요.</ModalMobilep>

                        <br /><RedSign>&nbsp;&nbsp;해당 정보는 이메일 전송 후 자동폐기됩니다.</RedSign>
                        <RedSignMobile><Red>&nbsp;&nbsp;해당 정보는 이메일 전송 후 자동 폐기됩니다.</Red></RedSignMobile>
                    </ModalDiv>
                    <br />
                    <ModalMobilep><br /><br /><br /></ModalMobilep>
                    <LoginInputTitle>
                        &nbsp;&nbsp;&nbsp;&nbsp;이메일
                    </LoginInputTitle>
                    &nbsp;&nbsp;&nbsp;
                    <LoginInput
                        placeholder='예) abcd@gmail.com'
                        type='text'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {emailError ? <ErrorMessage>{emailError}</ErrorMessage> : <ErrorMessage>&nbsp;</ErrorMessage>}
                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </LoginForm>
        </Wrapper>
    );
};

export default Signup3;

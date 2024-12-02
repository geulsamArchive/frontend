import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { Red, RedSignMobile, ModalMobilep, ModalDiv, Modalp, CenterAlign, RedSign, Wrapper, Form, Input, Button, InputTitle, Silver, FormTop, BackButton, WhiteButtons, LeftAlign, ErrorMessage, LoginForm, LoginInputTitle, LoginInput } from '../../style/StyledComponent';
import Left from '../../assets/images/grayLeft.png';

const Signup3 = ({ prevStep, nextStep }) => {

    const [password, onChangePw] = useForms();
    const [pwError, setPwError] = useState('');

    const [confirmPw, setConfirmPw] = useState('');
    const [confirmPwError, setConfirmPwError] = useState('');
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()\-_=+]{8,}$/; // 비밀번호 유효성 검사 정규식

    const onChangeConfirmPw = (e) => {
        setConfirmPw(e.target.value);
    };
    const handleNext = () => {
        let valid = true;


        // 비밀번호 유효성 검사
        if (!pwRegex.test(password)) {
            setPwError('형식에 맞는 올바른 비밀번호를 입력해주세요');
            valid = false;
        } else {
            setPwError('');
        }

        // 비밀번호 확인 검사
        if (password !== confirmPw) {
            setConfirmPwError('비밀번호가 일치하지 않습니다.');
            valid = false;
        } else {
            setConfirmPwError('');
        }
        // 이메일 유효성 검사
        // if (!emailRegex.test(email)) {
        //     setEmailError('올바른 이메일 형식을 입력하세요. (예: abcd@gmail.com)');
        //     valid = false;
        // } else {
        //     setEmailError('');
        // }

        if (valid) {
            nextStep({ password });
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
                        <Modalp>사이트에서 사용할 비밀번호를 입력해주세요.영문자와 숫자가 포함된 8자리 이상으로 설정해주세요.특수문자는  ~`!@#$%^&*()-_+= 만 가능합니다.</Modalp>
                        <ModalMobilep>사이트에서 사용할 비밀번호를 입력해주세요.영문자와 숫자가 포함된 8자리 이상으로 설정해주세요.특수문자는  ~`!@#$%^&*()-_+= 만 가능합니다.</ModalMobilep>

                        {/* <br /><RedSign>&nbsp;&nbsp;해당 정보는 이메일 전송 후 자동폐기됩니다.</RedSign>
                        <RedSignMobile><Red>&nbsp;&nbsp;해당 정보는 이메일 전송 후 자동 폐기됩니다.</Red></RedSignMobile> */}
                    </ModalDiv>
                    <br /><br /><br /><br /><br />
                    <ModalMobilep><br /><br /><br /></ModalMobilep>
                    <LoginInputTitle>
                        &nbsp;&nbsp;&nbsp;&nbsp;비밀번호
                    </LoginInputTitle>
                    &nbsp;&nbsp;&nbsp;
                    <LoginInput
                        placeholder='abcd1234!'
                        type='password'
                        value={password}
                        onChange={onChangePw}
                    />
                    {pwError && <ErrorMessage>{pwError}</ErrorMessage>}

                    <LoginInputTitle>
                        &nbsp;&nbsp;&nbsp;&nbsp;비밀번호 확인
                    </LoginInputTitle>
                    &nbsp;&nbsp;&nbsp;
                    <LoginInput
                        placeholder='abcd1234!'
                        type='password'
                        value={confirmPw}
                        onChange={onChangeConfirmPw}
                    />
                    {confirmPwError && <ErrorMessage>{confirmPwError}</ErrorMessage>}

                </LeftAlign>
                <WhiteButtons>
                    <Button onClick={handleNext}>다음</Button>
                </WhiteButtons>
            </LoginForm>
        </Wrapper>
    );
};

export default Signup3;

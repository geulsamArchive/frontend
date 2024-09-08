import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import { normalAPI } from '../../apis/Api';
import {
    ErrorMessage, Wrapper, Title, Form, Input, Inputs,
    Button, InputTitle, Buttons
} from '../../style/StyledComponent';

const PasswordChangeModal = () => {
    const [pw, onChangePw] = useForms(); // 비밀번호 입력값을 관리하는 커스텀 훅
    const [pwError, setPwError] = useState(''); // 비밀번호 오류 메시지 관리
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$|^[A-Za-z]\d{6,}$/; // 비밀번호 유효성 검사 정규식
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const onClick = async () => {
        let valid = true;

        // 비밀번호 유효성 검사
        if (!pwRegex.test(pw)) {
            setPwError('올바른 비밀번호를 입력해주세요');
            valid = false;
        } else {
            setPwError('');
        }

        if (valid) {
            try {
                console.log(pw)
                // accessToken과 refreshToken을 localStorage에서 가져오기
                const accessToken = localStorage.getItem('access');
                const refreshToken = localStorage.getItem('refresh');

                // 서버에 비밀번호 확인 요청
                const result = await normalAPI.post(
                    `/user/checkPassword`, {
                    password: pw,
                }
                    ,
                    {
                        headers: {
                            'accessToken': accessToken,
                        }
                    }
                );

                if (result.data.success) {
                    // 비밀번호가 일치하면 다음 화면으로 이동
                    navigate('./PasswordChangeModal2');
                } else {
                    setPwError('비밀번호가 일치하지 않습니다.');
                }
            } catch (error) {
                console.error('비밀번호 확인 중 오류가 발생했습니다.', error);
                setPwError('오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <Wrapper>
            <Form>
                <Title>비밀번호 변경</Title>
                <Inputs>
                    <InputTitle>기존 비밀번호</InputTitle>
                    <Input type='password' value={pw} onChange={onChangePw} />
                    {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                </Inputs>
                <Buttons>
                    <Button onClick={onClick}>변경하기</Button>
                </Buttons>
            </Form>
        </Wrapper>
    );
};

export default PasswordChangeModal;

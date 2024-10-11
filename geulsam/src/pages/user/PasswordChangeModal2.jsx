import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import Modal from 'react-modal';
import { normalAPI } from '../../apis/Api';
import { ErrorMessage, Wrapper, Title, Form, Input, Inputs, Button, InputTitle, Buttons, TextalignLeft } from '../../style/StyledComponent';

const PasswordChangeModal2 = ({ isModalOpen, closeModal, beforePw }) => {
    const modalStyles = {
        overlay: {
            backgroundColor: 'inherit',
        },
        content: {
            width: '408px',
            height: '486px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            margin: 'auto',
            fontFamily: 'MaruBuri-Regular',
            filter: 'drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25))',
            //transform: 'scale(0.4)',
        }
    };
    const [pw, onChangePw] = useForms();
    const [pwError, setPwError] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [confirmPwError, setConfirmPwError] = useState('');
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()\-_=+]{8,}$/; // 비밀번호 유효성 검사 정규식

    const onChangeConfirmPw = (e) => {
        setConfirmPw(e.target.value);
    };

    const onClick = async () => {
        let valid = true;

        // 비밀번호 유효성 검사
        if (!pwRegex.test(pw)) {
            setPwError('형식에 맞는 올바른 비밀번호를 입력해주세요');
            valid = false;
        } else {
            setPwError('');
        }

        // 비밀번호 확인 검사
        if (pw !== confirmPw) {
            setConfirmPwError('비밀번호가 일치하지 않습니다.');
            valid = false;
        } else {
            setConfirmPwError('');
        }

        if (valid) {
            const accessToken = localStorage.getItem('access');
            const refreshToken = localStorage.getItem('refresh');
            console.log(accessToken);
            console.log(beforePw);
            console.log(pw);

            try {
                //https://geulsaem.store/user/password?search=0
                const result = await normalAPI.put(`/user/password`,
                    {
                        oldPassword: beforePw,
                        newPassword: pw
                    },
                    /*{ beforePw }, { beforePw, pw },*/ {
                        headers: {
                            'accessToken': accessToken
                        },
                    });

                if (result.data.status === 200) {
                    closeModal();
                    alert('비밀번호가 성공적으로 변경되었습니다.');
                } else {
                    setPwError('비밀번호 변경에 실패했습니다.');
                }
            } catch (error) {
                console.error('비밀번호 변경 중 오류가 발생했습니다.', error);
                setPwError('비밀번호 변경 중 오류가 발생했습니다.');
                if (error.response && error.response.status === 403) {
                    try {
                        const result = await normalAPI.put(`/user/password?search=${pw}`, {
                            headers: { 'refreshToken': refreshToken },
                        });
                        const newAccessToken = result.headers.accesstoken.replace('Bearer ', '');
                        localStorage.setItem('access', newAccessToken);
                        const newRefreshToken = result.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', newRefreshToken);
                    } catch (refreshError) {
                        console.error('토큰 갱신 중 오류가 발생했습니다.', refreshError);
                        alert('로그인이 필요합니다.');
                    }
                }
            }
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="비밀번호 변경"
            style={modalStyles}   >
            <div>
                <Form>
                    <Title>비밀번호 변경</Title>
                    <ErrorMessage>영문자와 숫자가 포함된 8자리 이상으로 설정해주세요.</ErrorMessage>
                    <ErrorMessage>특수문자는  ~`!@#$%^&*()-_+= 만 가능합니다. </ErrorMessage>
                    <TextalignLeft>
                        <InputTitle>새 비밀번호</InputTitle>
                        <Input type='password' value={pw} onChange={onChangePw} />
                        {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                    </TextalignLeft>
                    <Inputs>
                        <InputTitle>비밀번호 확인</InputTitle>
                        <Input type='password' value={confirmPw} onChange={onChangeConfirmPw} />
                        {confirmPwError && <ErrorMessage>{confirmPwError}</ErrorMessage>}
                    </Inputs>
                    <Buttons>
                        <Button onClick={onClick}>변경하기</Button>
                    </Buttons>
                </Form>
            </div>
        </Modal>
    );
};

export default PasswordChangeModal2;

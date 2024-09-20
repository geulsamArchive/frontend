import React, { useState } from 'react';
import { useForms } from '../../hooks/useForms';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { normalAPI } from '../../apis/Api';
import { ModalTop } from '../../style/Critic';
import PasswordChangeModal2 from './PasswordChangeModal2';

import {
    ErrorMessage, Wrapper, Title, Form, Input, Inputs,
    Button, InputTitle, Buttons
} from '../../style/StyledComponent';

const PasswordChangeModal = ({ isModalOpen, closeModal, openPasswordChangeModal2 }) => {
    const [pw, onChangePw] = useForms(); // 비밀번호 입력값을 관리하는 커스텀 훅
    const [pwError, setPwError] = useState(''); // 비밀번호 오류 메시지 관리
    const [isModal2Open, setIsModal2Open] = useState(false);
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$|^[A-Za-z]\d{6,}$/; // 비밀번호 유효성 검사 정규식

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
            filter: 'drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25))', //transform: 'scale(0.4)',
        }
    };
    const onClick = async () => {
        let valid = true;

        // 비밀번호 유효성 검사
        if (!pwRegex.test(pw)) {
            setPwError('올바른 비밀번호를 입력해주세요');
            valid = false;
        } else {
            setPwError('');
        }
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        if (valid) {
            try {
                console.log(pw)
                // accessToken과 refreshToken을 localStorage에서 가져오기


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
                console.log(result)
                if (result.data.status === 200) {
                    closeModal();  // 첫 번째 모달 닫기
                    setIsModal2Open(true);
                } else {
                    setPwError('비밀번호가 일치하지 않습니다.');
                }
            } catch (error) {
                console.error('비밀번호 확인 중 오류가 발생했습니다.', error);
                try {
                    const res = await normalAPI.post(`/user/checkPassword`, {
                        password: pw,
                    },
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            }
                        })
                    console.log(res)
                    if (res.data.status === 200) {
                        const accessToken = res.headers.accesstoken.replace('Bearer ', '')
                        localStorage.setItem('access', accessToken)
                        const refreshToken = res.headers.refreshtoken.replace('Bearer ', '')
                        localStorage.setItem('refresh', refreshToken)
                        // 비밀번호가 일치하면 다음 화면으로 이동
                    } else {
                        setPwError('비밀번호가 일치하지 않습니다.');
                    }
                } catch (error) {
                    setPwError('오류가 발생했습니다. 다시 시도해주세요.');
                    console.log('재로그인 필요함', error)
                }

            }
        }
    };
    const closePasswordChangeModal2 = () => {
        setIsModal2Open(false);
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="비밀번호 변경"
                style={modalStyles}
            >
                <div>
                    <Form>
                        <Title>비밀번호 변경</Title>
                        <Inputs>
                            <InputTitle>기존 비밀번호</InputTitle>
                            <Input type='password' value={pw} onChange={onChangePw} />
                            {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
                        </Inputs>
                        <Buttons>
                            <Button onClick={onClick}>변경하기</Button>
                            <Button onClick={closeModal}>닫기</Button>
                        </Buttons>
                    </Form>
                </div>
            </Modal>
            <PasswordChangeModal2
                isModalOpen={isModal2Open}
                closeModal={closePasswordChangeModal2}
                beforePw={pw}
            />
        </>
    );
};

export default PasswordChangeModal;

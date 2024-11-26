import React, { useState } from 'react';
import Modal from 'react-modal';
import { normalAPI } from '../../../../apis/Api';
import {
    EmailForm, Bold, LoginForm, ErrorMessage, Wrapper, Title, Form, Input, Inputs,
    Button, InputTitle, Buttons, Red,
    ButtonForPassword
} from '../../../../style/StyledComponent';

const PasswordChangeEmailModal = ({ member, isModalOpen, closeModal }) => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwError, setPwError] = useState('');
    console.log(member.name);
    const modalStyles = {
        overlay: {
            backgroundColor: 'inherit',
        },
        content: {
            background: 'inherit',
            flexDirection: 'column',
            height: '100dvh',
            width: '100dvw',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0',
            margin: 'auto',
            fontFamily: 'MaruBuri-Regular',
        },
    };

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePw = (e) => setPw(e.target.value);

    const resetMemberPassword = async (member) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        const userId = member.userId;
        console.log('accessToken', accessToken);
        console.log('userId', userId);
        console.log('member.userId', member.name);
        console.log('email', email);
        try {
            await normalAPI.post(`/user/resetPassword`, { userId, email }, {
                headers: {
                    "accessToken": accessToken,
                    //'userId': userId,
                    //'email': email,
                },
            });
            alert('회원의 비밀번호가 초기화되었습니다.');
            closeModal();
        } catch (error) {
            console.error('비밀번호 초기화 중 오류 발생:', error);
            setPwError('비밀번호 초기화에 실패했습니다.');
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="비밀번호 변경"
            style={modalStyles}
        >
            <EmailForm>
                <br />
                <br />
                <span><b>{member.name} ( {member.schoolNum} )</b> 회원의 비밀번호를 초기화 하시겠습니까?  새로운 임시 비밀번호를 받을 <br />임시 이메일을 입력해주세요.</span>
                <Red>해당 정보는 이메일 전송 후 자동 폐기됩니다.</Red>
                <Inputs>
                    <InputTitle>&nbsp;이메일</InputTitle>
                    <Input type="email" value={email} onChange={onChangeEmail} />

                </Inputs>
                <Buttons>
                    <Button onClick={closeModal}>취소하기</Button>

                    <ButtonForPassword onClick={() => resetMemberPassword(member)}>임시 비밀번호 보내기</ButtonForPassword>
                </Buttons>
            </EmailForm>
        </Modal>
    );
};

export default PasswordChangeEmailModal;

import React from 'react';
import Modal from 'react-modal';
import {
    LoginForm, Wrapper, Title, Button, Buttons
} from '../../style/StyledComponent';

const CriticLogModal = ({ isModalOpen, closeModal, logTitle, logDate, logPassword, logUrl }) => {
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게 처리
        },
        content: {
            background: 'white',
            flexDirection: 'column',
            height: 'auto',
            width: '400px',
            borderRadius: '10px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto',
            fontFamily: 'MaruBuri-Regular',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
        }

    };
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클로버노트의 비밀번호가 복사되었어요. Ctrl+V를 입력해주세요');
        } catch (err) { }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="합평회 정보"
            style={modalStyles}
        >
            <LoginForm>
                <Title></Title>
                <Wrapper>
                    <p>{logTitle}</p>
                    <p>{logDate}</p>
                    <p
                        onClick={() =>
                            handleCopyClipBoard(`${logPassword}`)
                        }
                    >
                        {logPassword}
                    </p>
                    <p target="_blank" href={logUrl}>
                        합평 기록 바로가기
                    </p>
                </Wrapper>
                <Buttons>
                    <Button onClick={closeModal}>닫기</Button>
                </Buttons>
            </LoginForm>
        </Modal>
    );
};

export default CriticLogModal;

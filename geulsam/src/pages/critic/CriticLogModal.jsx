import React from 'react';
import Modal from 'react-modal';
import {
    CriticCloseButton, CriticModalLink, CriticModalForm, CriticModalPassword, LoginForm, Wrapper, Title, Button, Buttons, CriticModalDate, CriticModalTitle
} from '../../style/StyledComponent';

const CriticLogModal = ({ isModalOpen, closeModal, logTitle, logDate, logPassword, logUrl }) => {
    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 어둡게 처리
        },
        content: {
            background: 'white',
            flexDirection: 'column',
            height: '198px',
            width: '350px',
            borderRadius: '10px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto',
            fontFamily: 'MaruBuri-Regular',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // 화면 정중앙으로 이동
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
            <CriticModalForm>
                <CriticCloseButton onClick={closeModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                    >
                        <path
                            d="M11.5002 21.1752C10.2297 21.1752 8.97156 20.9249 7.79773 20.4387C6.62391 19.9525 5.55734 19.2399 4.65894 18.3415C3.76053 17.443 3.04787 16.3765 2.56166 15.2027C2.07545 14.0288 1.8252 12.7707 1.8252 11.5002C1.8252 10.2297 2.07545 8.97156 2.56166 7.79773C3.04788 6.62391 3.76053 5.55734 4.65894 4.65894C5.55735 3.76053 6.62391 3.04787 7.79773 2.56166C8.97156 2.07545 10.2297 1.8252 11.5002 1.8252C12.7707 1.8252 14.0288 2.07545 15.2027 2.56166C16.3765 3.04788 17.443 3.76053 18.3415 4.65894C19.2399 5.55735 19.9525 6.62391 20.4387 7.79774C20.9249 8.97156 21.1752 10.2297 21.1752 11.5002C21.1752 12.7707 20.9249 14.0288 20.4387 15.2027C19.9525 16.3765 19.2399 17.443 18.3415 18.3415C17.443 19.2399 16.3765 19.9525 15.2027 20.4387C14.0288 20.9249 12.7707 21.1752 11.5002 21.1752L11.5002 21.1752Z"
                            stroke="#81807F"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />
                        <path
                            d="M8.2749 8.2749L14.7249 14.7249"
                            stroke="#81807F"
                            stroke-width="1.86"
                            stroke-linecap="round"
                        />
                        <path
                            d="M14.7251 8.2749L8.2751 14.7249"
                            stroke="#81807F"
                            stroke-width="1.86"
                            stroke-linecap="round"
                        />
                    </svg>
                </CriticCloseButton>
                <br />
                <CriticModalDate>{logDate}</CriticModalDate>
                <CriticModalTitle>{logTitle}</CriticModalTitle>
                <CriticModalPassword
                    onClick={() =>
                        handleCopyClipBoard(`${logPassword}`)
                    }
                >
                    {logPassword}
                </CriticModalPassword>
                <CriticModalLink target="_blank" href={logUrl}>
                    합평 기록 바로가기
                </CriticModalLink>
            </CriticModalForm>
        </Modal>
    );
};

export default CriticLogModal;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { URLButton } from '../../style/StyledComponent';
import Logo from '../../assets/images/URL.png';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';
import ReactModal from 'react-modal';

const CopyURL = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickButton = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 55500);
  };

  const ModalStyle = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    content: {
      position: 'absolute',
      top: '45dvh',
      left: '70dvw',
      width: '345px',
      height: '13px',
      borderRadius: '50px',
      textAlign: 'center',
      border: 'none',
      fontFamily: 'MaruBuriSemiBold', // 글꼴 설정
      fontSize: '18px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
  };

  const baseURL = 'geulsaem.pages.dev';
  const location = useLocation();
  const handleCopyClipBoard = async (text) => {
    onClickButton();
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      alert.error('URL 복사에 실패하였습니다.');
    }
  };
  return (
    <>
      <URLButton
        onClick={() => handleCopyClipBoard(`${baseURL}${location.pathname}`)}
      >
        <Desktop>
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5774 10.5556L10.4219 17.7112"
              stroke="#575655"
              stroke-width="2.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.156 15.9222L24.7338 12.3444C27.2037 9.87446 27.2037 5.8699 24.7338 3.39996V3.39996C22.2639 0.930016 18.2593 0.930015 15.7894 3.39995L12.2116 6.97773M6.84492 12.3444L3.26714 15.9222C0.797204 18.3921 0.797204 22.3967 3.26714 24.8666V24.8666C5.73708 27.3366 9.74165 27.3366 12.2116 24.8666L15.7894 21.2888"
              stroke="#575655"
              stroke-width="2.8"
              stroke-linecap="round"
            />
          </svg>
        </Desktop>
        <Mobile>공유하기</Mobile>
      </URLButton>
      <ReactModal
        style={ModalStyle}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        해당 페이지의 URL이 복사되었습니다.
      </ReactModal>
    </>
  );
};

export default CopyURL;
